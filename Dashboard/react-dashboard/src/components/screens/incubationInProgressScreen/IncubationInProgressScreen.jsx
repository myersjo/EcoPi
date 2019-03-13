import React, { Component } from 'react';
import Screen from '../../screen/Screen.jsx';
import Tile from '../../tile/Tile';
import FormInput from './../../formInput/FormInput.jsx';

import './IncubationInProgressScreen.scss';

//Temporary graph images
import TimerSvg from './../../../assets/placeholder-graphs/timer.svg';

class IncubationInProgressScreen extends Component {
  render() {
    return (
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
          <FormInput>Title</FormInput>
          <FormInput>Location</FormInput>
          <FormInput isMultiLine>Description</FormInput>
        </Tile>
      </Screen>
    );
  }
}

export default IncubationInProgressScreen;
