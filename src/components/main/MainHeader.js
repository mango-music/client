import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import '../../styles/MainHeader.scss';
import IconButton from '@material-ui/core/IconButton';
import { AccountCircle } from '@material-ui/icons';

const MainHeader = ({ title, nickname }) => {
  return (
    <header className="main-header">
      <div>
        <p>{title}</p>
      </div>
      <IconButton
        aria-label="profile page"
        size="medium"
        component={RouterLink}
        to={`/@${nickname}/profile`}
      >
        <AccountCircle style={{ fontSize: '30px' }} />
      </IconButton>
    </header>
  );
};

export default MainHeader;
