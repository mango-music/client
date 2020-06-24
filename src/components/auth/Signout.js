import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import postSignout from '../../lib/apis/postSignout';

const Signout = ({ handleLogout, history }) => {
  const handleClick = async () => {
    const access_token = localStorage.getItem('x-access-token');
    const refresh_token = localStorage.getItem('x-refresh-token');
    const { status } = await postSignout({ access_token, refresh_token });
    // console.log(status);
    if (status === 200) {
      handleLogout();
      localStorage.clear();
      setTimeout(() => history.push('/'), 0);
      // useEffect dependency로 삼을 state 혹은 ref가 없으므로
      // 차선책으로 setTimeout으로 순서 보장
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
