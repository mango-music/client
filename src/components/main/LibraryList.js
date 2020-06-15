import React, { useState } from 'react';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LibraryList = (props) => {
  const {
    listName,
    items,
    setCurrentItems,
    setCurrentItem,
    setLibraryList,
  } = props;

  console.log('items : ', items);
  return (
    <li>
      <div className="library-list-img">
        {items[0] && <img src={items[0].thumbnail} />}
      </div>
      <div className="library-list-title">
        <p
          onClick={() => {
            setCurrentItems(items);
            setCurrentItem(items[0]);
          }}
        >
          {listName}
        </p>
      </div>
      <div className="library-list-button">
        <button onClick={() => setLibraryList(listName)}>
          <FontAwesomeIcon icon={faAngleRight} color="#afafaf" />
        </button>
      </div>
    </li>
  );
};

export default LibraryList;
