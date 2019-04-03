import React, { Component } from 'react';
import './App.scss';
import Dashboard from '../dashboard/Dashboard.jsx';
import Navbar from '../navbar/Navbar.jsx';
import Screen from '../screen/Screen.jsx';
import Tile from '../tile/Tile.jsx';
import Uploadimg from '../uploadimg/Uploadimg.jsx';
import Divider from '@material-ui/core/Divider';
import SwipeableViews from 'react-swipeable-views';
import ImageUploader from 'react-images-upload';

//Screen imports
import LivestreamScreen from '../screens/livestreamScreen/LivestreamScreen.jsx';
import IncubationInProgressScreen from './../screens/incubationInProgressScreen/IncubationInProgressScreen.jsx';

const express = require('express')
const app = express()
var server = require('http').Server(app);
var io = require('socket.io')(server);

const HOST = "http://localhost"
const PORT = 3030
const NAMESPACE = "/dashboard"

//may not be necessary
//server.listen(PORT, () => timestampPrint(`Dashboard listening on port ${PORT}!`));
var socket = io(HOST + ':' + PORT + '/' + NAMESPACE)

const API = 'http://localhost:3030/api/v1.0/snapshot/';

var timestampPrint = function (message) {
  console.log('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] ' + message + ' ')
};

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

    socket.on('connect' () => {
        timestampPrint('Connected to server')
    });

    socket.on('disconnect' () => {
        timestampPrint('Disconnected')
    });

    socket.on('new_snapshot' (payload) => {
        j_content = JSON.parse(payload)
        timestampPrint(`New snapshot received from ${j_content.timestamp}`)
        this.props.new_snapshot =
    });

    socket.on('new_temp_humidity_reading' (reading) => {
        // Send down with props and update relevant component
        timestampPrint('New temperature and humidity readings received')
        timestampPrint( `   Temperature: ${reading.temperature}`)
        timestampPrint( `   Temperature: ${reading.humidity}`)
    });

    socket.connect(() => {
        timestampPrint('Establishing connection...')
    });
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
            <Screen>Screen 4</Screen>
            <Screen>Screen 5</Screen>
          </SwipeableViews>
        </Dashboard>
      </div>
    );
  }
}

export default App;
