import React, { useState } from 'react';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LibraryListItemDropDownMenu from './LibraryListItemDropDownMenu';

const LibraryListItem = (props) => {
  const { item } = props;
  const [isEllipsisOn, setIsEllipsisOn] = useState(false);
  return (
    <li>
      <div className="library-list-img">
        <img src={item.thumbnail} />
      </div>
      <div className="library-list-title">
        <p>{item.title}</p>
      </div>
      <div className="library-list-button">
        <button
          onClick={() => {
            if (isEllipsisOn) {
              setIsEllipsisOn(false);
            } else {
              setIsEllipsisOn(true);
            }
          }}
        >
          <FontAwesomeIcon icon={faEllipsisV} color="#afafaf" />
        </button>
      </div>
      {isEllipsisOn && <LibraryListItemDropDownMenu />}
    </li>
  );
};

export default LibraryListItem;
