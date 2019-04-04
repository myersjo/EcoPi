import React, { Component } from 'react';
import Screen from '../../screen/Screen.jsx';
import Tile from '../../tile/Tile';
import Button from './../../button/Button.jsx';
import Info from './../../../assets/icons/info.svg';
import snapshotDummyData from './../../../assets/snapshot.json';
class LogScreen extends Component {
  handleNewSnapshot() {
    // TODO: Update snapshot varables here.
    // Note (dont update time)
  }

  handleClick() {}
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
              <span className="date-time">23rd / June / 1995</span>
            </div>
            <div className="two-col-info">
              <p className="tile-label">Ecoli %:</p>
              <span className="medium-digit">45% Ecoli present</span>
            </div>
          </div>
          <button
            onClick={this.handleClick}
            img={Info}
            style={{ width: '30%', height: '30%' }}
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
              <span className="date-time">23rd / June / 1995</span>
            </div>
            <div className="two-col-info">
              <p className="tile-label">Ecoli %:</p>
              <span className="medium-digit">45% Ecoli present</span>
            </div>
          </div>
          <button
            onClick={this.handleClick}
            img={Info}
            style={{ width: '30%', height: '30%' }}
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
              <span className="date-time">23rd / June / 1995</span>
            </div>
            <div className="two-col-info">
              <p className="tile-label">Ecoli %:</p>
              <span className="medium-digit">45% Ecoli present</span>
            </div>
          </div>
          <button
            onClick={this.handleClick}
            img={Info}
            style={{ width: '30%', height: '30%' }}
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
              <span className="date-time">23rd / June / 1995</span>
            </div>
            <div className="two-col-info">
              <p className="tile-label">Ecoli %:</p>
              <span className="medium-digit">45% Ecoli present</span>
            </div>
          </div>
          <button
            onClick={this.handleClick}
            img={Info}
            style={{ width: '30%', height: '30%' }}
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
              <span className="date-time">23rd / June / 1995</span>
            </div>
            <div className="two-col-info">
              <p className="tile-label">Ecoli %:</p>
              <span className="medium-digit">45% Ecoli present</span>
            </div>
          </div>
          <button
            onClick={this.handleClick}
            img={Info}
            style={{ width: '30%', height: '30%' }}
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
              <span className="date-time">23rd / June / 1995</span>
            </div>
            <div className="two-col-info">
              <p className="tile-label">Ecoli %:</p>
              <span className="medium-digit">45% Ecoli present</span>
            </div>
          </div>
          <button
            onClick={this.handleClick}
            img={Info}
            style={{ width: '30%', height: '30%' }}
          >
            {/*//<img src={Info} alt="Info" style={{ width: '2%' }} />*/}
            See More
          </button>
        </Tile>

        <Tile style={{ gridRow: '7/11', gridColumn: '1/4' }}>
          <h1 className="tile-heading">Log Info:</h1>
        </Tile>
      </Screen>
    );
  }
}

export default LogScreen;
