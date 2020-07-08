import React, { useState } from 'react';
import UserPlaylistItem from './UserPlaylistItem';
import UserPlaylistItemsDropDownMenu from './UserPlaylistItemsDropDownMenu';
import { Close, MoreVert } from '@material-ui/icons';

const UserPlaylistItems = (props) => {
  const {
    selectedList,
    setSelectedList,
    customLists,
    setCustomLists,
    currentItems,
    setCurrentItems,
    setCurrentItem,
    setItemIndex,
    videoIdRatings,
    playerSize,
  } = props;
  const [isEllipsisOn, setIsEllipsisOn] = useState(false);
  let items;
  for (let i = 0; i < customLists.length; i++) {
    if (customLists[i].listname === selectedList) {
      items = customLists[i].musics;
      break;
    }
  }

  const newItems = [...items];
  newItems.reverse();

  return (
    <div id="user-playlist-items" className={`player-brother-${playerSize}`}>
      <header>
        <div>
          <button onClick={() => setSelectedList(null)} className="x-button">
            <Close />
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
            className="e-button"
          >
            <MoreVert />
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
          newItems.map((item) => {
            return (
              <UserPlaylistItem
                key={item.videoid}
                item={item}
                selectedList={selectedList}
                customLists={customLists}
                setCustomLists={setCustomLists}
                currentItems={currentItems}
                setCurrentItems={setCurrentItems}
                setCurrentItem={setCurrentItem}
                setItemIndex={setItemIndex}
                videoIdRatings={videoIdRatings}
              />
            );
          })}
      </ul>
    </div>
  );
};

export default UserPlaylistItems;
