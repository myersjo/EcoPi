
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';




const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 800,
    height: '20%',
    left: '10%',
    top: '10%',
  },
});

function NavBar(props) {
  const { classes } = props;
  return (
    <List className={classes.root}>
      <ListItem button>
        <Avatar>

        </Avatar>
        <ListItemText primary="Home"/>
      </ListItem>
      <ListItem button>
        <Avatar>

        </Avatar>
        <ListItemText primary="Upload" />
      </ListItem>
      <ListItem button>
        <Avatar>

        </Avatar>
        <ListItemText primary="Live Feed" />
      </ListItem>
      <ListItem button>
        <Avatar>

        </Avatar>
        <ListItemText primary="Log" />
      </ListItem>
      <ListItem button>
        <Avatar>

        </Avatar>
        <ListItemText primary="Reports" />
      </ListItem>
    </List>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(NavBar);
