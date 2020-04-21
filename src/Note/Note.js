import React from 'react'
import { Link } from 'react-router-dom'
import NotefulContext from '../NotefulContext'
import './Note.css'
import { format } from 'date-fns'
import propTypes from 'prop-types';


export default class Note extends React.Component {
  static defaultProps ={
    onDeleteNote: () => {},
  }
  static contextType = NotefulContext;

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id

    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        this.context.deleteNote(noteId)
        this.props.onDeleteNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { name, id, modified } = this.props
    return (
      <div className='Note'>
        {/* <h2 className='Note__title'> */}
          <Link to={`/note/${id}`}>
            {/* {name} <br /> */}
            <button className="Note__title">{name}</button>
          </Link>
        {/* </h2> */}
        <div className="Modfied__dates">
          <span className="Date">
            {format(modified, 'MMMM Do, YYYY')}
          </span>
        </div>
        <button
          className='Note__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          remove
        </button>

      </div>
    )
  }

}

Note.propTypes = {
  id: propTypes.string.isRequired,
  modified: propTypes.string,
  name: propTypes.string.isRequired
}