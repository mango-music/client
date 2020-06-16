import React, { useState } from 'react';
import UserPlaylistItem from './UserPlaylistItem';
import UserPlaylistItemsDropDownMenu from './UserPlaylistItemsDropDownMenu';
import { faTimes, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserPlaylistItems = (props) => {
  const { selectedList, setSelectedList, customLists, setCustomLists } = props;
  const [isEllipsisOn, setIsEllipsisOn] = useState(false);
  let items;
  for (let i = 0; i < customLists.length; i++) {
    if (customLists[i].listname === selectedList) {
      items = customLists[i].musics;
      break;
    }
  }
  return (
    <div id="user-playlist-items">
      <header>
        <div>
          <button onClick={() => setSelectedList(null)}>
            <FontAwesomeIcon icon={faTimes} color="#afafaf" />
          </button>
        </div>
        <div></div>
        <div>
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
        {isEllipsisOn && (
          <UserPlaylistItemsDropDownMenu
            setIsEllipsisOn={setIsEllipsisOn}
            customLists={customLists}
            setCustomLists={setCustomLists}
            selectedList={selectedList}
            setSelectedList={setSelectedList}
          />
        )}
        <div className="user-playlist-title">{selectedList}</div>
      </header>

      <ul>
        {items &&
          items.map((item) => {
            return (
              <UserPlaylistItem
                key={item.videoid}
                item={item}
                selectedList={selectedList}
                customLists={customLists}
                setCustomLists={setCustomLists}
              />
            );
          })}
      </ul>
    </div>
  );
};

export default UserPlaylistItems;
