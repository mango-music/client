/* eslint-disable */
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Signout from '../auth/Signout';
import '../../styles/Profile.scss';
import postNickname from '../../lib/apis/changeName';
import CreateIcon from '@material-ui/icons/Create';

const Profile = ({ profile, handleLogout }) => {
  const [value, setValue] = useState(profile.nickname);
  const [image, setimage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNicknameUpdate = async (e) => {
    e.preventDefault();
    const res = await postNickname(value);
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

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'darwin');
    setLoading(true);
    const res = await fetch(
      'http://localhost:3000/upload',
      {
        method: 'POST',
        body: data,
      },
      //https://api.cloudinary.com/v1_1/dihifeicm (API BASE URL)
    );
    const file = await res.json();
    console.log(file);
    setimage(file.url);
    setLoading(false);
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
        className="profile-alphabet"
      >
        <p>{profile.nickname[0].toUpperCase()}</p>
      </div>
      <div>{profile.nickname}</div>
      <div>
        <form onSubmit={handleNicknameUpdate} autoComplete="off">
          <input
            type="text"
            value={value}
            onChange={handleChange}
            className="profile-input"
          />
          <button type="submit" className="profile-button">
            변경
          </button>
        </form>
      </div>
      <div className="profile-email">{profile.email}</div>
      <div>
        <Signout handleLogout={handleLogout} />
      </div>
    </div>
  );
};

export default withRouter(Profile);
