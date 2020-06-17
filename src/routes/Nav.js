import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Home, Explore, LibraryMusic, AccountCircle } from '@material-ui/icons';

const useNavStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.common.white,
    position: 'fixed',
    left: 0,
    bottom: 0,
  },
})); // Create new classes to Mui Component

const Nav = ({ nickname }) => {
  const [value, setValue] = useState(0);
  const classes = useNavStyles();
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels={true}
      classes={classes}
    >
      <BottomNavigationAction
        label="Home"
        icon={<Home />}
        component={RouterLink}
        exact
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
        label="Profile"
        icon={<AccountCircle />}
        component={RouterLink}
        to={`/@${nickname}/profile`}
      />
    </BottomNavigation>
  );
};

export default Nav;
