import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import NotefulContext from '../NotefulContext'
import NavButton from '../NavButton/NavButton'
import './AddNote.css'
import ValidationError from '../ValidationError'
import moment from 'moment';
import { API_ENDPOINT } from '../config'


export default class AddNote extends Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  static contextType = NotefulContext;

  constructor(props) {
    super(props)
    this.state = {
      name: {
        value: '',
        touched: false
      },
      content: {
        value: '',
        touched: false
      },
      folder: {
        value: ''
      }
    }
  }

  updateName(name) {
    this.setState({name: {value: name, touched: true}});
  }

  updateContent(content) {
    this.setState({content: {value: content, touched: true}});
  }

  validateName(textarea) {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return 'Name is required';
    }
  }

  validateContent(textarea) {
    const content = this.state.content.value.trim();
    if (content.length === 0) {
      return 'Content is required';
    }
  }


  handleSubmit = e => {
    e.preventDefault()

    const newNote = {
      name: e.target['note-name'].value,
      content: e.target['note-content'].value,
      folderId: parseInt(e.target['note-folder-id'].value),
      modified: moment(),
    }
    fetch(`${API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(newNote),
    })
      .then(response => {
        if (!response.ok)
          return response.json().then(e => Promise.reject(e))
        return response.json()
      })
      .then(note => {
        console.log(note)
        this.context.addNote(note)
        this.props.history.push(`/folder/${note.folderId}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { folders=[] } = this.context
    return (
      <section className='AddNote'>
        <h2>Write a note</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
        
          <div className='field'>
            <label htmlFor='note-name-input'>
              Name:
            </label>
            <input type='text' id='note-name-input' name='note-name' onChange={e => this.updateName(e.target.value)} />
            <ValidationError message={this.validateName()} />
          </div>
          <div className='field'>
            <label htmlFor='note-content-input'>
              Content:
            </label>
            <textarea id='note-content-input' name='note-content' onChange={e => this.updateContent(e.target.value)} />
            <ValidationError message={this.validateContent()} />
          </div>
          <div className='field'>
            <label htmlFor='note-folder-select'>
              Folder:
            </label>
            <select id='note-folder-select' name='note-folder-id'>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
          </div>
          <div className='buttons'>
            <button 
              type='submit'
              disabled={
                this.validateName()||
                this.validateContent()}
                >
              Add note
            </button>
          </div>
          
        </NotefulForm>
        <NavButton
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='NotePage__back-button'
        >
          <br />
          Back
        </NavButton>
      </section>
    )
  }
}