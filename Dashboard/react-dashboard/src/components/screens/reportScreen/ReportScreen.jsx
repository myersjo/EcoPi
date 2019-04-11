import React, { Component } from 'react';
import Screen from '../../screen/Screen.jsx';
import Tile from '../../Tile/Tile';
import FormInput from './../../formInput/FormInput.jsx';
import Uploadimg from './../../uploadimg/Uploadimg.jsx';
import GraphA from './../../../assets/firstgraph.png';
import GraphB from './../../../assets/secondgraph.png';
import './ReportScreen.scss';

class ReportScreen extends Component {
  render() {
    return (
      <Screen>
        <Tile style={{ gridRow: '1/6', gridColumn: '1/3' }}>
          <h1
            className="tile-heading"
            style={{ lineheight: 0, marginBottom: 0 }}
          >
            Number of Colonies over time:
          </h1>
          <img src={GraphB} alt="Gallery" style={{ width: '80%' }} />
        </Tile>

        <Tile style={{ gridRow: '6/11', gridColumn: '1/3' }}>
          <h1
            className="tile-heading"
            style={{ lineheight: 0, marginBottom: 0 }}
          >
            Percentage area of Bacteria over time:
          </h1>
          <img src={GraphA} alt="Gallery" style={{ width: '80%' }} />
        </Tile>
      </Screen>
    );
  }
}

export default ReportScreen;
