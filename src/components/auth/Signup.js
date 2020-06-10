import React from 'react';
import { withRouter } from 'react-router-dom';

const Signup = ({ handleSignupSuccess, handleLoginSuccess, history }) => {
  const handleSubmit = () => {
    handleSignupSuccess();
    handleLoginSuccess();
    history.push('/');
  };
  return (
    <>
      <h2>계정을 생성하세요</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div>
          <label htmlFor="email">
            <span>이메일</span>
            <input id="email" datatype="string" />
          </label>
        </div>
        <div>
          <label htmlFor="nickname">
            <span>아이디</span>
            <input id="nickname" datatype="string" />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            <span>비밀번호</span>
            <input id="password" datatype="string" />
          </label>
        </div>
        <button type="submit">계정생성</button>
      </form>
    </>
  );
};

export default withRouter(Signup);
