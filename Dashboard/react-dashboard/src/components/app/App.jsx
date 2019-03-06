import React, { Component } from 'react';
import './App.scss';
import Dashboard from '../dashboard/Dashboard.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Dashboard>
          <p style={{ color: 'white' }}>Hello World!</p>
        </Dashboard>
      </div>
    );
  }
}

export default App;
