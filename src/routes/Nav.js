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
        <NavLink to="/search" activeStyle={activeStyle}>
          <li>Search</li>
        </NavLink>
        <NavLink to={`/@${profile.id}/playlists`} activeStyle={activeStyle}>
          <li>Playlists</li>
        </NavLink>
        <NavLink to={`/@${profile.id}/profile`} activeStyle={activeStyle}>
          <li>Profile</li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Nav;
