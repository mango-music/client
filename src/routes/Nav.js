import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Home, Explore, LibraryMusic, Grade } from '@material-ui/icons';
import '../styles/Nav.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'fixed',
    left: 0,
    bottom: 0,
    zIndex: 10,
    borderTop: '1px solid rgba(255, 255, 255, 0.3)',
  },
}));

const Nav = ({ nickname, playerSize }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleLinkClick = (e) => {
    e.stopPropagation(); // can prevent overlapped click event?
    console.log('Page changed!');
  };
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      classes={classes}
      className={`player-brother-${playerSize}`}
    >
      <BottomNavigationAction
        label="Home"
        icon={<Home />}
        component={RouterLink}
        // exact
        to={`/@${nickname}`}
        onClick={handleLinkClick}
      />
      <BottomNavigationAction
        label="Explore"
        icon={<Explore />}
        component={RouterLink}
        to={`/@${nickname}/explore`}
        onClick={handleLinkClick}
      />
      <BottomNavigationAction
        label="Library"
        icon={<LibraryMusic />}
        component={RouterLink}
        to={`/@${nickname}/library`}
        onClick={handleLinkClick}
      />
      <BottomNavigationAction
        label="Rating"
        icon={<Grade />}
        component={RouterLink}
        to={`/@${nickname}/rating`}
        onClick={handleLinkClick}
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
