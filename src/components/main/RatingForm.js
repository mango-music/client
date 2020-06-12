import React from 'react';
import { faStar, faStarOfDavid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import postRatingMusic from '../../lib/apis/postRatingMusic';
import postDelRating from '../../lib/apis/postDelRating';
import '../../styles/RatingForm.scss';
import fkdtCurrentItems2 from '../../lib/fixtures/fkdtCurrentItems2';

// 임시 토큰
const tokken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTFiZGZhNmE2NWIwMmUzNzc4MGI1YSIsImVtYWlsIjoic29jcmF0b25lQGdtYWlsLmNvbSIsImlhdCI6MTU5MTkyOTA3OCwiZXhwIjoxNTkxOTMwODc4fQ.qtMn7jS8NDTf1ICJgQuVfsBHbJrO7S3IuNyANpYLrkg';

const RatingForm = (props) => {
  const { isShuffleOn, shuffledIndex, setCurrentItems } = props;
  let video;
  // 셔플일 때
  if (isShuffleOn && shuffledIndex !== undefined) {
    const index = props.shuffledQueue[shuffledIndex];
    video = props.currentItems[index];
  } else {
    video = props.currentItems[props.itemIndex];
  }
  return (
    <div className="rating-form">
      <div
        onClick={async () => {
          // 서버 조정 후 수정
          console.log(`${video.title}의 rating를 1로 바꾼다.`);
          if (video.rating === 1) {
            // 별점 삭제 요청
            await postDelRating(video);
          } else {
            // 별점 입력 요청
            await postRatingMusic(video, 1, tokken);
          }
          // currentItems를 다시 호출
          setCurrentItems(fkdtCurrentItems2);
        }}
      >
        {video.rating >= 1 ? (
          <FontAwesomeIcon icon={faStar} color="gold" />
        ) : (
          <FontAwesomeIcon icon={faStarOfDavid} color="gold" />
        )}
      </div>
      <div
        onClick={async () => {
          console.log(`${video.title}의 rating를 2로 바꾼다.`);
          await postRatingMusic(video, 2, tokken);
          // currentItems를 다시 호출
          setCurrentItems(fkdtCurrentItems2);
        }}
      >
        {video.rating >= 2 ? (
          <FontAwesomeIcon icon={faStar} color="gold" />
        ) : (
          <FontAwesomeIcon icon={faStarOfDavid} color="gold" />
        )}
      </div>
      <div
        onClick={async () => {
          console.log(`${video.title}의 rating를 3로 바꾼다.`);
          await postRatingMusic(video, 3, tokken);
          // currentItems를 다시 호출
          setCurrentItems(fkdtCurrentItems2);
        }}
      >
        {video.rating >= 3 ? (
          <FontAwesomeIcon icon={faStar} color="gold" />
        ) : (
          <FontAwesomeIcon icon={faStarOfDavid} color="gold" />
        )}
      </div>
      <div
        onClick={async () => {
          console.log(`${video.title}의 rating를 4로 바꾼다.`);
          await postRatingMusic(video, 4, tokken);
          // currentItems를 다시 호출
          setCurrentItems(fkdtCurrentItems2);
        }}
      >
        {video.rating >= 4 ? (
          <FontAwesomeIcon icon={faStar} color="gold" />
        ) : (
          <FontAwesomeIcon icon={faStarOfDavid} color="gold" />
        )}
      </div>
      <div
        onClick={async () => {
          console.log(`${video.title}의 rating를 5로 바꾼다.`);
          await postRatingMusic(video, 5, tokken);
          // currentItems를 다시 호출
          setCurrentItems(fkdtCurrentItems2);
        }}
      >
        {video.rating >= 5 ? (
          <FontAwesomeIcon icon={faStar} color="gold" />
        ) : (
          <FontAwesomeIcon icon={faStarOfDavid} color="gold" />
        )}
      </div>
    </div>
  );
};

export default RatingForm;
