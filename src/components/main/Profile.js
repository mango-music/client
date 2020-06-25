/* eslint-disable */
import React from 'react';
import { withRouter } from 'react-router-dom';
import Signout from '../auth/Signout';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../styles/Profile.scss';
import changeName from '../../lib/apis/changeName';
import changeNickname from '../../images/changeNickname.png';

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
        {/* <img
          src={changeNickname}
          id="nickChange-icon"
          onClick={() => {
            a();
          }}
        /> */}
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
