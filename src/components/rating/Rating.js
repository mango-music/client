import React from 'react';
import { Link } from 'react-router-dom';
import RatingList from './RatingList';

const Rating = ({ profile }) => {
  return (
    <>
      <h2>{profile.id}님의 취향을 알고 싶어요</h2>
      <RatingList />
      <Link to={`/@${profile.id}`}>다음에 할래요</Link>
    </>
  );
};

export default Rating;
