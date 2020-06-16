import React, { useState } from 'react';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserPlaylistItemDropDownMenu from './UserPlaylistItemDropDownMenu';

const UserPlaylistItem = (props) => {
  const { item } = props;
  const [isEllipsisOn, setIsEllipsisOn] = useState(false);
  return (
    <li>
      <div className="list-img">
        <img src={item.thumbnail} />
      </div>
      <div className="list-title">
        <p>{item.title}</p>
      </div>
      <div className="list-button">
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
      {isEllipsisOn && <UserPlaylistItemDropDownMenu />}
    </li>
  );
};

export default UserPlaylistItem;
