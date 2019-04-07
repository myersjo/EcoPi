import React, { Component, Fragment } from 'react';
import Screen from '../../screen/Screen.jsx';
import Tile from '../../Tile/Tile';
import FormInput from './../../formInput/FormInput.jsx';
import StyledButton from './../../styledButton/StyledButton.jsx';
import Gallery from './../../../assets/icons/gallery.svg';
import Countdown from 'react-countdown-now';
import './IncubationInProgressScreen.scss';

//Chart imports
import { Chart } from 'react-charts';
import CircularProgressBar from './../../circularProgressBar/circularProgressBar.jsx';
import { Line } from 'rc-progress';

//Temporary graph images
import ProgressBarSvg from './../../../assets/placeholder-graphs/progress-bar.svg';

import PetriDish from './../../../assets/petriDish.png';
import snapshotDummyData from './../../../assets/snapshot.json';

//Globals
let snapshotData = snapshotDummyData;

// TODO: REMOVE THESE
// let incubationLength = 28800000;
// let photoInterval = 1800000;

let unixTime = snapshotData.timestamp;
console.table(snapshotData);

// Temporary setup of snapshot variables
let bacPer = snapshotData.image_analysis.BacteriaPercentage;
let noReg = snapshotData.image_analysis.number_regions;
let temperature = snapshotData.incubator_state.temperature;

let today = new Date();
// getting current time for use in graph
let time3 = today.getHours();
// converting hours to milliseconds
let time4 = time3 * 3600000;
// data for bar chart, increments of 1800000 for 30 min intervals up to current time
// Not implemented is past values of temperature, y is currently temp values

const data1 = [
  {
    time4: time4,
    label: 'Temperature',
    data: [
      { x: time4 - 7200000, y: 33 },
      { x: time4 - 5400000, y: 34 },
      { x: time4 - 3600000, y: 34 },
      { x: time4 - 1800000, y: 34 },
      { x: time4, y: 35 }
    ]
  }
];

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

  handleNewSnapshot() {
    // TODO: Call function when snapshot is updated
    this.setState({
      nextPhotoUnix: Date.now() + this.state.photoInterval,
      photosCaptured: this.state.photosCaptured++
    });
  }

  handleTempHumUpdate() {}

  constructor(props) {
    super(props);

    // Setup time values
    let incubationLength = props.incubationLength * 3600000; //Convert hours to unix
    let photoInterval = props.photoInterval * 60000; //Convert mins to unix
    let startUnix = new Date();
    let finishUnix = Date.now() + incubationLength;
    let finish = new Date(finishUnix);

    this.state = {
      startUnix: startUnix,
      startTime: this.formatTime(startUnix),
      startDate: this.formatDate(startUnix),
      finishUnix: finishUnix,
      finishTime: this.formatTime(finish),
      finishDate: this.formatDate(finish),
      incubationLength: incubationLength,
      completion: 0,
      nextPhotoUnix: Date.now() + photoInterval,
      photosCaptured: 0,
      totalPhotoCount: Math.floor(incubationLength / photoInterval)
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        completion:
          ((Date.now() - this.state.startUnix) / this.state.incubationLength) *
          100
      });
    }, 10000); //Update every 10s
  }

  render() {
    return (
      <Screen>
        {/* Time */}
        <Tile style={{ gridRow: '1/7' }}>
          <h1 className="tile-heading">Time Remaining:</h1>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '40%',
              paddingBottom: '1em'
            }}
          >
            <CircularProgressBar
              percentage={this.state.completion}
              text={`${this.state.completion}%`}
            />
          </div>
          <Countdown
            date={this.state.finishUnix}
            renderer={largeCountdownRenderer}
          />

          <hr className="divider" />
          <div className="two-col">
            {/* Start Time */}
            <div className="two-col-info">
              <p className="tile-label">Start time:</p>
              <span className="medium-digit">{this.state.startTime}</span>
              <span className="small-digit">{this.state.startDate}</span>
            </div>
            {/* Finish Time */}
            <div className="two-col-info">
              <p className="tile-label">Finish time:</p>
              <span className="medium-digit">{this.state.finishTime}</span>
              <span className="small-digit">{this.state.finishDate}</span>
            </div>
          </div>
        </Tile>
        {/* Photo details */}
        <Tile style={{ gridRow: '1/7', textAlign: 'left' }}>
          {this.props.recordPhotos ? (
            <Fragment>
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
                {this.state.photosCaptured} / {this.state.totalPhotoCount}
              </p>
              <div style={{ width: '100%', height: 'auto' }}>
                <Line
                  percent={
                    (this.state.photosCaptured / this.state.totalPhotoCount) *
                    100
                  }
                  strokeWidth="4"
                  strokeColor="#f00772"
                  trailWidth="4"
                  trailColor="#606875"
                />
              </div>
              <hr className="divider" style={{ marginTop: '1em' }} />
              <div className="two-col">
                <div className="two-col-info">
                  <p className="tile-label">Interval:</p>
                  <span className="medium-digit">30 mins</span>
                </div>
                <div className="two-col-info">
                  <p className="tile-label">Next photo:</p>
                  <Countdown
                    date={this.state.nextPhotoUnix}
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
                  <StyledButton isDot size="small">
                    <img src={Gallery} alt="Gallery" style={{ width: '50%' }} />
                  </StyledButton>
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
            </Fragment>
          ) : (
            <h1
              className="tile-heading"
              style={{
                alignSelf: 'center',
                flex: 1,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              Photos not being recorded.
            </h1>
          )}
        </Tile>
        {/* Temp/Humidity */}
        <Tile style={{ gridRow: '7/11', gridColumn: '1/3' }}>
          <h1 className="tile-heading">
            <span className="active-heading">Temperature</span> | Humidity
          </h1>
          <div className="flex-row" style={{ height: '100%' }}>
            <div
              style={{
                flex: 4,
                height: '100%'
              }}
            >
              <Chart
                data={data1}
                dark
                axes={[
                  {
                    primary: true,
                    type: 'utc',
                    position: 'bottom'
                  },
                  { type: 'linear', position: 'left' }
                ]}
                getSeriesStyle={series => ({
                  color: '#e7d622'
                })}
                primaryCursor
                secondaryCursor
                tooltip
              />
            </div>
            <div
              className="flex-col"
              style={{
                textAlign: 'left',
                margin: 'auto',
                flex: 1,
                paddingLeft: '2em'
              }}
            >
              <p className="tile-label">Current:</p>
              <span className="large-digit">{temperature}</span>
              <div style={{ display: 'flex' }}>
                <div className="small-readout">
                  <p className="tile-label">High:</p>
                  <span className="medium-digit">{temperature}</span>
                </div>
                <div className="small-readout">
                  <p className="tile-label">Low:</p>
                  <span className="medium-digit">{temperature}</span>
                </div>
              </div>
            </div>
          </div>
        </Tile>
        {/* Analysis */}
        <Tile style={{ gridRow: '1/6', textAlign: 'left' }}>
          <h1 className="tile-heading">Analysis Details:</h1>
          <div style={{ padding: '0.25em 0 0.25em 0' }}>
            <p className="tile-label" style={{ marginBottom: 0 }}>
              Number of regions:
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
              {noReg}
            </p>
          </div>
          <hr className="divider" />
          <div style={{ padding: '0.25em 0 0.25em 0' }}>
            <p className="tile-label" style={{ marginBottom: 0 }}>
              Bacterial %:
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
              {Math.floor(bacPer * 100) / 100}%
            </p>
          </div>
          <hr className="divider" />
          <div style={{ padding: '0.25em 0 0.25em 0' }}>
            <p className="tile-label" style={{ marginBottom: 0 }}>
              E-coli likelihood:
            </p>
            <p
              className="large-digit"
              style={{
                marginTop: '-.4em',
                marginBottom: '.25em',
                marginRight: '.25em',
                textAlign: 'right',
                color: '#00d7c2'
              }}
            >
              12%
            </p>
          </div>
        </Tile>
        {/* Metadata */}
        <Tile style={{ gridRow: '6/11' }}>
          <h1 className="tile-heading">Metadata:</h1>
          <FormInput isMultiLine={false}>Title</FormInput>
          <FormInput isMultiLine={false}>Location</FormInput>
          <FormInput isMultiLine rows={5}>
            Description
          </FormInput>
        </Tile>
      </Screen>
    );
  }
}

export default IncubationInProgressScreen;
