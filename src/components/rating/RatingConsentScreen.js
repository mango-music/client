import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

// const useButtonStyles = makeStyles(
//   (theme) => ({
//     root: {
//       width: '100%',
//     },
//   }),
//   { name: 'MuiButton' },
// );

const RatingConsentScreen = ({ nickname }) => {
  // const buttonClasses = useButtonStyles();
  return (
    <article className="rating rating_consent">
      <header>
        <h2>{nickname}님의 취향을 알고 싶어요</h2>
        <p>
          {`저희가 선곡한 노래에 대해 ${nickname}님의 선호도 평가가 필요합니다.
        평가를 많이 할수록 더 정확한 취향 파악이 이루어집니다.`}
        </p>
        <p>에상 소요 시간: 1분</p>
      </header>
      <div>
        <Button
          variant="contained"
          color="primary"
          size="large"
          // className={buttonClasses.root}
          component={RouterLink}
          to="/rating"
        >
          시작하기
        </Button>
        <Button
          variant="text"
          color="gray"
          size="large"
          component={RouterLink}
          to={`/@${nickname}`}
        >
          다음에 하기
        </Button>
      </div>
    </article>
  );
};

export default RatingConsentScreen;
