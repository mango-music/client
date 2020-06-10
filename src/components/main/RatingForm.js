import React from 'react';
import { faStar, faStarOfDavid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../styles/RatingForm.scss';

const RatingForm = (props) => {
  const { rating } = props.currentItems[props.itemIndex];
  return (
    <div className="rating-form">
      <div
        onClick={() => {
          console.log('rating를 1로 바꾼다.');
        }}
      >
        {rating >= 1 ? (
          <FontAwesomeIcon icon={faStar} color="gold" />
        ) : (
          <FontAwesomeIcon icon={faStarOfDavid} color="gold" />
        )}
      </div>
      <div
        onClick={() => {
          console.log('rating를 2로 바꾼다.');
        }}
      >
        {rating >= 2 ? (
          <FontAwesomeIcon icon={faStar} color="gold" />
        ) : (
          <FontAwesomeIcon icon={faStarOfDavid} color="gold" />
        )}
      </div>
      <div
        onClick={() => {
          console.log('rating를 3로 바꾼다.');
        }}
      >
        {rating >= 3 ? (
          <FontAwesomeIcon icon={faStar} color="gold" />
        ) : (
          <FontAwesomeIcon icon={faStarOfDavid} color="gold" />
        )}
      </div>
      <div
        onClick={() => {
          console.log('rating를 4로 바꾼다.');
        }}
      >
        {rating >= 4 ? (
          <FontAwesomeIcon icon={faStar} color="gold" />
        ) : (
          <FontAwesomeIcon icon={faStarOfDavid} color="gold" />
        )}
      </div>
      <div
        onClick={() => {
          console.log('rating를 5로 바꾼다.');
        }}
      >
        {rating >= 5 ? (
          <FontAwesomeIcon icon={faStar} color="gold" />
        ) : (
          <FontAwesomeIcon icon={faStarOfDavid} color="gold" />
        )}
      </div>
    </div>
  );
};

export default RatingForm;
