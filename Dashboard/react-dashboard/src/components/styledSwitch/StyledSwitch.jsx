import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
  colorSwitchBase: {
    color: '#00d7c2',
    '&$colorChecked': {
      color: '#00d7c2',
      '& + $colorBar': {
        backgroundColor: '#00d7c2'
      }
    }
  },
  colorBar: {},
  colorChecked: {}
});

class StyledSwitch extends Component {
  state = {
    recordPhotos: true
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;

    return (
      <Switch
        checked={this.state.recordPhotos}
        onChange={this.handleChange('recordPhotos')}
        value="recordPhotos"
        classes={{
          switchBase: classes.colorSwitchBase,
          checked: classes.colorChecked,
          bar: classes.colorBar
        }}
      />
    );
  }
}

StyledSwitch.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StyledSwitch);
