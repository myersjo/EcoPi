import React, { Component } from 'react';
//Todo: clean this import:
import './Dashboard.scss';

class Dashboard extends Component {
  render() {
    return <div className="Dashboard">{this.props.children}</div>;
  }
}

export default Dashboard;
