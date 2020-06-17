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

  return (
    <li>
      <div className="list-img">
        {items[0] && <img src={items[0].thumbnail} />}
      </div>
      <div className="list-title">
        <p
          onClick={async () => {
            await setCurrentItem(null);
            await setCurrentItems(null);
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
