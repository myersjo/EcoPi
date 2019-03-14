import React, { Component } from 'react';
import './Tile.scss';

class Tile extends Component {
  render() {
    return (
      <div style={this.props.style} className="Tile">
        {this.props.children}
      </div>
    );
  }
}

export default Tile;
