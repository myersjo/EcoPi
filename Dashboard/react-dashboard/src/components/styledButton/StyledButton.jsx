import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    color: 'white',
    backgroundColor: '#00d7c2',
    '&:hover': {
      backgroundColor: '#009788'
    }
  }
});

function StyledButton(props) {
  const { isDot, classes, size } = props;

  if (isDot) {
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

  return (
    <Button aria-label="Start incubation" className={classes.root}>
      {props.children}
    </Button>
  );
}

StyledButton.propTypes = {
  classes: PropTypes.object,
  isDot: PropTypes.bool
};

export default withStyles(styles)(StyledButton);
