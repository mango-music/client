import React from 'react';
import Signout from '../auth/Signout';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../styles/Profile.scss';

const Profile = ({ profile, handleLogout }) => {
  return (
    <div id="profile">
      <header>
        <p>Profile</p>
      </header>
      <div id="profile-image">
        <FontAwesomeIcon icon={faUser} color="#afafaf" />
      </div>

      <div>{profile.id}</div>
      <div>{profile.email}</div>

      <div>
        <Signout handleLogout={handleLogout} />
      </div>
    </div>
  );
};

export default Profile;
