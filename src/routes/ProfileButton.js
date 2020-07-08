import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

const ProfileButton = ({ nickname }) => {
  return (
    <IconButton
      aria-label="profile-image"
      size="medium"
      component={RouterLink}
      to={`/@${nickname}/profile`}
    >
      <AccountCircle
        style={{
          color: 'rgba(255,255,255,0.7)',
        }}
      />
    </IconButton>
  );
};

export default ProfileButton;
