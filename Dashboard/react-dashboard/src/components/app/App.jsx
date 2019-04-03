import React, { Component } from 'react';
import './App.scss';
import Dashboard from '../dashboard/Dashboard.jsx';
import Navbar from '../navbar/Navbar.jsx';
import Screen from '../screen/Screen.jsx';
import Tile from '../Tile/Tile.jsx';
import Uploadimg from '../uploadimg/Uploadimg.jsx';
import Divider from '@material-ui/core/Divider';
import SwipeableViews from 'react-swipeable-views';
import ImageUploader from 'react-images-upload';

//Screen imports
import LivestreamScreen from '../screens/livestreamScreen/LivestreamScreen.jsx';
import IncubationInProgressScreen from './../screens/incubationInProgressScreen/IncubationInProgressScreen.jsx';
import LogScreen from './../screens/logScreen/LogScreen.jsx';
const API = 'http://localhost:3030/api/v1.0/snapshot/';

class App extends Component {
  state = {
    slideNum: 0,
    data: {}
  };

  componentDidMount() {
    fetch(API, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => this.setState({ data }))
      .catch(err => console.log(err));
    console.log('Fetched data from API.');
  }

  handleSlideChange = (_, slideNum) => {
    this.setState({ slideNum });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    return (
      <div className="App">
        <Dashboard>
          <Navbar
            handleSlideChange={this.handleSlideChange.bind(this)}
            activeIndex={this.state.slideNum}
          />
          <SwipeableViews
            axis="y"
            animateHeight
            disabled //This disables touch events
            index={this.state.slideNum}
            onChangeIndex={this.handleChangeIndex}
            style={{
              gridColumn: '2/6'
            }}
          >
            {/* TODO: Will probably need to abstract out each screen, maybe even each tile within that. Just doing it all here for now*/}
            <IncubationInProgressScreen />
            <Screen>
              <Tile style={{ gridRow: '1/6' }}>
                <Uploadimg />
              </Tile>
            </Screen>
            <LivestreamScreen />
            <LogScreen />
            <Screen>Screen 5</Screen>
          </SwipeableViews>
        </Dashboard>
      </div>
    );
  }
}

export default App;
