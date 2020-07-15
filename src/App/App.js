import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import NoteList from '../NoteList/NoteList';
import FolderNav from '../FolderNav/FolderNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NotePageMain from '../NotePageMain/NotePageMain';
import NotefulContext from '../NotefulContext';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote'
import NotefulError from '../NotefulError/NotefulError';
import './App.css';
import { API_ENDPOINT } from '../config'

class App extends Component {
    state = {
        notes: [],
        folders: [],
    };

    handlePromiseAllJsons = (arr) => {
        let promiseArray = [];
        arr.forEach(a => {
            console.log(a);
            if(a.ok) {
                promiseArray.push(a.json());
                }
        })
        return promiseArray;
    }

    componentDidMount() {
        console.log('API ENDPOINT: ' + `${API_ENDPOINT}`)
        Promise.all([
            fetch(`${API_ENDPOINT}/notes`),
            fetch(`${API_ENDPOINT}/folders`)
        ])
            .then((arr) => {
                return Promise.all(this.handlePromiseAllJsons(arr));
            })
            .then((response) => {
                this.setState({
                    notes: response[0],
                    folders: response[1]
                })
            })
            .catch(error => {
                console.error(error);
            });
    }

    handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => 
                note.id !== noteId)
        });
    };

    handleAddFolder = folder => {
        this.setState({
            folders: [
                ...this.state.folders,
                folder
            ]
        })
    }

    handleAddNote = note => {
        this.setState({
            notes: [
                ...this.state.notes,
                note
            ]
        })
    }

    renderNavRoutes() {
        return (
            <React.Fragment>
                {['/', '/folder/:folderid'].map(path => 
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={FolderNav}
                    />
                )}
                <Route path='/note/:noteId' component={NotePageNav} />
                <Route path='/add-folder'component={NotePageNav} />
                <Route path='/add-note'component={NotePageNav} />
            </React.Fragment>
        );
    }

    renderMainRoutes() {
        return (
            <React.Fragment>
                {['/', '/folder/:folderid'].map(path => 
                    
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteList}
                    />
                    
                )}
                <Route path='/note/:noteId' component={NotePageMain} />
                <Route path="/add-folder" component={AddFolder} />
                <Route path="/add-note" component={AddNote} />
            </React.Fragment>
            
        );
        
    }

    render() {
        console.log(this.handleAddNote)
        const contextValue = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDeleteNote,
            addFolder: this.handleAddFolder,
            addNote: this.handleAddNote
        };
        console.log(contextValue)
        return (
            <NotefulContext.Provider value={contextValue}>
                <div className="App">
                    <NotefulError>
                        <nav className="App__nav">
                            {this.renderNavRoutes()}
                        </nav>
                        <header className="App__header">
                            <h1>
                                <Link to='/'>Noteful</Link>
                            </h1>
                        </header>
                        <main className="App__main">
                            {this.renderMainRoutes()}
                        
                        </main>
                    </NotefulError>
                </div>
            </NotefulContext.Provider>
        );
    }
}

export default App;
