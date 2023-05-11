import React from 'react';
import GestionPoutine from './components/GestionPoutine';
import './App.css';

class App extends React.Component {

  render(){

    return (
      <div className="App">
        <header className="App-header">
          <h1>DavyPoutine</h1>

          <GestionPoutine/>
        </header>
      </div>
    );
  }
}

export default (App);