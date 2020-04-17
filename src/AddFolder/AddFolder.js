import React, { Component } from 'react';
import ValiationError from './ValidationError';
import NotesContext from '../NotesContext';

export default class AddFolder extends Component {
  constructor(props) {
    super(props)
    this.state = {   
      name: '',
      folderValid: false,
      validMessage: ''
    }
  }
  
  static contextType = NotesContext;

  updateFolder(name) {
    this.setState( {name: name}, () => {this.validateFolder(name)} )
  }

  validateFolder(inputValue) {
    let errorMsg = this.state.validMessage;
    let hasError = false;

    inputValue = inputValue.trim();
    if (inputValue.length === 0) {
      errorMsg = 'Folder Name is required';
      hasError = true;

    } else if (inputValue.length < 3) {
      errorMsg = 'Folder Name must be at least 3 characters';
      hasError = true;

    } else {
      errorMsg = '';
      hasError = false;
    }

    this.setState({
      validMessage: errorMsg,
      folderValid: !hasError
    })

  }

  addFolderRequest(name, addFolder) {
    fetch(`http://localhost:9090/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({name: name})
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Unable to add folder to database')
      }
      return res.json();
    })
    .then(res => addFolder(res))
    .catch(err => console.log(name, err))
  }

  render() {
    console.log(this.props)

    const { addFolder } = this.context

    this.handleSubmit = (event) => {
      event.preventDefault();
      console.log(addFolder)
      this.addFolderRequest(this.state.name, addFolder);
    }

    return (
      <form onSubmit={ (e) => this.handleSubmit(e) }>
        <label>Add Folder: 
          <input onChange={ (e) => this.updateFolder(e.target.value) } type="text" name="addFolder" id="addFolder"></input>
        </label>
        <ValiationError hasError={!this.state.folderValid} message={this.state.validMessage}/>
        <button type="submit" disabled={!this.state.folderValid}>Submit</button>
      </form>
    )
  }

}