import React, { Component } from 'react';
import MainHeader from './MainHeader';
import AdditionalRatingEntry from './AdditionalRatingEntry';

const AdditionalRating = (props) => {
  const { nickname } = props;
  return (
    <div id="additional-rating">
      <MainHeader title={'Raiting'} nickname={nickname} />
      <ul>
        <AdditionalRatingEntry key="1" />
        <AdditionalRatingEntry key="2" />
        <AdditionalRatingEntry key="3" />
        <AdditionalRatingEntry key="4" />
        <AdditionalRatingEntry key="5" />
        <AdditionalRatingEntry key="6" />
      </ul>
    </div>
  );
};

export default AdditionalRating;
