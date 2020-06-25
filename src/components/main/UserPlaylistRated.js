import React, { useState, useEffect } from 'react';
import UserPlaylistRatedItem from './UserPlaylistRatedItem';
import UserPlaylistItemsDropDownMenu from './UserPlaylistItemsDropDownMenu';
import getRatingMusiclist from '../../lib/apis/getRatingMusiclist';
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
    setRatedButtonOn,
    videoIdRatings,
  } = props;

  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log(
      '사용자의 별점 리스트를 클릭하면 서버에서 데이터를 한 번 더 요청합니다.',
    );
    const token = localStorage.getItem('x-access-token');
    if (!token) return console.log('토큰이 없습니다.');
    getRatingMusiclist().then((items) => {
      const newItems = [...items];
      newItems.reverse();
      setItems(newItems);
      console.log('사용자가 평가한 데이터 : ', newItems);
    });
  }, []);

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
        {items.map((item) => {
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
