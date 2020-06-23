import React, { useState } from 'react';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserPlaylist = (props) => {
  const {
    listName,
    items,
    setCurrentItems,
    setCurrentItem,
    setSelectedList,
  } = props;

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
        <p
          onClick={async () => {
            await setCurrentItem(null);
            await setCurrentItems([]);
            setCurrentItems(items);
            setCurrentItem(items[0]);
          }}
        >
          {listName}
        </p>
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
