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
    videoIdRatings,
    setVideoIdRatings,
    musicAverage,
    ratingPeople,
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

  const averageMusicRating = musicAverage[video.videoid] // 에러방지 삼항 연산자
    ? musicAverage[video.videoid].toFixed(1)
    : null;
  const ratingCount = ratingPeople[video.videoid];

  const getStars = () => {
    let stars = null;
    if (video.rating) {
      stars = video.rating;
    }
    return stars;
  };
  return (
    <>
      {ratingCount && (
        <div className="rating-average">
          <p>평균 {averageMusicRating}</p>
          <p>({ratingCount}명)</p>
        </div>
      )}
      <div className="rating-form">
        <MuiRating
          name="playerRating"
          size="large"
          precision={0.5}
          value={getStars()} // 초기값
          onChange={async (e, starsCount) => {
            console.log(`${video.title}에 ${starsCount}점을 매깁니다.`);

            if (starsCount === null) {
              // 별점을 삭제할 때
              const status = await postDelRating(
                video,
                videoIdRatings,
                setVideoIdRatings,
              );
              if (status === 200) {
                const newCurrentItems = [...currentItems];
                for (let i = 0; i < newCurrentItems.length; i++) {
                  if (newCurrentItems[i].videoid === video.videoid) {
                    newCurrentItems[i].rating = null;
                    break;
                  }
                }
                setCurrentItems(newCurrentItems);
              }
            } else {
              // 별점을 매길 때
              const status = await postRatingMusic(
                video,
                starsCount,
                videoIdRatings,
                setVideoIdRatings,
              );
              if (status === 200) {
                const newCurrentItems = [...currentItems];
                for (let i = 0; i < newCurrentItems.length; i++) {
                  if (newCurrentItems[i].videoid === video.videoid) {
                    newCurrentItems[i].rating = starsCount;
                    break;
                  }
                }
                setCurrentItems(newCurrentItems);
              }
            }
          }}
        />
      </div>
    </>
  );
};

export default memo(RatingForm);
