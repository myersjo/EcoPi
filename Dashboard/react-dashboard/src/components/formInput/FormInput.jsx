import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
  root: {
    display: 'flex',
    flexwrap: 'wrap'
  },
  formControl: {
    width: '100%',
    marginBottom: '12px'
  },
  input: {
    color: 'white',
    fontWeight: '300',
    caretColor: '#00d7c2'
  },
  label: {
    color: '#606875',
    '&$focused': {
      color: '#00d7c2'
    }
  },
  focused: {},
  underline: {
    '&:before': {
      borderBottomColor: '#606875'
    },
    '&:after': {
      borderBottomColor: '#00d7c2'
    }
  }
});

function FormInput(props) {
  const { classes, isMultiLine, rows } = props;

  let inputField;
  if (isMultiLine) {
    inputField = (
      <Input
        multiline
        rows={rows ? rows : '4'}
        classes={{
          root: classes.input,
          underline: classes.underline,
          focused: classes.focused
        }}
      />
    );
  } else {
    inputField = (
      <Input
        classes={{
          root: classes.input,
          underline: classes.underline,
          focused: classes.focused
        }}
      />
    );
  }
  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel
          classes={{
            root: classes.label,
            focused: classes.focused
          }}
        >
          {props.children}
        </InputLabel>
        {inputField}
      </FormControl>
    </div>
  );
}

FormInput.propTypes = {
  classes: PropTypes.object.isRequired,
  isMultiLine: PropTypes.bool.isRequired,
  rows: PropTypes.number
};

export default withStyles(styles)(FormInput);
