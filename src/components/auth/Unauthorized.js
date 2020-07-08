import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Typography } from '@material-ui/core';
import policeGif from '../../images/police.gif';

const Unauthorized = () => {
  return (
    <Box className="unauthorized">
      <Box component="header" className="unauthorized_header">
        <img src={policeGif} alt="police-chasing" />
      </Box>
      <Box component="section" className="unauthorized_body">
        <Box className="unauthorized_body_title">
          <Typography variant="h2">401 Unauthorized</Typography>
          <Typography variant="body1">
            잘못된 접근입니다. 로그인 해주세요.
          </Typography>
        </Box>
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
      </Box>
    </Box>
  );
};

export default Unauthorized;
