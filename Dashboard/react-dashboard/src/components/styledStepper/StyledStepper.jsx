import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';

const styles = {
  slider: {
    padding: '22px 0px'
  },
  track: {
    color: '#00d7c2',
    background: '#00d7c2'
  },
  thumb: {
    color: '#00d7c2',
    background: '#00d7c2',
    '&:hover': {
      boxShadow: '0px 0px 0px 9px rgba(0, 215, 194, 0.15)'
    },
    '&:active': {
      boxShadow: '0px 0px 0px 16px rgba(0, 215, 194, 0.15)'
    }
  }
};

class StyledStepper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.initial ? this.props.initial : 30
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, width, min, max, step, unit } = this.props;
    const { value } = this.state;

    return (
      <div
        style={{
          width: width,
          flex: 3,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '1em',
          paddingRight: '1em'
        }}
      >
        <Slider
          classes={{
            container: classes.slider,
            track: classes.track,
            thumb: classes.thumb
          }}
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={this.handleChange}
        />
        <p style={{ paddingLeft: '1em', width: '30%' }}>
          {unit === 'hours' ? value.toFixed(1) : value} {unit}
        </p>
      </div>
    );
  }
}

StyledStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired
};

export default withStyles(styles)(StyledStepper);
