import React from 'react';
import { Link } from 'react-router-dom';

const Signin = () => {
  return (
    <>
      <h3>로그인</h3>
      <Link to="/signup">회원가입</Link>
    </>
  );
};

export default Signin;
