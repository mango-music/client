import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import MuiRating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import YouTube from 'react-youtube';
import ProgressMobileStepper from './ProgressMobileStepper';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 100,
    width: '100%',
    maxWidth: '480px',
    height: '100vh',
    backgroundColor: '#000',
  },
}));

const opts = {
  playerVars: {
    autoplay: 1,
    rel: 0,
    playsinline: 1,
  },
};

const RatingEntry = ({
  video,
  evaluationCount,
  handleRatingUpdate,
  handleRatingSkip,
}) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [isNextDisabled, setNextDisabled] = useState(false);

  const handleRatingButtonClick = () => {
    // e.preventDefault(); // 이 함수가 props로 전달될 경우 핸들러 함수의 콜백 안에 들어가게 되므로 e를 참조할 수 없게 되는 오류 발생
    handleRatingUpdate(video, value);
    setValue(0);
  };

  const handleSkipButtonClick = () => {
    setValue(0);
    handleRatingSkip();
  };

  useEffect(() => {
    if (!value || evaluationCount === 15) {
      // 별점을 누르지 않았거나, 평가 횟수가 5가 되었다면 disable=true
      setNextDisabled(true);
    } else {
      setNextDisabled(false);
    }
  }, [value, evaluationCount]);

  return (
    <Box className={classes.root}>
      <Box className="card">
        <Box component="header" className="card_media">
          <YouTube
            videoId={video.videoid}
            className="card_media_iframe"
            opts={opts}
          />
        </Box>
        <Box component="section" className="card_content">
          <Box className="card_content_title">
            <Typography variant="h3">{video.title}</Typography>
          </Box>
          {/* <h2>How would you rate this song?</h2> */}
          <Box className="card_content_inputs">
            <Box className="card_content_inputs_label">
              <Typography variant="h4">평가하기</Typography>
            </Box>
            <Box className="card_content_inputs_inputs">
              <MuiRating
                name="rating"
                size="large"
                precision={0.5}
                value={value}
                onChange={(e, targetValue) => {
                  setValue(targetValue); // e.target.value와 동일 (MaterialUI onChange API)
                }}
              />
            </Box>
          </Box>
          <Box className="card_content_buttons">
            <Button
              variant="text"
              color="secondary"
              size="large"
              onClick={handleSkipButtonClick}
            >
              건너뛰기
            </Button>
            <Button
              variant={!isNextDisabled ? 'contained' : 'text'}
              color="primary"
              size="large"
              onClick={handleRatingButtonClick}
              disabled={isNextDisabled}
            >
              다음으로
            </Button>
          </Box>
        </Box>
        <Box component="footer">
          <ProgressMobileStepper
            evaluationCount={evaluationCount}
            handleRatingButtonClick={handleRatingButtonClick}
            handleSkipButtonClick={handleSkipButtonClick}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default RatingEntry;

/*
{value !== null && (
  <div className="box-rating_feedback">
    <div>
      <img
        src={feedback[value].emoji.src}
        alt={feedback[value].emoji.alt}
      />
    </div>
    <span>{feedback[value].description}</span>
  </div>
)}
*/
