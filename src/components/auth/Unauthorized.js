import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const Unauthorized = () => {
  return (
    <>
      <h2>401</h2>
      <h3>Authorization required</h3>
      <p>접근 권한이 없습니다. 로그인 해주세요.</p>
      <Button
        variant="text"
        color="primary"
        size="large"
        component={RouterLink}
        to="/signin"
      >
        로그인
      </Button>
    </>
  );
};

export default Unauthorized;
