import React from 'react';

const PasswordReset = () => {
  return (
    <>
      <h2>먼저 Mango 계정을 찾으세요</h2>
      <form autoComplete="on">
        <label htmlFor="email">
          <span>이메일</span>
          <input id="email" datatype="string" />
        </label>
        <button type="submit">확인</button>
      </form>
    </>
  );
};

export default PasswordReset;
