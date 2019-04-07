import React, { Component } from 'react';
import './App.scss';
import Dashboard from '../dashboard/Dashboard.jsx';
import Navbar from '../navbar/Navbar.jsx';
import Screen from '../screen/Screen.jsx';
import openSocket from 'socket.io-client';
import SwipeableViews from 'react-swipeable-views';

//Screen imports
import PreIncubationScreen from './../screens/preIncubationScreen/preIncubationScreen.jsx';
import IncubationInProgressScreen from './../screens/incubationInProgressScreen/IncubationInProgressScreen.jsx';
import UploadScreen from './../screens/uploadScreen/UploadScreen.jsx';
import LivestreamScreen from '../screens/livestreamScreen/LivestreamScreen.jsx';
import LogScreen from './../screens/logScreen/LogScreen.jsx';

const moment = require('moment');

const HOST = 'http://localhost';
const PORT = 3030;
const NAMESPACE = '/dashboard';

const API = 'http://localhost:3030/api/v1.0/snapshot/';

var timestampPrint = function(message) {
  console.log(
    '[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] ' + message + ' '
  );
};

class App extends Component {
  state = {
    slideNum: 0,
    data: {},
    reading: {},
    snapshot: {},
    socket: openSocket(HOST + ':' + PORT + NAMESPACE),
    snapshotHistory: [], // holds up to the last 6 snapshot values. Starts with none and grows

    // Incubation setting defaults:
    incInProgress: false,
    incubationLength: 8,
    recordPhotos: true,
    photoInterval: 30
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

    this.state.socket.on('connect', () => {
      timestampPrint('Connected to server');
    });

    this.state.socket.on('disconnect', () => {
      timestampPrint('Disconnected');
    });

    this.state.socket.on('new_snapshot', payload => {
      this.setState({ snapshot: JSON.parse(payload) });
      handleSnaphotHistory(this.state.snapshot);
      timestampPrint(
        `New snapshot received from ${this.state.snapshot.timestamp}`
      );
    });

    this.state.socket.on('new_temp_humidity_reading', payload => {
      // Send down with props and update relevant component
      this.setState({ reading: payload });
      timestampPrint('New temperature and humidity readings received');
      timestampPrint(`   Temperature: ${this.state.reading.temperature}`);
      timestampPrint(`   Temperature: ${this.state.reading.humidity}`);
    });
    //Doublecheck this is necessary -------
    var interval = { interval: 10000 };
    this.state.socket.emit('start_incubation', interval);
  }

  handleSlideChange = (_, slideNum) => {
    this.setState({ slideNum });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleIncSettingChange = (name, value) => {
    this.setState({ [name]: value });
  };

  handleSnaphotHistory(newSnapshot) {
    // cannot use push or shift as they modify the state and state must be modified with setState, not directly
    var newHistory = [newSnapshot].concat(this.state.snapshotHistory);
    //ensure array never holds more than six previous snapshots
    if (newHistory.length > 6) {
      newHistory.pop();
    }
    this.setState({ snapshotHistory: newHistory });
  }

  render() {
    const {
      incInProgress,
      incubationLength,
      recordPhotos,
      photoInterval
    } = this.state;

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
            {incInProgress ? (
              <IncubationInProgressScreen
                tempHumReading={this.state.reading}
                snapshot={this.state.snapshot}
                incubationLength={incubationLength}
                recordPhotos={recordPhotos}
                photoInterval={photoInterval}
              />
            ) : (
              <PreIncubationScreen
                onChange={this.handleIncSettingChange}
                incubationLength={incubationLength}
                recordPhotos={recordPhotos}
                photoInterval={photoInterval}
              />
            )}
            <UploadScreen />
            <LivestreamScreen />
            <LogScreen
              tempHumReading={this.state.reading}
              snapshot={this.state.snapshot}
              incubationLength={incubationLength}
              recordPhotos={recordPhotos}
              photoInterval={photoInterval}
              snapshotHistory={this.state.snapshotHistory}
            />
            <Screen>Screen 5</Screen>
          </SwipeableViews>
        </Dashboard>
      </div>
    );
  }
}

export default App;
