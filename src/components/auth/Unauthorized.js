import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <>
      <h3>401 Unauthorized</h3>
      <p>접근 권한이 없습니다. 로그인 해주세요.</p>
      <Link to="/signin">로그인</Link>
    </>
  );
};

export default Unauthorized;
