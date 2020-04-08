import React from 'react';
import { Route, Link } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <Link to='/'>Noteful</Link>
      </header>
    </div>
  );
}

export default App;
