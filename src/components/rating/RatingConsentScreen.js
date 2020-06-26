import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Button } from '@material-ui/core';

const RatingConsentScreen = ({ nickname }) => {
  return (
    <Box className="consent">
      <Box component="header" className="consent_header">
        <Typography variant="h2">{nickname}님의 취향을 알고 싶어요</Typography>
        <Typography variant="body1">
          {`저희가 선곡한 노래에 대해 ${nickname}님의 선호도 평가가 필요합니다.
        평가를 많이 할수록 더 정확한 취향 파악이 이루어집니다.`}
        </Typography>
        <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          예상 소요 시간: 5분
        </span>
      </Box>
      <Box component="footer" className="consent_buttons">
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={RouterLink}
          to="/rating"
        >
          시작하기
        </Button>
        <Button
          variant="text"
          color="secondary"
          size="large"
          component={RouterLink}
          to={`/@${nickname}`}
        >
          다음에 하기
        </Button>
      </Box>
    </Box>
  );
};

export default RatingConsentScreen;
