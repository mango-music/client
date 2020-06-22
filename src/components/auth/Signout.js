import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import postSignout from '../../lib/apis/postSignout';

const Signout = ({ handleLogout, history }) => {
  const handleClick = async () => {
    const access_token = localStorage.getItem('x-access-token');
    const refresh_token = localStorage.getItem('x-refresh-token');
    const { status } = await postSignout({ access_token, refresh_token });
    console.log(status);
    if (status === 200) {
      handleLogout();
      localStorage.clear();
      setTimeout(() => {
        history.push('/');
      }, 500);
    }
  };
  return (
    <Button
      variant="outlined"
      color="primary"
      size="large"
      fullWidth
      onClick={handleClick}
    >
      로그아웃
    </Button>
  );
};

export default withRouter(Signout);
