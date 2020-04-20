import React from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import './AddFolder.css'
import uuid from 'uuid/v4';


class AddFolder extends React.Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  static contextType = ApiContext;

  handleSubmit = e => {
    e.preventDefault()
    const folder = {
      id: uuid(),
      name: e.target['folder-name'].value
    }

    try{
      fetch('https://noteful-db.herokuapp.com/folders', {
        method: 'POST',
        headers: {
        'content-type': 'application/json'
        },
        body: JSON.stringify(folder),
      })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(folder => {
        this.context.addFolder(folder[0])
        this.props.history.push(`/folder/${folder[0].id}`)
      })
      }catch(error){
        console.error(error)
      }
  }

  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input type='text' id='folder-name-input' name='folder-name' />
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add folder
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}




export default AddFolder;