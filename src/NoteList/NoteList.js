import React from 'react'
import { Link } from 'react-router-dom'
import Note from '../Note/Note'
import NavButton from '../NavButton/NavButton'
import NotefulContext from '../NotefulContext'
import './NoteList.css'
// import { getNotesForFolder } from '../notes-helpers';

export default class NoteList extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    },
  }
  static contextType = NotefulContext

  render() {
    const { folderid } = this.props.match.params
    const { notes=[] } = this.context
    const getNotesForFolder = (notes=[], folderid) => {
      if(typeof folderid == 'undefined') {
        return notes;
      } else {
        return notes.filter(note => note.folderid == folderid)
      }
      // (!folderid)
      //   ? notes
      //   : notes.filter(note => note.folderid === folderid)
    }
    console.log('getNotesForFolder' + getNotesForFolder)
    const notesForFolder = getNotesForFolder(notes, folderid)
    console.log('notesForFolder' + notesForFolder)
    return (
      <section className='NoteListMain'>
        <h1>Notes:</h1>
        <ul className="NoteNav__list">
          {notesForFolder.map(note =>
            <li 
            key={note.id}
            className="note__list"
            >
              <Note
                id={(note.id).toString()}
                name={note.name}
                modified={note.modified}
              />
            </li>
          )}
        </ul>
        <div className='NoteListNavNote__button'>
          <NavButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'
          >
            + 
            <br />
            Note
          </NavButton>
        </div>
      </section>
    )
  }
}