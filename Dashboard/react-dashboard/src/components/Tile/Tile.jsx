import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown-now';
import './Tile.scss';

class Tile extends Component {
  render() {
    //timer in progress
    /*  const Completionist = () => <span>You are good to go!</span>;

    ReactDOM.render(
      (
        <Countdown date={Date.now() + 10000}>
          <Completionist />
        </Countdown>
      ),
      document.getElementById('root')
    ); */
    return (
      <div style={this.props.style} className="Tile">
        {this.props.children}
      </div>
    );
  }
}

export default Tile;
