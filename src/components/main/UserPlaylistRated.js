import React, { useState } from 'react';
import UserPlaylistRatedItem from './UserPlaylistRatedItem';
import UserPlaylistItemsDropDownMenu from './UserPlaylistItemsDropDownMenu';
import { faTimes, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserPlaylistRated = (props) => {
  const {
    // selectedList,
    // setSelectedList,
    // customLists,
    // setCustomLists,
    currentItems,
    setCurrentItems,
    setCurrentItem,
    setItemIndex,
    items,
    setRatedButtonOn,
    videoIdRatings,
  } = props;
  // const [isEllipsisOn, setIsEllipsisOn] = useState(false);

  return (
    <div id="user-playlist-items">
      <header>
        <div>
          <button onClick={() => setRatedButtonOn(false)}>
            <FontAwesomeIcon icon={faTimes} color="#afafaf" />
          </button>
        </div>
        <div></div>
        <div>
          {/* <button
            onClick={() => {
              if (isEllipsisOn) {
                setIsEllipsisOn(false);
              } else {
                setIsEllipsisOn(true);
              }
            }}
          >
            <FontAwesomeIcon icon={faEllipsisV} color="#afafaf" />
          </button> */}
        </div>
        {/* {isEllipsisOn && (
          <UserPlaylistItemsDropDownMenu
            setIsEllipsisOn={setIsEllipsisOn}
            customLists={customLists}
            setCustomLists={setCustomLists}
            selectedList={selectedList}
            setSelectedList={setSelectedList}
          />
        )} */}
        <div className="user-playlist-title">Rated Musics</div>
      </header>

      <ul>
        {items &&
          items.map((item) => {
            return (
              <UserPlaylistRatedItem
                key={item.videoid}
                item={item}
                // selectedList={selectedList}
                // customLists={customLists}
                // setCustomLists={setCustomLists}
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

export default UserPlaylistRated;
