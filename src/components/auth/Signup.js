import React from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

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
      <div>
        <span>이미 Mango 계정이 있나요?</span>
        <Button
          variant="text"
          color="secondary"
          size="medium"
          component={RouterLink}
          to="/signin"
        >
          로그인
        </Button>
      </div>
    </>
  );
};

export default withRouter(Signup);
