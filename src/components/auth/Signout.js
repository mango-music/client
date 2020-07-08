import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import postSignout from '../../lib/apis/postSignout';

const Signout = ({ handleLogout, history }) => {
  const handleLogoutButtonClick = async () => {
    const access_token = localStorage.getItem('x-access-token');
    const refresh_token = localStorage.getItem('x-refresh-token');
    const res = await postSignout({ access_token, refresh_token });
    // console.log('로그아웃 서버 응답', res);
    if (res === 'ok') {
      handleLogout();
      localStorage.clear();
      setTimeout(() => history.push('/'), 0);
      // useEffect dependency로 삼을 state 혹은 ref가 없으므로
      // 차선책으로 setTimeout으로 순서 보장
    }
  };
  return (
    <Button
      variant="contained"
      color="default"
      size="large"
      onClick={handleLogoutButtonClick}
    >
      로그아웃
    </Button>
  );
};

export default withRouter(Signout);
