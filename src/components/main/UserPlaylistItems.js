import React from 'react';
import UserPlaylistItem from './UserPlaylistItem';
import { faTimes, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserPlaylistItems = (props) => {
  const { selectedList, setSelectedList, customLists, setCustomLists } = props;
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
          <button>
            <FontAwesomeIcon icon={faEllipsisV} color="#afafaf" />
          </button>
        </div>
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
