import React, { memo, useState } from 'react';
// import { faStar, faStarOfDavid } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../styles/RatingForm.scss';
import MuiRating from '@material-ui/lab/Rating';
import { Star, StarBorder } from '@material-ui/icons';
import fkdtCurrentItems2 from '../../lib/fixtures/fkdtCurrentItems2';
import postRatingMusic from '../../lib/apis/postRatingMusic';
import postDelRating from '../../lib/apis/postDelRating';

const RatingForm = (props) => {
  const {
    isShuffleOn,
    shuffledIndex,
    setCurrentItems,
    currentItems,
    shuffledQueue,
    itemIndex,
  } = props;
  console.log('RatingForm rendering');
  let video;
  // 셔플일 때
  if (isShuffleOn && shuffledIndex !== undefined) {
    const index = shuffledQueue[shuffledIndex];
    video = currentItems[index];
  } else {
    video = currentItems[itemIndex];
  }

  const getStars = () => {
    let stars = null;
    if (video.rating) {
      stars = video.rating;
    }
    return stars;
  };
  return (
    <div className="rating-form">
      <MuiRating
        name="rating"
        size="large"
        precision={0.5}
        value={getStars()} // 초기값
        onChange={(e, targetValue) => {
          console.log(`${video.title}에 ${targetValue}점을 매깁니다.`);
          // setStars(targetValue);
          // postRatingMusic(video, stars);
        }}
      />
      {/* <div
        onClick={async () => {
          // 서버 조정 후 수정
          console.log(`${video.title}의 rating를 1로 바꾼다.`);
          if (video.rating === 1) {
            // 별점 삭제 요청
            await postDelRating(video);
          } else {
            // 별점 입력 요청
            await postRatingMusic(video, 1);
          }
          // currentItems를 다시 호출
          setCurrentItems(fkdtCurrentItems2);
        }}
      >
        {video.rating >= 1 ? <Star /> : <StarBorder />}
      </div>*/}
    </div>
  );
};

export default memo(RatingForm);
