import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Nav.scss';

const activeStyle = {
  fontWeight: 'bold',
  color: 'red',
};

const Nav = ({ profile }) => {
  return (
    <nav id="navbar">
      <ul>
        <li>
          <NavLink exact to={`/@${profile.id}`} activeStyle={activeStyle}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={`/@${profile.id}/explore`} activeStyle={activeStyle}>
            Explore
          </NavLink>
        </li>
        <li>
          <NavLink to={`/@${profile.id}/library`} activeStyle={activeStyle}>
            Library
          </NavLink>
        </li>
        <li>
          <NavLink to={`/@${profile.id}/profile`} activeStyle={activeStyle}>
            Profile
          </NavLink>
        </li>
        {/* <NavLink to={`/@${profile.id}/player`} activeStyle={activeStyle}>
          <li>Player</li>
        </NavLink> */}
      </ul>
    </nav>
  );
};

export default Nav;
