import React from 'react';
import { faStar, faStarOfDavid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../styles/RatingForm.scss';

const RatingForm = ({ starsCount }) => {
  return (
    <div className="rating-form">
      <div
        onClick={() => {
          console.log('starsCount를 1로 바꾼다.');
        }}
      >
        {starsCount >= 1 ? (
          <FontAwesomeIcon icon={faStar} />
        ) : (
          <FontAwesomeIcon icon={faStarOfDavid} />
        )}
      </div>
      <div
        onClick={() => {
          console.log('starsCount를 2로 바꾼다.');
        }}
      >
        {starsCount >= 2 ? (
          <FontAwesomeIcon icon={faStar} />
        ) : (
          <FontAwesomeIcon icon={faStarOfDavid} />
        )}
      </div>
      <div
        onClick={() => {
          console.log('starsCount를 3로 바꾼다.');
        }}
      >
        {starsCount >= 3 ? (
          <FontAwesomeIcon icon={faStar} />
        ) : (
          <FontAwesomeIcon icon={faStarOfDavid} />
        )}
      </div>
      <div
        onClick={() => {
          console.log('starsCount를 4로 바꾼다.');
        }}
      >
        {starsCount >= 4 ? (
          <FontAwesomeIcon icon={faStar} />
        ) : (
          <FontAwesomeIcon icon={faStarOfDavid} />
        )}
      </div>
      <div
        onClick={() => {
          console.log('starsCount를 5로 바꾼다.');
        }}
      >
        {starsCount >= 5 ? (
          <FontAwesomeIcon icon={faStar} />
        ) : (
          <FontAwesomeIcon icon={faStarOfDavid} />
        )}
      </div>
    </div>
  );
};

export default RatingForm;
