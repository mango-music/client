/* eslint-disable */
import React from 'react';
import { withRouter } from 'react-router-dom';
import Signout from '../auth/Signout';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../styles/Profile.scss';
import changeName from '../../lib/apis/changeName';
import CreateIcon from '@material-ui/icons/Create';

const Profile = ({ profile, handleProfileUpdate, handleLogout }) => {
  const handleEditButtonClick = async () => {
    const userinfo = await changeName(
      document.querySelector('.changeNick').value,
    );
    console.log(userinfo);
    if (userinfo) {
      localStorage.setItem('x-user-info', JSON.stringify(userinfo));
      location.reload();
      // let currentPath = location.pathname;
      // console.log(currentPath);
      // window.location.href = currentPath;
    } else {
      return window.alert('이미 존재하는 닉네임 입니다.');
    }
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
        <span id="nickChange-Icon">
          <CreateIcon onClick={handleEditButtonClick} />
        </span>
        {/* <button onClick={handleEditButtonClick}>변경하기</button> */}
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
