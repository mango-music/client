import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import MuiRating from '@material-ui/lab/Rating';
import YouTube from 'react-youtube';
import ProgressMobileStepper from './ProgressMobileStepper';

const opts = {
  playerVars: {
    autoplay: 1,
  },
};

const RatingEntry = ({
  video,
  evaluationCount,
  handleRatingUpdate,
  handleRatingSkip,
}) => {
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
  }, [value]);

  return (
    <article className="rating rating_entry">
      <YouTube videoId={video.videoid} className="youtube" opts={opts} />
      <section>
        <h2>{video.title}</h2>
        <p>평가하기</p>
        {/* <h2>How would you rate this song?</h2> */}
        <div className="box box-rating">
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
