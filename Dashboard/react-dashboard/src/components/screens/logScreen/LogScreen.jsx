import React, { Component } from 'react';
import Screen from '../../screen/Screen.jsx';
import Tile from '../../Tile/Tile';
import StyledButton from './../../styledButton/StyledButton.jsx';
import Info from './../../../assets/icons/info.svg';
import snapshotDummyData from './../../../assets/snapshot.json';
import PetriDish from './../../../assets/petriDish.png';

let bacPer = snapshotDummyData.image_analysis.BacteriaPercentage;
let noReg = snapshotDummyData.image_analysis.number_regions;
let temperature = snapshotDummyData.incubator_state.temperature;
let unixTime = snapshotDummyData.timestamp;

var snapshotTimes = [
  '02/April/2019',
  '02/April/2019',
  '02/April/2019',
  '03/April/2019',
  '03/April/2019',
  '03/April/2019'
];
var bacteriaPerc = ['01%', '22%', '34%', '65%', '11%', '22%'];
var incubationTime = [
  '8 Hours',
  '8 Hours',
  '7.30 Hours',
  '9 Hours',
  '6 Hours',
  '14 Hours'
];

class LogScreen extends Component {
  handleNewSnapshot() {
    // TODO: Update snapshot varables here.
    // Note (dont update time)
  }

  handleClick = () => {
    this.setState({
      currentSnap: snapshotTimes[0],
      currentBacteria: bacteriaPerc[0],
      currentIncTime: incubationTime[0]
    });
  };
  handleClick1 = () => {
    this.setState({
      currentSnap: snapshotTimes[1],
      currentBacteria: bacteriaPerc[1],
      currentIncTime: incubationTime[1]
    });
  };
  handleClick2 = () => {
    this.setState({
      currentSnap: snapshotTimes[2],
      currentBacteria: bacteriaPerc[2],
      currentIncTime: incubationTime[2]
    });
  };
  handleClick3 = () => {
    this.setState({
      currentSnap: snapshotTimes[3],
      currentBacteria: bacteriaPerc[3],
      currentIncTime: incubationTime[3]
    });
  };
  handleClick4 = () => {
    this.setState({
      currentSnap: snapshotTimes[4],
      currentBacteria: bacteriaPerc[4],
      currentIncTime: incubationTime[4]
    });
  };
  handleClick5 = () => {
    this.setState({
      currentSnap: snapshotTimes[5],
      currentBacteria: bacteriaPerc[5],
      currentIncTime: incubationTime[5]
    });
  };

  constructor(props) {
    super(props);
    var currentSnap = '';
    this.state = {
      currentSnap: ''
    };
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.handleClick1 = this.handleClick1.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.handleClick3 = this.handleClick3.bind(this);
    this.handleClick4 = this.handleClick4.bind(this);
    this.handleClick5 = this.handleClick5.bind(this);
  }
  render() {
    return (
      <Screen>
        <Tile style={{ gridRow: '1/4' }}>
          <h1 className="tile-heading" style={{ margin: 0 }}>
            First Report:
          </h1>
          <div className="two-col">
            <div className="two-col-info">
              <p className="tile-label">Date of Incubation:</p>
              <span className="date-time">{snapshotTimes[0]}</span>
            </div>
            <div className="two-col-info">
              <p className="tile-label">Ecoli %:</p>
              <span className="medium-digit">
                {bacteriaPerc[0]} Ecoli present
              </span>
            </div>
          </div>
          <button
            onClick={this.handleClick}
            img={Info}
            style={{
              width: '30%',
              height: '30%',
              color: 'white',
              borderColor: '#00d7c2',
              backgroundColor: '#00d7c2',
              '&:hover': { backgroundColor: '#009788' }
            }}
          >
            {/*//<img src={Info} alt="Info" style={{ width: '2%' }} />*/}
            See More
          </button>
        </Tile>
        <Tile style={{ gridRow: '1/4' }}>
          <h1 className="tile-heading" style={{ margin: 0 }}>
            Second Report:
          </h1>
          <div className="two-col">
            <div className="two-col-info">
              <p className="tile-label">Date of Incubation:</p>
              <span className="date-time">{snapshotTimes[1]}</span>
            </div>
            <div className="two-col-info">
              <p className="tile-label">Ecoli %:</p>
              <span className="medium-digit">
                {bacteriaPerc[1]} Ecoli present
              </span>
            </div>
          </div>
          <button
            onClick={this.handleClick1}
            img={Info}
            style={{
              width: '30%',
              height: '30%',
              color: 'white',
              borderColor: '#00d7c2',
              backgroundColor: '#00d7c2',
              '&:hover': { backgroundColor: '#009788' }
            }}
          >
            {/*//<img src={Info} alt="Info" style={{ width: '2%' }} />*/}
            See More
          </button>
        </Tile>
        <Tile style={{ gridRow: '1/4' }}>
          <h1 className="tile-heading" style={{ margin: 0 }}>
            Third Report:
          </h1>
          <div className="two-col">
            <div className="two-col-info">
              <p className="tile-label">Date of Incubation:</p>
              <span className="date-time">{snapshotTimes[2]}</span>
            </div>
            <div className="two-col-info">
              <p className="tile-label">Ecoli %:</p>
              <span className="medium-digit">
                {bacteriaPerc[2]} Ecoli present
              </span>
            </div>
          </div>
          <button
            onClick={this.handleClick2}
            img={Info}
            style={{
              width: '30%',
              height: '30%',
              color: 'white',
              borderColor: '#00d7c2',
              backgroundColor: '#00d7c2',
              '&:hover': { backgroundColor: '#009788' }
            }}
          >
            {/*//<img src={Info} alt="Info" style={{ width: '2%' }} />*/}
            See More
          </button>
        </Tile>
        <Tile style={{ gridRow: '4/7' }}>
          <h1 className="tile-heading" style={{ margin: 0 }}>
            Fourth Report:
          </h1>
          <div className="two-col">
            <div className="two-col-info">
              <p className="tile-label">Date of Incubation:</p>
              <span className="date-time">{snapshotTimes[3]}</span>
            </div>
            <div className="two-col-info">
              <p className="tile-label">Ecoli %:</p>
              <span className="medium-digit">
                {bacteriaPerc[3]} Ecoli present
              </span>
            </div>
          </div>
          <button
            onClick={this.handleClick3}
            img={Info}
            style={{
              width: '30%',
              height: '30%',
              color: 'white',
              borderColor: '#00d7c2',
              backgroundColor: '#00d7c2',
              '&:hover': { backgroundColor: '#009788' }
            }}
          >
            {/*//<img src={Info} alt="Info" style={{ width: '2%' }} />*/}
            See More
          </button>
        </Tile>
        <Tile style={{ gridRow: '4/7' }}>
          <h1 className="tile-heading" style={{ margin: 0 }}>
            Fifth Report:
          </h1>
          <div className="two-col">
            <div className="two-col-info">
              <p className="tile-label">Date of Incubation:</p>
              <span className="date-time">{snapshotTimes[4]}</span>
            </div>
            <div className="two-col-info">
              <p className="tile-label">Ecoli %:</p>
              <span className="medium-digit">
                {bacteriaPerc[4]} Ecoli present
              </span>
            </div>
          </div>
          <button
            onClick={this.handleClick4}
            img={Info}
            style={{
              width: '30%',
              height: '30%',
              color: 'white',
              borderColor: '#00d7c2',
              backgroundColor: '#00d7c2',
              '&:hover': { backgroundColor: '#009788' }
            }}
          >
            {/*//<img src={Info} alt="Info" style={{ width: '2%' }} />*/}
            See More
          </button>
        </Tile>
        <Tile style={{ gridRow: '4/7' }}>
          <h1 className="tile-heading" style={{ margin: 0 }}>
            Sixth Report:
          </h1>
          <div className="two-col">
            <div className="two-col-info">
              <p className="tile-label">Date of Incubation:</p>
              <span className="date-time">{snapshotTimes[5]}</span>
            </div>
            <div className="two-col-info">
              <p className="tile-label">Ecoli %:</p>
              <span className="medium-digit">
                {bacteriaPerc[5]} Ecoli present
              </span>
            </div>
          </div>
          <button
            onClick={this.handleClick5}
            img={Info}
            style={{
              width: '30%',
              height: '30%',
              color: 'white',
              borderColor: '#00d7c2',
              backgroundColor: '#00d7c2',
              '&:hover': { backgroundColor: '#009788' }
            }}
          >
            {/*//<img src={Info} alt="Info" style={{ width: '2%' }} />*/}
            See More
          </button>
        </Tile>

        <Tile style={{ gridRow: '7/11', gridColumn: '1/4' }}>
          <h1 className="tile-heading">Log Info:</h1>
          <div className="two-col">
            <div className="two-col-info">
              <p className="tile-label">Date of Incubation:</p>
              <span className="date-time">{this.state.currentSnap}</span>
              <div style={{ padding: '0.25em 0 0.25em 0' }}> </div>
              <p className="tile-label">Percentage Of Bacteria:</p>
              <span className="bacteria">{this.state.currentBacteria}</span>
            </div>
            <div className="two-col-info">
              <p className="tile-label">Total Incubation Time:</p>
              <span className="medium-digit">{this.state.currentIncTime}</span>
              <div className="tile-label">
                <p className="tile-label">Latest photo:</p>
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
              </div>
            </div>
          </div>
        </Tile>
      </Screen>
    );
  }
}

export default LogScreen;
