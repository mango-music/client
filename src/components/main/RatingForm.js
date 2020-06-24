import React, { memo, useState } from 'react';
import '../../styles/RatingForm.scss';
import MuiRating from '@material-ui/lab/Rating';
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
      console.log(video.title, '의 video.rating이 얼마?', video.rating);
      stars = video.rating;
    }
    return stars;
  };
  return (
    <div className="rating-form">
      <MuiRating
        name="playerRating"
        size="large"
        precision={0.5}
        value={getStars()} // 초기값
        onChange={(e, starsCount) => {
          console.log(`${video.title}에 ${starsCount}점을 매깁니다.`);
          const newCurrentItems = [...currentItems];
          for (let i = 0; i < newCurrentItems.length; i++) {
            if (newCurrentItems[i].videoid === video.videoid) {
              newCurrentItems[i].rating = starsCount;
              break;
            }
          }
          setCurrentItems(newCurrentItems);
          if (starsCount) {
            // 별점을 매길 때
            postRatingMusic(video, starsCount);
          } else {
            // 별점을 삭제할 때
            postDelRating(video.videoid);
          }
        }}
      />
    </div>
  );
};

export default memo(RatingForm);
