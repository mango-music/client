import React from 'react';
import { faStar, faStarOfDavid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../styles/RatingForm.scss';

const RatingForm = (props) => {
  const { isShuffleOn, shuffledIndex } = props;
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
        onClick={() => {
          console.log(`${video.title}의 rating를 1로 바꾼다.`);
        }}
      >
        {video.rating >= 1 ? (
          <FontAwesomeIcon icon={faStar} color="gold" />
        ) : (
          <FontAwesomeIcon icon={faStarOfDavid} color="gold" />
        )}
      </div>
      <div
        onClick={() => {
          console.log(`${video.title}의 rating를 2로 바꾼다.`);
        }}
      >
        {video.rating >= 2 ? (
          <FontAwesomeIcon icon={faStar} color="gold" />
        ) : (
          <FontAwesomeIcon icon={faStarOfDavid} color="gold" />
        )}
      </div>
      <div
        onClick={() => {
          console.log(`${video.title}의 rating를 3로 바꾼다.`);
        }}
      >
        {video.rating >= 3 ? (
          <FontAwesomeIcon icon={faStar} color="gold" />
        ) : (
          <FontAwesomeIcon icon={faStarOfDavid} color="gold" />
        )}
      </div>
      <div
        onClick={() => {
          console.log(`${video.title}의 rating를 4로 바꾼다.`);
        }}
      >
        {video.rating >= 4 ? (
          <FontAwesomeIcon icon={faStar} color="gold" />
        ) : (
          <FontAwesomeIcon icon={faStarOfDavid} color="gold" />
        )}
      </div>
      <div
        onClick={() => {
          console.log(`${video.title}의 rating를 5로 바꾼다.`);
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
