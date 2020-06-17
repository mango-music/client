import React from 'react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../styles/MainHeader.scss';

const MainHeader = (props) => {
  const { name } = props;
  return (
    <header className="main-header">
      <p>{name}</p>
      <p>
        <FontAwesomeIcon icon={faUser} color="#afafaf" />
      </p>
    </header>
  );
};

export default MainHeader;
