/* eslint-disable */
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Signout from '../auth/Signout';
import '../../styles/Profile.scss';
import changeName from '../../lib/apis/changeName';
import CreateIcon from '@material-ui/icons/Create';


const Profile = ({ profile, handleLogout }) => {
  const [value, setValue] = useState(profile.nickname);

  const handleNicknameUpdate = async (e) => {
    e.preventDefault();
    const res = await changeName(value); // 저희 api 함수 네임 규칙상 postNickname이 낫지 않을까요?
    console.log('닉네임 변경 서버 응답', res);
    if (res.status === 409) {
      return window.alert(res.data);
    }
    if (res.status === 201) {
      localStorage.setItem('x-user-info', JSON.stringify(res.data));
      location.reload();
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div id="profile">
      <div
        style={{
          width: '128px',
          height: '128px',
          margin: '0 auto',
          borderRadius: '64px',
          backgroundColor: '#424242',
        }}
      >
        {/* 여기를 누르면 파일 이미지를 업로드할 수 있고, 그 결과로 업로드된 이미지가 배경으로 변경됩니다 */}
      </div>
      <div>

        <form onSubmit={handleNicknameUpdate} autoComplete="off">
          <input type="text" value={value} onChange={handleChange} />
          <button type="submit">변경</button>
        </form>
      </div>
      <div>{profile.nickname}</div>
      <div>{profile.email}</div>
      <div>
        <Signout handleLogout={handleLogout} />
      </div>
    </div>
  );
};

export default withRouter(Profile);
