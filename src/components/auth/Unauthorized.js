import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const Unauthorized = () => {
  return (
    <>
      <h2>401 Unauthorized</h2>
      <div
        style={{
          width: '100%',
          height: '0',
          paddingBottom: '68%',
          position: 'relative',
        }}
      >
        <iframe
          src="https://giphy.com/embed/RYjnzPS8u0jAs"
          title="giphy-gif"
          width="100%"
          height="100%"
          style={{ position: 'absolute' }}
          frameBorder="0"
          allowFullScreen
        />
      </div>
      <p>잘못된 접근입니다. 로그인 해주세요.</p>
      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        component={RouterLink}
        to="/signin"
      >
        로그인
      </Button>
    </>
  );
};

export default Unauthorized;
