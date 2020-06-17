import React, { useState, useCallback, useEffect } from 'react';
import feedback from '../../lib/fixtures/feedback';
import { Box, Button } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MuiRating from '@material-ui/lab/Rating';
import ProgressMobileStepper from './ProgressMobileStepper';
import YouTube from 'react-youtube';

const RatingEntry = ({
  video,
  evaluationCount,
  handleRatingUpdate,
  handleRatingSkip,
  handleRatingFinish,
}) => {
  const [value, setValue] = useState(0);
  const [isNextDisabled, setNextDisabled] = useState(false);

  // const buttonClasses = useButtonStyles();
  // const darkTheme = useTheme();

  const handleRatingButtonClick = useCallback(
    (e, value) => {
      // e.preventDefault(); // 이 함수가 props로 전달될 경우 핸들러 함수의 콜백 안에 들어가게 되므로 e를 참조할 수 없게 되는 오류 발생
      setValue(0);
      handleRatingUpdate(video.videoId, value);
    },
    [value],
  );

  const handleSkipButtonClick = useCallback(() => {
    setValue(0);
    handleRatingSkip();
  }, [value]);

  useEffect(() => {
    if (!value || evaluationCount === 5) {
      // 별점을 누르지 않았거나, 평가 횟수가 5가 되었다면 disable=true
      setNextDisabled(true);
    } else {
      setNextDisabled(false);
    }
  }, [value]);

  return (
    <article className="rating rating_entry">
      {/* <YouTube videoId={video.videoId} className="youtube" /> */}
      <header className="box box-video"></header>
      <section>
        <span>{video.title}</span>
        <h2>평가하기</h2>
        {/* <h2>How would you rate this song?</h2> */}
        <div className="box box-rating">
          {/* {value !== null && (
            <div className="box-rating_feedback">
              <div>
                <img
                  src={feedback[value].emoji.src}
                  alt={feedback[value].emoji.alt}
                />
              </div>
              <span>{feedback[value].description}</span>
            </div>
          )} */}
          <MuiRating
            name="rating"
            size="large"
            precision={0.5}
            value={value}
            onChange={(e, targetValue) => {
              setValue(targetValue); // e.target.value와 동일 (MaterialUI onChange API)
            }}
          />
        </div>
        <div className="box box-buttons">
          <Button
            variant="text"
            color="primary"
            size="large"
            // className={`${buttonClasses.root} ${buttonClasses.secondary}`}
            onClick={handleSkipButtonClick}
          >
            건너뛰기
          </Button>
          <Button
            variant={!isNextDisabled ? 'contained' : 'text'}
            color="primary"
            size="large"
            // className={
            //   !isNextDisabled
            //     ? `${buttonClasses.root} ${buttonClasses.primary}`
            //     : `${buttonClasses.root} ${buttonClasses.disabled}`
            // }
            // className={isNextDisabled ? buttonClasses.disabled : null}
            onClick={handleRatingButtonClick}
            disabled={isNextDisabled}
          >
            다음으로
          </Button>
        </div>
      </section>
      <footer>
        <ProgressMobileStepper
          evaluationCount={evaluationCount}
          handleRatingButtonClick={handleRatingButtonClick}
          handleSkipButtonClick={handleSkipButtonClick}
        />
      </footer>
    </article>
  );
};

export default RatingEntry;
