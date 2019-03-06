import React, { Component } from 'react';
import logo from '../../logo.svg';
import './App.scss';

//Testing material UI
import Button from '@material-ui/core/Button';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          {/* Testing material UI button */}
          <Button variant="contained" color="primary">
            Primary
          </Button>
        </header>
      </div>
    );
  }
}

export default App;
