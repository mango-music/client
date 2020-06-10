import React from 'react';
import { NavLink } from 'react-router-dom';

const activeStyle = {
  fontWeight: 'bold',
  color: 'red',
};

const Nav = ({ profile }) => {
  return (
    <nav>
      <ul>
        <NavLink exact to={`/@${profile.id}`} activeStyle={activeStyle}>
          <li>Home</li>
        </NavLink>
        <NavLink to={`/@${profile.id}/explore`} activeStyle={activeStyle}>
          <li>Explore</li>
        </NavLink>
        <NavLink to={`/@${profile.id}/library`} activeStyle={activeStyle}>
          <li>Library</li>
        </NavLink>
        <NavLink to={`/@${profile.id}/profile`} activeStyle={activeStyle}>
          <li>Profile</li>
        </NavLink>
        <NavLink to={`/@${profile.id}/player`} activeStyle={activeStyle}>
          <li>Player</li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Nav;
