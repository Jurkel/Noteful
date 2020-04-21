import React from 'react'
import NavButton from '../NavButton/NavButton'
import NotefulContext from '../NotefulContext'
import './NotePageNav.css'

export default class NotePageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }
  static contextType = NotefulContext;

  render() {
    const findFolder = (folders=[], folderId) =>
      folders.find(folder => folder.id === folderId)

    const findNote = (notes=[], noteId) =>
      notes.find(note => note.id === noteId)
    const { notes, folders, } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || {}
    const folder = findFolder(folders, note.folderId)
    
    return (
      <div className='NotePageNav'>
        <NavButton
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='NotePage__back-button'
        >
          <br />
          Back
        </NavButton>
        {folder && (
          <h3 className='NotePageNav__folder-name'>
            {folder.name}
          </h3>
        )}
      </div>
    )
  }
}