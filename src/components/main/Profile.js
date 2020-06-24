/* eslint-disable */
import React from 'react';
import { withRouter } from 'react-router-dom';
import Signout from '../auth/Signout';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../styles/Profile.scss';
import changeName from '../../lib/apis/changeName';

const Profile = (props) => {
  const { profile, handleLogout, history } = props;
  const a = async () => {
    var userinfo = await changeName(
      document.querySelector('.changeNick').value,
    );
    localStorage.setItem('x-user-info', JSON.stringify(userinfo));
    console.log(userinfo);
    history.push('/');
  };

  //기존에 있던 userinfo.nickname을 바꿔서 서버에 전송했음
  //기존에 있던 userinfo.nickname을 바꾼 닉네임으로 바꿔서 다시 저장.

  return (
    <div id="profile">
      <header>
        <p>Profile</p>
      </header>
      <div id="profile-image">
        <FontAwesomeIcon icon={faUser} color="#afafaf" />
      </div>
      <div>
        <input className="changeNick" />
        <button
          onClick={() => {
            a();
          }}
        >
          변경하기
        </button>
      </div>
      <div>{profile.id}</div>
      <div>{profile.email}</div>

      <div>
        <Signout handleLogout={handleLogout} />
      </div>
    </div>
  );
};

export default withRouter(Profile);
