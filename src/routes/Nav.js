import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Home, Explore, LibraryMusic, Grade } from '@material-ui/icons';
import '../styles/Nav.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // backgroundColor: theme.palette.grey,
    position: 'fixed',
    left: 0,
    bottom: 0,
    zIndex: 3,
  },
})); // Create new classes to Mui Component

const Nav = ({ nickname }) => {
  const [value, setValue] = useState(0);
  const classes = useStyles();
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      classes={classes}
    >
      <BottomNavigationAction
        label="Home"
        icon={<Home />}
        component={RouterLink}
        // exact
        to={`/@${nickname}`}
      />
      <BottomNavigationAction
        label="Explore"
        icon={<Explore />}
        component={RouterLink}
        to={`/@${nickname}/explore`}
      />
      <BottomNavigationAction
        label="Library"
        icon={<LibraryMusic />}
        component={RouterLink}
        to={`/@${nickname}/library`}
      />
      <BottomNavigationAction
        label="Rating"
        icon={<Grade />}
        component={RouterLink}
        to={`/@${nickname}/rating`}
      />
      {/* <BottomNavigationAction
        label="Profile"
        icon={<AccountCircle />}
        component={RouterLink}
        to={`/@${nickname}/profile`}
      /> */}
    </BottomNavigation>
  );
};

export default Nav;
