import React, { Component } from 'react';
import './App.scss';
import Dashboard from '../dashboard/Dashboard.jsx';
import NavBar from '../navbar/Navbar.jsx';
import Tile from '../Tile/Tile.jsx';
import Divider from '@material-ui/core/Divider';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Dashboard>
          <p style={{ color: 'white' }}>Hello World!</p>
        </Dashboard>
        <Divider />
        <NavBar>
        </NavBar>
        <Tile>
          <p style={{ color: 'white' }}>Placeholder Tile</p>
        </Tile>

      </div>
    );
  }
}


export default App;
