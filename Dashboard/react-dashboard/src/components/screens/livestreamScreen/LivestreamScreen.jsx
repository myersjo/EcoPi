import React, { Component } from 'react';
import Screen from '../../screen/Screen.jsx';
import Tile from '../../tile/Tile';
import './LivestreamScreen.scss';

class LivestreamScreen extends Component {
  render() {
    return (
      <Screen>
        <Tile style={{ gridRow: '1/7', gridColumn: '1/4'}}>
          <div className="livestreamContainer">
            <img className="livestream" src="http://raspberrypi.local:8080/stream/video.mjpeg" alt="livestream" height="80%" width="80%"/>
          </div>
        </Tile>
      </Screen>
    );
  }
}

export default LivestreamScreen;
