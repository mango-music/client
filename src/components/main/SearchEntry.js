import React, { useState } from 'react';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchDropDownMenu from './SearchDropDownMenu';

const SearchEntry = (props) => {
  const {
    currentItems,
    setCurrentItem,
    setCurrentItems,
    customLists,
    item,
    setCustomLists,
    setItemIndex,
  } = props;
  const [isEllipsisOn, setIsEllipsisOn] = useState(false);

  const playVideo = async (item) => {
    const newCurrentItems = [...currentItems];
    const video = {
      title: props.title,
      thumbnail: props.thumbnail,
      videoid: props.videoid,
      rating: 0, // 초기 rating은 0으로 한다?
    };
    // currentItems에 중복된 비디오가 있다면 삭제
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
      <div className="search-image">
        <img src={props.thumbnail} />
      </div>
      <p
        onClick={() => {
          console.log(`${props.title}을 재생합니다.`);
          playVideo(item);
        }}
      >
        {props.title}
      </p>
      <button
        onClick={() => {
          if (isEllipsisOn) {
            setIsEllipsisOn(false);
          } else {
            setIsEllipsisOn(true);
          }
        }}
        className="search-ellipsis"
      >
        <FontAwesomeIcon icon={faEllipsisV} color="#afafaf" />
      </button>
      {isEllipsisOn && (
        <SearchDropDownMenu
          videoid={props.videoid}
          customLists={customLists}
          item={item}
          setCustomLists={setCustomLists}
          setIsEllipsisOn={setIsEllipsisOn}
        />
      )}
    </li>
  );
};

export default SearchEntry;
