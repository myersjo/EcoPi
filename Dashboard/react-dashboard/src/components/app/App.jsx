import React, { Component } from 'react';
import './App.scss';
import Dashboard from '../dashboard/Dashboard.jsx';
import Navbar from '../navbar/Navbar.jsx';
import Screen from '../screen/Screen.jsx';
import Tile from '../Tile/Tile.jsx';
import Uploadimg from '../uploadimg/Uploadimg.jsx';
import Divider from '@material-ui/core/Divider';
import SwipeableViews from 'react-swipeable-views';
//Temporary graph images
import TimerSvg from './../../assets/placeholder-graphs/timer.svg';
import ImageUploader from 'react-images-upload';

const API = 'http://localhost:3030/api/v1.0/snapshot/';

class App extends Component {
  state = {
    slideNum: 0,
    data: {}
  };

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ data }))
      .error(err => console.log(err));

    console.log('Fetched data.');
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
              gridColumn: '2/5'
            }}
          >
            {/* TODO: Will probably need to abstract out each screen, maybe even each tile within that. Just doing it all here for now*/}
            <Screen>
              <Tile style={{ gridRow: '1/5' }}>
                <h1 className="tile-heading">Time Remaining:</h1>
                <img
                  style={{ width: '50%', marginBottom: '1em' }}
                  src={TimerSvg}
                  alt="Timer"
                />
                <span className="large-digit">06:42:39</span>
                <hr className="divider" />
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)'
                  }}
                >
                  {/* Start Time */}
                  <div className="time-and-date">
                    <p className="tile-label">Start time:</p>
                    <span className="medium-digit">13:43:12</span>
                    <span className="small-digit">15 / 01 / 2019</span>
                  </div>
                  {/* Finish Time */}
                  <div className="time-and-date">
                    <p className="tile-label">Finish time:</p>
                    <span className="medium-digit">21:43:12</span>
                    <span className="small-digit">15 / 01 / 2019</span>
                  </div>
                </div>
              </Tile>
              <Tile style={{ gridRow: '1/5' }}>
                <h1 className="tile-heading">Photo Details:</h1>
                <p className="large-digit">5/16</p>
              </Tile>
              <Tile style={{ gridRow: '5/7', gridColumn: '1/3' }}>
                <h1 className="tile-heading">
                  <span className="active-heading">Temperature</span> | Humidity
                </h1>
                <p className="large-digit">36.4°C</p>
              </Tile>
              <Tile style={{ gridRow: '1/4' }}>
                <h1 className="tile-heading">Analysis Details:</h1>
              </Tile>
              <Tile style={{ gridRow: '4/7' }}>
                <h1 className="tile-heading">Metadata:</h1>
              </Tile>
            </Screen>
            <Screen>
              <Tile style={{ gridRow: '1/2' }}>
                <Uploadimg />
              </Tile>
            </Screen>
            <Screen>Screen 3</Screen>
            <Screen>Screen 4</Screen>
            <Screen>Screen 5</Screen>
          </SwipeableViews>
        </Dashboard>
      </div>
    );
  }
}

export default App;
