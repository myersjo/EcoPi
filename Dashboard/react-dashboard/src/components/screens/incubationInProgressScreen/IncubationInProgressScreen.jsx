import React, { Component } from 'react';
import Screen from '../../screen/Screen.jsx';
import Tile from '../../tile/Tile';
import FormInput from './../../formInput/FormInput.jsx';
import Button from './../../button/Button.jsx';
import Gallery from './../../../assets/icons/gallery.svg';
import Countdown from 'react-countdown-now';

import './IncubationInProgressScreen.scss';

//Temporary graph images
import TimerSvg from './../../../assets/placeholder-graphs/timer.svg';
import ProgressBarSvg from './../../../assets/placeholder-graphs/progress-bar.svg';
import LineGraphSVG from './../../../assets/placeholder-graphs/line-graph.svg';

import PetriDish from './../../../assets/petriDish.png';

//Globals
let startTime, finishTime, startDate, finishDate;
let incubationLength = 28800000;

// Renderer callback with condition
const largeCountdownRenderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <span className="large-digit">00:00:00</span>;
  } else {
    // Render a countdown
    return (
      <span className="large-digit">
        {hours < 10 ? '0' + hours : hours}:
        {minutes < 10 ? '0' + minutes : minutes}:
        {seconds < 10 ? '0' + seconds : seconds}
      </span>
    );
  }
};

const mediumCountdownRenderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <span className="medium-digit">00:00:00</span>;
  } else {
    // Render a countdown
    return (
      <span className="medium-digit">
        {hours < 10 ? '0' + hours : hours}:
        {minutes < 10 ? '0' + minutes : minutes}:
        {seconds < 10 ? '0' + seconds : seconds}
      </span>
    );
  }
};

class IncubationInProgressScreen extends Component {
  // Takes a date object and returns a formatted string of the time
  formatTime = date => {
    let returnString =
      (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
      ':' +
      (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
      ':' +
      (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return returnString;
  };

  // Takes a date object and returns a formatted string of the date
  formatDate = date => {
    let returnString =
      (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
      ' / ' +
      (date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      ' / ' +
      date.getFullYear();
    return returnString;
  };

  componentDidMount() {
    let start = new Date();
    let finish = Date.now() + incubationLength;
    finish = new Date(finish);
    startTime = this.formatTime(start);
    finishTime = this.formatTime(finish);
    startDate = this.formatDate(start);
    finishDate = this.formatDate(finish);
  }

  render() {
    return (
      <Screen>
        {/* Time */}
        <Tile style={{ gridRow: '1/7' }}>
          <h1 className="tile-heading">Time Remaining:</h1>
          <img
            style={{ width: '50%', margin: '0 auto 1em auto' }}
            src={TimerSvg}
            alt="Timer"
          />
          {/* <span className="large-digit">06:42:39</span> */}
          <Countdown
            date={Date.now() + incubationLength}
            renderer={largeCountdownRenderer}
          />

          <hr className="divider" />
          <div className="two-col">
            {/* Start Time */}
            <div className="two-col-info">
              <p className="tile-label">Start time:</p>
              {/* <span className="medium-digit">13:43:12</span> */}
              <span className="medium-digit">{startTime}</span>
              <span className="small-digit">{startDate}</span>
            </div>
            {/* Finish Time */}
            <div className="two-col-info">
              <p className="tile-label">Finish time:</p>
              <span className="medium-digit">{finishTime}</span>
              <span className="small-digit">{finishDate}</span>
            </div>
          </div>
        </Tile>
        {/* Photo details */}
        <Tile style={{ gridRow: '1/7', textAlign: 'left' }}>
          <h1 className="tile-heading">Photo Details:</h1>
          <p className="tile-label" style={{ marginBottom: 0 }}>
            Photos taken:
          </p>
          <p
            className="large-digit"
            style={{
              marginTop: '-.4em',
              marginBottom: '.25em',
              marginRight: '.25em',
              textAlign: 'right'
            }}
          >
            5 / 16
          </p>
          <img src={ProgressBarSvg} alt="Timer" />
          <hr className="divider" />
          <div className="two-col" style={{ marginBottom: '1em' }}>
            <div className="two-col-info">
              <p className="tile-label">Interval:</p>
              <span className="medium-digit">30 mins</span>
            </div>
            <div className="two-col-info">
              <p className="tile-label">Next photo:</p>
              <Countdown
                date={Date.now() + 1800000}
                renderer={mediumCountdownRenderer}
              />
            </div>
          </div>
          <p className="tile-label">Latest photo:</p>
          <div className="flex-row">
            <img
              src={PetriDish}
              alt="petri dish"
              style={{
                width: '60%',
                maxWidth: '214px',
                maxHeight: '120px',
                // objectFit: "cover",
                border: '2px solid #606875',
                borderRadius: '2px',
                boxSizing: 'border-box'
              }}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                margin: 'auto'
              }}
            >
              <Button size="small">
                <img src={Gallery} alt="Gallery" style={{ width: '50%' }} />
              </Button>
              <p
                className="tile-label"
                style={{ marginTop: '0.75em', marginBottom: 0 }}
              >
                View all
                <br />
                photos
              </p>
            </div>
          </div>
        </Tile>
        {/* Temp/Humidity */}
        <Tile style={{ gridRow: '7/11', gridColumn: '1/3' }}>
          <h1 className="tile-heading">
            <span className="active-heading">Temperature</span> | Humidity
          </h1>
          <div className="flex-row" style={{ marginBottom: '1em' }}>
            <img
              src={LineGraphSVG}
              alt="line graph"
              style={{ width: '70%', display: 'inline' }}
            />
            <div
              className="flex-col"
              style={{ textAlign: 'left', margin: 'auto' }}
            >
              <p className="tile-label">Current:</p>
              <span className="large-digit">36.4°C</span>
              <div style={{ display: 'flex' }}>
                <div className="small-readout">
                  <p className="tile-label">High:</p>
                  <span className="medium-digit">39.2°C</span>
                </div>
                <div className="small-readout">
                  <p className="tile-label">Low:</p>
                  <span className="medium-digit">34.3°C</span>
                </div>
              </div>
            </div>
          </div>
        </Tile>
        {/* Analysis */}
        <Tile style={{ gridRow: '1/6' }}>
          <h1 className="tile-heading">Analysis Details:</h1>
        </Tile>
        {/* Metadata */}
        <Tile style={{ gridRow: '6/11' }}>
          <h1 className="tile-heading">Metadata:</h1>
          <FormInput>Title</FormInput>
          <FormInput>Location</FormInput>
          <FormInput isMultiLine rows="6">
            Description
          </FormInput>
        </Tile>
      </Screen>
    );
  }
}

export default IncubationInProgressScreen;
