import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Signin = ({ handleLoginSuccess, history }) => {
  const handleSubmit = () => {
    handleLoginSuccess();
    history.push('/');
  };
  return (
    <>
      <h3>Mango 로그인</h3>
      <form onSubmit={handleSubmit}>
        <input datatype="string" placeholder="email" />
        <input datatype="string" placeholder="password" />
        <button type="submit">로그인</button>
      </form>
      <div>
        <Link to="/account/password_reset">비밀번호를 잊으셨나요?</Link>
      </div>
      <div>
        <Link to="/signup">Mango가 처음이신가요?</Link>
      </div>
    </>
  );
};

export default withRouter(Signin);
