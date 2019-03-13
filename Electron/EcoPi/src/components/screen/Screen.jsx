import React, { Component } from 'react';
import './Screen.scss';

class Screen extends Component {
  render() {
    return <div className="Screen">{this.props.children}</div>;
  }
}

export default Screen;
