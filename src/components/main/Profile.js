import React from 'react';

const Profile = ({ profile }) => {
  return (
    <>
      <h2>Profile</h2>
      <ul>
        <li>Level: {profile.lv}</li>
        <li>Id: {profile.id}</li>
        <li>Email: {profile.email}</li>
      </ul>
    </>
  );
};

export default Profile;
