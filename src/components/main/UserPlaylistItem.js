import React, { useState } from 'react';
import { Close, MoreVert } from '@material-ui/icons';
import UserPlaylistItemDropDownMenu from './UserPlaylistItemDropDownMenu';

const UserPlaylistItem = (props) => {
  const {
    item,
    selectedList,
    customLists,
    setCustomLists,
    currentItems,
    setCurrentItem,
    setCurrentItems,
    setItemIndex,
    videoIdRatings,
  } = props;
  const [isEllipsisOn, setIsEllipsisOn] = useState(false);

  const playVideo = async () => {
    // videoIdRatings에서 평가했던 음악이 있다면 rating을 넣어준다.
    let rating = null;
    if (videoIdRatings[item.videoid]) {
      rating = videoIdRatings[item.videoid];
    }
    const newCurrentItems = [...currentItems];
    for (let i = 0; i < newCurrentItems.length; i++) {
      if (newCurrentItems[i].videoid === item.videoid) {
        newCurrentItems.splice(i, 1);
        await setCurrentItem(null); // currentItem을 변경하기 위해 초기화, 뮤직 플레이어를 조건 렌더링으로 바꾼 뒤 수정
        break;
      }
    }
    item.rating = rating;
    newCurrentItems.unshift(item);
    setCurrentItem(item);
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
            playVideo();
          }}
        >
          {item.title}
        </p>
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
          <MoreVert />
        </button>
      </div>
      {isEllipsisOn && (
        <UserPlaylistItemDropDownMenu
          videoid={item.videoid}
          selectedList={selectedList}
          customLists={customLists}
          setCustomLists={setCustomLists}
          setIsEllipsisOn={setIsEllipsisOn}
        />
      )}
    </li>
  );
};

export default UserPlaylistItem;
