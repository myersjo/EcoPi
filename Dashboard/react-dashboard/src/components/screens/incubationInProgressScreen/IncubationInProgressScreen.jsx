import React, { Component } from 'react';
import Screen from '../../screen/Screen.jsx';
import Tile from '../../tile/Tile';
import FormInput from './../../formInput/FormInput.jsx';
import Button from './../../button/Button.jsx';
import Gallery from './../../../assets/icons/gallery.svg';
import Countdown from 'react-countdown-now';
import './IncubationInProgressScreen.scss';

//Chart imports
import { Chart } from 'react-charts';
import Countdown1 from 'react-countdown-clock';
import CircularProgressBar from './../../circularProgressBar/circularProgressBar.jsx';

//Temporary graph images
import ProgressBarSvg from './../../../assets/placeholder-graphs/progress-bar.svg';

import PetriDish from './../../../assets/petriDish.png';
import snapshotDummyData from './../../../assets/snapshot.json';

//Globals
let snapshotData = snapshotDummyData;
let incubationLength = 28800000;

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
    // TODO: Update snapshot varables here.
    // Note (dont update time)
  }

  handleTempHumUpdate() {}

  constructor(props) {
    super(props);

    // Setup time values
    let startUnix = new Date();
    let finishUnix = Date.now() + incubationLength; // TODO: Change this incubationLength to state/prop
    let finish = new Date(finishUnix);

    this.state = {
      startUnix: startUnix,
      startTime: this.formatTime(startUnix),
      startDate: this.formatDate(startUnix),
      finishUnix: finishUnix,
      finishTime: this.formatTime(finish),
      finishDate: this.formatDate(finish),
      completion: 0
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        completion: (Date.now() - this.state.startUnix) / incubationLength
      });
    }, 10000); //Update every 10s
  }

  render() {
    return (
      <Screen>
        {/* Time */}
        <Tile style={{ gridRow: '1/7' }}>
          <h1 className="tile-heading">Time Remaining:</h1>
          {/* <div
            style={{
              // marginTop: '',
              // marginBottom: '',
              // marginRight: '',
              // textAlign: 'center'
              display: 'flex',
              justifyContent: 'left',
              alignItems: 'left',
              maxWidth: '100%',
              maxHeight: '100%'

            }}
          >
            <Countdown1
              seconds={28800000}
              color="#00CFBB"
              alpha={0.9}
              size={100}
              weight={10}
              timeFormat="hms"
              fontSize={0}
            />
          </div> */}
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
              text={`${10}%`}
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
        <Tile style={{ gridRow: '1/6' }}>
          <h1 className="tile-heading">Analysis Details:</h1>
          <div style={{ textAlign: 'left', margin: 'auto' }}>
            <ol>
              <li>
                <p>No of regions: {noReg}</p>
              </li>
              <li>
                <p>Bacterial %: {bacPer} </p>
              </li>
            </ol>
          </div>
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
