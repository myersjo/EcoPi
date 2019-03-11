import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';
import './Navbar.scss';

import Home from './../../assets/nav-icons/home.svg';
import LiveFeed from './../../assets/nav-icons/live-feed.svg';
import Log from './../../assets/nav-icons/log.svg';
import Reports from './../../assets/nav-icons/reports.svg';
import Upload from './../../assets/nav-icons/upload.svg';

class Navbar extends Component {
  render() {
    const { activeIndex, handleSlideChange } = this.props;

    return (
      <div className="Navbar">
        <VerticalTabs value={activeIndex} onChange={handleSlideChange}>
          <VerticalTab
            icon={<img className="nav-icon" src={Home} alt="Home" />}
            label="Home"
          />
          <VerticalTab
            icon={<img className="nav-icon" src={Upload} alt="Upload" />}
            label="Upload"
          />
          <VerticalTab
            icon={<img className="nav-icon" src={LiveFeed} alt="LiveFeed" />}
            label="Live Feed"
          />
          <VerticalTab
            icon={<img className="nav-icon" src={Log} alt="Log" />}
            label="Log"
          />
          <VerticalTab
            icon={<img className="nav-icon" src={Reports} alt="Reports" />}
            label="Reports"
          />
        </VerticalTabs>
      </div>
    );
  }
}

const VerticalTabs = withStyles(theme => ({
  root: {
    // textSize: "50px"
  },
  flexContainer: {
    flexDirection: 'column'
  },
  indicator: {
    display: 'none'
  }
}))(Tabs);

const VerticalTab = withStyles(theme => ({
  root: {
    borderRight: '1px solid rgba(255,255,255,.5)',
    textAlign: 'left',
    paddingRight: '1px'
  },
  wrapper: {
    flexDirection: 'row'
  },
  labelContainer: {
    margin: '2em 2em 2em 0'
  },
  label: {
    fontSize: '20px'
  },
  selected: {
    // color: "#00d7c2",
    borderRight: '2px solid #00d7c2',
    paddingRight: '0px'
  }
}))(Tab);

export default Navbar;
