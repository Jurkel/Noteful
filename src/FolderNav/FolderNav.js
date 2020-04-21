import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import NavButton from '../NavButton/NavButton'
import NotefulContext from '../NotefulContext'
import './FolderNav.css'


export default class FolderNav extends React.Component {
  static contextType = NotefulContext;

  render() {
    const { folders=[] } = this.context
    console.log(this.context)
    return (
      <div className='FolderNav'>
        <h1> Folders:</h1>
        <ul className='FolderNav__list'>
          {folders.map(folder =>
            <li 
            key={folder.id}
            className="Folder__list">
              <NavLink
                className='FolderNav__link'
                to={`/folder/${folder.id}`}
              >
                {folder.name}
              </NavLink>
            </li>
          )}
        </ul>
        <div className='NoteListNav__button'>
          <NavButton
            tag={Link}
            to='/add-folder'
            type='button'
            className='add-folder-button'
          >
            + 
            <br />
             Folder
          </NavButton>
        </div>
      </div>
    )
  }
}