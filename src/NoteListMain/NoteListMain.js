import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import './NoteListMain.css'
import NotesContext from '../NotesContext';

class NoteListMain extends Component {

  static contextType = NotesContext
  render(){
    const {notes} = this.context;
    const folderId = this.props.match.params.folderId

    const notesInFolder = notes.filter((note) => 
    {if(folderId){
     return  note.folderId === folderId
    } else{
      return note
    }}
  );


    return (

      !this.props.err ?

      <section className='NoteListMain'>
        <ul>
          {notesInFolder.map(note =>
            <li key={note.id}>
              <Note
                id={note.id}
                name={note.name}
                modified={note.modified}
                history={this.props.history}
                match={this.props.match}
              />
            </li>
          )}
        </ul>
        <div className='NoteListMain__button-container'>
          <CircleButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Note
          </CircleButton>
        </div>
      </section>

      :
      
      <h3>{this.props.error}</h3>
    )
  }
}

export default NoteListMain;