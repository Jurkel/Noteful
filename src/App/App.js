import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoteListNav from '../NoteListNav/NoteListNav'
import NotePageNav from '../NotePageNav/NotePageNav'
import NoteListMain from '../NoteListMain/NoteListMain'
import NotePageMain from '../NotePageMain/NotePageMain'
import NotesContext from '../NotesContext';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import { findNote } from '../notes-helpers';
import HandleError from '../HandleError';
import './App.css'

class App extends Component {
  state = {
    notes: [],
    folders: []
  };

  getFolders() {
    fetch('http://localhost:9090/folders')
    .then(res => {
      if(!res.ok) {
        throw new Error('Opps! Something went wrong')
      }
      return res.json()
    })
    .then(resjson => this.setState({folders: resjson}))
    .catch(err => <NoteListMain error={err} />)
  }

  getNotes() {
    fetch('http://localhost:9090/notes')
    .then(res => {
      if(!res.ok) {
        throw new Error('Opps! Something went wrong')
      }
      return res.json()
    })
    .then(resjson => this.setState({notes: resjson}))
    .catch(err => <NoteListMain error={err} />)
  }

  deleteNote = noteId => {
    const newNotes = this.state.notes.filter((note) => note.id !== noteId);
    this.setState({notes: newNotes})
  }

  addFolder = (folder) => {
    this.setState({folders: [...this.state.folders, folder]})
  }

  addNote = (note) => {
    this.setState({notes: [...this.state.notes, note]})
  }

  componentDidMount() {
    // fake date loading from API call
    // setTimeout(() => this.setState(dummyStore), 600)
    //fetch 1)folders and 2) notes
    this.getFolders()
    this.getNotes()
  }

  renderNavRoutes() {
    return (
      <HandleError>
      <>
        {['/', '/folder/:folderId'].map(path =>
        
          <Route
            exact
            key={path}
            path={path}
            component={NoteListNav}
          />
          
        )}
        <Route
          path='/note/:noteId'
          component={NotePageNav}
        />
        <Route
          path='/add-folder'
          component={AddFolder}
        />
        <Route
          path='/add-note'
          component={AddNote}
        />
        
      </>
        </HandleError>
      
    )
  }

  renderMainRoutes() {
    const { notes } = this.state
    return (
      <HandleError>
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={NoteListMain}
          />
        )}
        <Route
          path='/note/:noteId'
          render={routeProps => {
            const { noteId } = routeProps.match.params
            const note = findNote(notes, noteId)
            return (
              <NotePageMain
                {...routeProps}
                note={note}
              />
            )
          }}
        />
        <Route
          path='/add-folder'       
        />
        <Route
          path='/add-note'
        />
      </>
      </HandleError>
    )
  }

  render() {

    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote
    }

    return (
      <HandleError>
      <NotesContext.Provider value={contextValue}>
        <div className='App'>
          <nav className='App__nav'>
            {this.renderNavRoutes()}
          </nav>
          <header className='App__header'>
            <h1>
              <Link to='/'>Noteful</Link>
              {' '}
              <FontAwesomeIcon icon='check-double' />
            </h1>
          </header>
          <main className='App__main'>
            {this.renderMainRoutes()}
          </main>
        </div>
      </NotesContext.Provider>
      </HandleError>
    )
  }
}

export default App
