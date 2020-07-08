import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const NoMatch = () => {
  return (
    <>
      <div
        style={{
          width: '100%',
          height: '0',
          paddingBottom: '68%',
          position: 'relative',
        }}
      >
        <iframe
          src="https://giphy.com/embed/NWZ13Q6pwwfi8"
          title="giphy-gif"
          width="100%"
          height="100%"
          style={{ position: 'absolute' }}
          frameBorder="0"
          allowFullScreen
        />
      </div>
      <h2>404 NOT FOUND</h2>
      <p>없는 페이지입니다.</p>
      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        component={RouterLink}
        to="/"
      >
        홈으로
      </Button>
    </>
  );
};

export default NoMatch;
