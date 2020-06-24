import React, { useState } from 'react';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserPlaylist = (props) => {
  const { listName, items, setSelectedList, playVideos } = props;

  const getThumbnail = () => {
    if (items[0]) {
      return <img src={items[0].thumbnail} alt="" />;
    }
    return <div />;
  };

  return (
    <li>
      <div className="list-img">{getThumbnail()}</div>
      <div className="list-title">
        <p onClick={() => playVideos(items)}>{listName}</p>
      </div>
      <div className="list-button">
        <button onClick={() => setSelectedList(listName)}>
          <FontAwesomeIcon icon={faAngleRight} color="#afafaf" />
        </button>
      </div>
    </li>
  );
};

export default UserPlaylist;
