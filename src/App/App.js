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

class App extends Component {
    state = {
        notes: [],
        folders: [],
    };

    componentDidMount() {
        Promise.all([
            fetch(`http://localhost:9090/notes`),
            fetch(`http://localhost:9090/folders`)
        ])
            .then(([notesResponse, foldersResponse]) => {
                if (!notesResponse.ok)
                    return notesResponse.json()
                if (!foldersResponse.ok)
                    return foldersResponse.json()

                return Promise.all([notesResponse.json(), foldersResponse.json()]);
            })
            .then(([notes, folders]) => {
                this.setState({notes, folders});
            })
            .catch(error => {
                console.error({error});
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
                {['/', '/folder/:folderId'].map(path => 
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
                {['/', '/folder/:folderId'].map(path => 
                    
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
