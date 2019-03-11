import React, { Component } from 'react';
import './Dashboard.scss';

class Dashboard extends Component {
  render() {
    return <div className="Dashboard">{this.props.children}</div>;
  }
}

export default Dashboard;
