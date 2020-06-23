import React, { useState } from 'react';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserPlaylistItemDropDownMenu from './UserPlaylistItemDropDownMenu';

const UserPlaylistItem = (props) => {
  const {
    item,
    currentItems,
    setCurrentItem,
    setCurrentItems,
    setItemIndex,
  } = props;

  const playVideo = async (video) => {
    const newCurrentItems = [...currentItems];
    for (let i = 0; i < newCurrentItems.length; i++) {
      if (newCurrentItems[i].videoid === video.videoid) {
        newCurrentItems.splice(i, 1);
        await setCurrentItem(null); // currentItem을 변경하기 위해 초기화, 뮤직 플레이어를 조건 렌더링으로 바꾼 뒤 수정
        break;
      }
    }
    newCurrentItems.unshift(video);
    setCurrentItem(video);
    setCurrentItems(newCurrentItems);
    setItemIndex(0); // TODO: 셔플 버튼이 켜져 있을 때에도 통제할 수 있게 수정해야 한다.
  };

  return (
    <li>
      <div className="list-img">
        <img src={item.thumbnail} />
      </div>
      <div className="list-title">
        <p
          onClick={() => {
            console.log(item.title, '이 클릭됐습니다.');
            playVideo(item);
          }}
        >
          {item.title}
        </p>
      </div>
    </li>
  );
};

export default UserPlaylistItem;
