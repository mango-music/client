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
      'http://13.209.19.101:3000/image/upload',
      {
        method: 'POST',
        body: data,
      },
      //https://api.cloudinary.com/v1_1/dihifeicm (API BASE URL)
    );
    const file = await res.json();
    setimage(file.secure_url);
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
      ></div>
      <span>
        <input
          type="file"
          name="file"
          placeholder="Uploading an image"
          onChange={uploadImage}
        />
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          <img src={image} style={{ width: '300px' }} />
        )}
      </span>
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
