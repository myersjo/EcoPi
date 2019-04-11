import React, { Component } from 'react';
import Screen from '../../screen/Screen.jsx';
import Tile from '../../tile/Tile';
import StyledButton from './../../styledButton/StyledButton.jsx';
import Info from './../../../assets/icons/info.svg';
import PetriDish from './../../../assets/petriDish.png';

class LogScreen extends Component {
  handleNewSnapshot() {}
  constructor(props) {
    super(props);
    let current = '';
    var snapshotList = new Array(6);

    //takes in all unix time from each snapshot, computes the date, is put into an array and then the states are updated.
    let snapshotUnix = new Array(6);
    let regionArray = new Array(6);
    let bacArray = new Array(6);
    let temperature = new Array(6);
    let humidity = new Array(6);
    let snapshotTimes = [];
    let snapshotHMS = [];
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];

    for (var i = 0; i < props.snapshotHistory.length; i++) {
      console.log('boo' + i);
      snapshotList[i] = props.snapshotHistory[i];
      snapshotUnix[i] = snapshotList[i].timestamp;
      var firstDate = new Date(snapshotUnix[i] * 1000);

      var year = firstDate.getFullYear();
      var month = months[firstDate.getMonth()];
      var date = firstDate.getDate();
      var hour = firstDate.getHours();
      var min = firstDate.getMinutes();
      var sec = firstDate.getSeconds();
      var time = date + ' ' + month + ' ' + year;
      var hms = hour + ':' + min + ':' + sec;
      snapshotTimes[i] = time;
      snapshotHMS[i] = hms;
      bacArray[i] = [
        snapshotList[i].image_analysis[0].BacteriaPercentage,
        snapshotList[i].image_analysis[1].BacteriaPercentage,
        snapshotList[i].image_analysis[2].BacteriaPercentage,
        snapshotList[i].image_analysis[3].BacteriaPercentage
      ];
      regionArray[i] = [
        snapshotList[i].image_analysis[0].number_regions,
        snapshotList[i].image_analysis[1].number_regions,
        snapshotList[i].image_analysis[2].number_regions,
        snapshotList[i].image_analysis[3].number_regions
      ];
      temperature[i] = snapshotList[i].incubator_state.temperature;
      humidity[i] = snapshotList[i].incubator_state.humidity;
    }
    //I know this is a poor solution for when there is less than 6 snapshots, but code freeze is tomorrow and it doesnt really matter
    for (var i = props.snapshotHistory.length; i < 6; i++) {
      snapshotList[i] = [];
      snapshotUnix[i] = 0;
      var firstDate = new Date(snapshotUnix[i] * 1000);

      var year = firstDate.getFullYear();
      var month = months[firstDate.getMonth()];
      var date = firstDate.getDate();
      var hour = firstDate.getHours();
      var min = firstDate.getMinutes();
      var sec = firstDate.getSeconds();
      var time = date + ' ' + month + ' ' + year;
      var hms = hour + ':' + min + ':' + sec;
      snapshotTimes[i] = time;
      snapshotHMS[i] = hms;
      bacArray[i] = [0, 0, 0, 0];
      regionArray[i] = [0, 0, 0, 0];
      temperature[i] = 0;
      humidity[i] = 0;
    }

    let incubationTime = [
      '8 Hours',
      '8 Hours',
      '7.30 Hours',
      '9 Hours',
      '6 Hours',
      '14 Hours'
    ];

    this.state = {
      current: '',
      snapshotTimes: snapshotTimes,
      snapshotHMS: snapshotHMS,
      //bacteriaPerc: bacteriaPerc,
      firstBacPer: bacArray[0],
      secondBacPer: bacArray[1],
      thirdBacPer: bacArray[2],
      fourthBacPer: bacArray[3],
      fifthBacPer: bacArray[4],
      sixthBacPer: bacArray[5],
      firstBacPer: regionArray[0],
      secondRegions: regionArray[1],
      thirdRegions: regionArray[2],
      fourthRegions: regionArray[3],
      fifthRegions: regionArray[4],
      sixthRegions: regionArray[5],
      incubationTime: incubationTime,
      temperature: temperature,
      humidity: humidity
    };
    // This binding is necessary to make `this` work in the callback
    //handleClick for the 6 see more buttons
    //probably able to pass in arguments to make it one function but it kept breaking and not sure why
    this.handleClick = this.handleClick.bind(
      this,
      snapshotTimes,
      incubationTime,
      temperature,
      humidity,
      bacArray[0],
      snapshotHMS,
      regionArray[0]
    );
    this.handleClick1 = this.handleClick1.bind(
      this,
      snapshotTimes,
      incubationTime,
      temperature,
      humidity,
      bacArray[1],
      snapshotHMS,
      regionArray[1]
    );
    this.handleClick2 = this.handleClick2.bind(
      this,
      snapshotTimes,
      incubationTime,
      temperature,
      humidity,
      bacArray[2],
      snapshotHMS,
      regionArray[2]
    );
    this.handleClick3 = this.handleClick3.bind(
      this,
      snapshotTimes,
      incubationTime,
      temperature,
      humidity,
      bacArray[3],
      snapshotHMS,
      regionArray[3]
    );
    this.handleClick4 = this.handleClick4.bind(
      this,
      snapshotTimes,
      incubationTime,
      temperature,
      humidity,
      bacArray[4],
      snapshotHMS,
      regionArray[4]
    );
    this.handleClick5 = this.handleClick5.bind(
      this,
      snapshotTimes,
      incubationTime,
      temperature,
      humidity,
      bacArray[5],
      snapshotHMS,
      regionArray[5]
    );
  }

  handleClick = (
    snapshotTimes,
    incubationTime,
    temperature,
    humidity,
    firstBacPer,
    snapshotHMS,
    firstRegions
  ) => {
    this.setState({
      current: snapshotTimes[0],
      currentHMS: snapshotHMS[0],

      currentA: firstBacPer[0],
      currentB: firstBacPer[1],
      currentC: firstBacPer[2],
      currentD: firstBacPer[3],

      currentRegA: firstRegions[0],
      currentRegB: firstRegions[1],
      currentRegC: firstRegions[2],
      currentRegD: firstRegions[3],

      currentIncTime: incubationTime[0],
      currentTemp: temperature[0],
      currentHum: humidity[0]
    });
  };
  handleClick1 = (
    snapshotTimes,
    incubationTime,
    temperature,
    humidity,
    secondBacPer,
    snapshotHMS,
    secondRegions
  ) => {
    this.setState({
      current: snapshotTimes[1],
      currentHMS: snapshotHMS[1],

      currentA: secondBacPer[0],
      currentB: secondBacPer[1],
      currentC: secondBacPer[2],
      currentD: secondBacPer[3],

      currentRegA: secondRegions[0],
      currentRegB: secondRegions[1],
      currentRegC: secondRegions[2],
      currentRegD: secondRegions[3],

      currentIncTime: incubationTime[1],
      currentTemp: temperature[1],
      currentHum: humidity[1]
    });
  };
  handleClick2 = (
    snapshotTimes,
    incubationTime,
    temperature,
    humidity,
    thirdBacPer,
    snapshotHMS,
    thirdRegions
  ) => {
    this.setState({
      current: snapshotTimes[2],
      currentHMS: snapshotHMS[1],
      currentA: thirdBacPer[0],
      currentB: thirdBacPer[1],
      currentC: thirdBacPer[2],
      currentD: thirdBacPer[3],

      currentRegA: thirdRegions[0],
      currentRegB: thirdRegions[1],
      currentRegC: thirdRegions[2],
      currentRegD: thirdRegions[3],

      currentIncTime: incubationTime[2],
      currentTemp: temperature[2],
      currentHum: humidity[2]
    });
  };
  handleClick3 = (
    snapshotTimes,
    incubationTime,
    temperature,
    humidity,
    fourthBacPer,
    snapshotHMS,
    fourthRegions
  ) => {
    this.setState({
      current: snapshotTimes[3],
      currentHMS: snapshotHMS[1],
      currentA: fourthBacPer[0],
      currentB: fourthBacPer[1],
      currentC: fourthBacPer[2],
      currentD: fourthBacPer[3],

      currentRegA: fourthRegions[0],
      currentRegB: fourthRegions[1],
      currentRegC: fourthRegions[2],
      currentRegD: fourthRegions[3],
      currentIncTime: incubationTime[3],
      currentTemp: temperature[3],
      currentHum: humidity[3]
    });
  };
  handleClick4 = (
    snapshotTimes,
    incubationTime,
    temperature,
    humidity,
    fifthBacPer,
    snapshotHMS,
    fifthRegions
  ) => {
    this.setState({
      current: snapshotTimes[4],
      currentHMS: snapshotHMS[1],
      currentA: fifthBacPer[0],
      currentB: fifthBacPer[1],
      currentC: fifthBacPer[2],
      currentD: fifthBacPer[3],

      currentRegA: fifthRegions[0],
      currentRegB: fifthRegions[1],
      currentRegC: fifthRegions[2],
      currentRegD: fifthRegions[3],

      currentIncTime: incubationTime[4],
      currentTemp: temperature[4],
      currentHum: humidity[4]
    });
  };
  handleClick5 = (
    snapshotTimes,
    incubationTime,
    temperature,
    humidity,
    sixthBacPer,
    snapshotHMS,
    sixthRegions
  ) => {
    this.setState({
      current: snapshotTimes[5],
      currentHMS: snapshotHMS[1],
      currentA: sixthBacPer[0],
      currentB: sixthBacPer[1],
      currentC: sixthBacPer[2],
      currentD: sixthBacPer[3],

      currentRegA: sixthRegions[0],
      currentRegB: sixthRegions[1],
      currentRegC: sixthRegions[2],
      currentRegD: sixthRegions[3],

      currentIncTime: incubationTime[5],
      currentTemp: temperature[5],
      currentHum: humidity[5]
    });
  };

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
              <span className="date-time">{this.state.snapshotTimes[0]}</span>
            </div>
            <div className="two-col-info">
              <p className="tile-label">Time of Snapshot:</p>
              <span className="date-time">{this.state.snapshotHMS[0]}</span>
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
              <span className="date-time">{this.state.snapshotTimes[1]}</span>
            </div>
            <div className="two-col-info">
              <p className="tile-label">Time of Snapshot:</p>
              <span className="date-time">{this.state.snapshotHMS[1]}</span>
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
              <span className="date-time">{this.state.snapshotTimes[2]}</span>
            </div>
            <div className="two-col-info">
              <p className="tile-label">Time of Snapshot:</p>
              <span className="date-time">{this.state.snapshotHMS[2]}</span>
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
              <span className="date-time">{this.state.snapshotTimes[3]}</span>
            </div>
            <div className="two-col-info">
              <p className="tile-label">Time of Snapshot:</p>
              <span className="date-time">{this.state.snapshotHMS[3]}</span>
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
              <span className="date-time">{this.state.snapshotTimes[4]}</span>
            </div>
            <div className="two-col-info">
              <p className="tile-label">Time of Snapshot:</p>
              <span className="date-time">{this.state.snapshotHMS[4]}</span>
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
              <span className="date-time">{this.state.snapshotTimes[5]}</span>
            </div>
            <div className="two-col-info">
              <p className="tile-label">Time of Snapshot:</p>
              <span className="date-time">{this.state.snapshotHMS[5]}</span>
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
          <h1
            className="tile-heading"
            style={{ lineheight: 0, marginBottom: 0 }}
          >
            Log Info:
          </h1>
          <div className="three-col">
            <div
              className="three-col-info"
              style={{ justifyContent: 'centre', alignItems: 'centre' }}
            >
              <p className="tile-label">Date of Incubation:</p>
              <span className="date-time">{this.state.current}</span>
              <div style={{ padding: '0.25em 0 0.25em 0' }}> </div>
              <p className="tile-label">Time of Incubation</p>
              <span className="bacteria">{this.state.currentHMS}</span>
              <div style={{ padding: '0.25em 0 0.25em 0' }}> </div>

              <p className="tile-label">Temperature:</p>
              <span className="bacteria">{this.state.currentTemp}</span>
              <div style={{ padding: '0.25em 0 0.25em 0' }}> </div>
              <p className="tile-label">Humidity:</p>
              <span className="bacteria">{this.state.currentHum}</span>
            </div>
            <div
              className="three-col-info"
              style={{ justifyContent: 'left', alignItems: 'left' }}
            >
              <p className="tile-label">Percentage Of Bacteria (A):</p>
              <span className="bacteria">
                {Math.floor(this.state.currentA * 100) / 100}%
              </span>
              <div style={{ padding: '0.25em 0 0.25em 0' }}> </div>
              <p className="tile-label">Percentage Of Bacteria (B):</p>
              <span className="bacteria">
                {Math.floor(this.state.currentB * 100) / 100}%
              </span>
              <div style={{ padding: '0.25em 0 0.25em 0' }}> </div>
              <p className="tile-label">Percentage Of Bacteria (C):</p>
              <span className="bacteria">
                {Math.floor(this.state.currentC * 100) / 100}%
              </span>
              <div style={{ padding: '0.25em 0 0.25em 0' }}> </div>
              <p className="tile-label">Percentage Of Bacteria (D):</p>
              <span className="bacteria">
                {Math.floor(this.state.currentD * 100) / 100}%
              </span>
            </div>
            <div
              className="three-col-info"
              style={{ justifyContent: 'left', alignItems: 'left' }}
            >
              <p className="tile-label">No of Dots (A):</p>
              <span className="bacteria">{this.state.currentRegA}</span>
              <div style={{ padding: '0.25em 0 0.25em 0' }}> </div>
              <p className="tile-label">No of Dots (B):</p>
              <span className="bacteria">{this.state.currentRegB}</span>
              <div style={{ padding: '0.25em 0 0.25em 0' }}> </div>
              <p className="tile-label">No of Dots (C):</p>
              <span className="bacteria">{this.state.currentRegC}</span>
              <div style={{ padding: '0.25em 0 0.25em 0' }}> </div>
              <p className="tile-label">No of Dots (D):</p>
              <span className="bacteria">{this.state.currentRegD}</span>
            </div>
          </div>
        </Tile>
      </Screen>
    );
  }
}

export default LogScreen;
