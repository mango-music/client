import React, { useState, useEffect } from 'react';
import UserPlaylistRatedItem from './UserPlaylistRatedItem';
import UserPlaylistItemsDropDownMenu from './UserPlaylistItemsDropDownMenu';
import getRatingMusiclist from '../../lib/apis/getRatingMusiclist';
import { Close } from '@material-ui/icons';

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
            <Close />
          </button>
        </div>
        <div></div>
        <div></div>
        <div className="user-playlist-title">내가 평가한 음악</div>
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
