import React from 'react';
import { Link } from 'react-router-dom';

const RatingConsent = ({ profile }) => {
  return (
    <>
      <h2>{profile.id}님의 취향을 알고 싶어요</h2>
      <p>
        {`저희가 선곡한 노래에 대해 ${profile.id}님의 선호도 평가가 필요합니다.
      평가를 많이 할수록 더 정확한 취향 파악이 이루어집니다.`}
      </p>
      <div>
        <Link to={`/@${profile.id}/rating`}>시작하기</Link>
      </div>
      <div>
        <Link to={`/@${profile.id}`}>다음에 할래요</Link>
      </div>
    </>
  );
};

export default RatingConsent;
