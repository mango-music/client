import React, { useState } from 'react';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserPlaylist = (props) => {
  const { listName, items, setSelectedList, playVideos } = props;

  const getThumbnail = () => {
    if (items[items.length - 1]) {
      return <img src={items[items.length - 1].thumbnail} alt="" />;
    }
    return <div />;
  };

  const newItems = [...items];
  newItems.reverse();

  return (
    <li>
      <div className="list-img">{getThumbnail()}</div>
      <div className="list-title">
        <p onClick={() => playVideos(newItems)}>{listName}</p>
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
