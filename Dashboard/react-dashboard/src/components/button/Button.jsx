import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

const styles = theme => ({
  root: {
    color: 'white',
    backgroundColor: '#00d7c2',
    '&:hover': {
      backgroundColor: '#009788'
    }
  }
});

function Button(props) {
  const { classes, size } = props;

  return (
    <Fab
      aria-label="View all photos"
      className={classes.root}
      size={size ? size : 'medium'}
    >
      {props.children}
    </Fab>
  );
}

Button.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Button);
