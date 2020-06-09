import React from 'react';
import { withRouter } from 'react-router-dom';

const Signout = ({ handleLogout, history }) => {
  const handleButtonClick = () => {
    handleLogout();
    localStorage.clear();
    history.push('/');
  };
  return (
    <button type="button" onClick={handleButtonClick}>
      로그아웃
    </button>
  );
};

export default withRouter(Signout);
