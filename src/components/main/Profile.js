import React from 'react';
import Signout from '../auth/Signout';

const Profile = ({ profile, handleLogout }) => {
  return (
    <>
      <h2>Profile</h2>
      <ul>
        <li>Level: {profile.lv}</li>
        <li>Id: {profile.id}</li>
        <li>Email: {profile.email}</li>
      </ul>
      <div>
        <Signout handleLogout={handleLogout} />
      </div>
    </>
  );
};

export default Profile;
