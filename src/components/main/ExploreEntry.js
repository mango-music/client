import React, { useState } from 'react';
import { MoreVert } from '@material-ui/icons';
import ExploreDropDownMenu from './ExploreDropDownMenu';

const ExploreEntry = (props) => {
  const {
    currentItems,
    setCurrentItem,
    setCurrentItems,
    customLists,
    item,
    setCustomLists,
    setItemIndex,
    videoIdRatings,
  } = props;
  const [isEllipsisOn, setIsEllipsisOn] = useState(false);

  const videoid = item.id.videoId;
  const title = item.snippet.title;
  const thumbnail = item.snippet.thumbnails.high.url;

  const playVideo = async () => {
    // videoIdRatings에서 평가했던 음악이 있다면 rating을 넣어준다.
    let rating = null;
    if (videoIdRatings[videoid]) {
      rating = videoIdRatings[videoid];
    }
    const item = {
      title,
      thumbnail,
      videoid,
      rating,
    };
    console.log('rating이 얼마?', rating);
    // currentItems에 중복된 비디오가 있다면 삭제
    const newCurrentItems = [...currentItems];
    for (let i = 0; i < newCurrentItems.length; i++) {
      if (newCurrentItems[i].videoid === item.videoid) {
        newCurrentItems.splice(i, 1);
        await setCurrentItem(null); // currentItem을 변경하기 위해 초기화, 뮤직 플레이어를 조건 렌더링으로 바꾼 뒤 수정
        break;
      }
    }
    newCurrentItems.unshift(item);
    setCurrentItem(item);
    setCurrentItems(newCurrentItems);
    setItemIndex(0); // TODO: 셔플 버튼이 켜져 있을 때에도 통제할 수 있게 수정해야 한다.
  };

  return (
    <li>
      <div className="search-image">
        <img src={thumbnail} />
      </div>
      <div className="search-title">
        <p
          onClick={() => {
            console.log(`${title}을 재생합니다.`);
            playVideo();
          }}
        >
          {title}
        </p>
      </div>
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
        <MoreVert />
      </button>
      {isEllipsisOn && (
        <ExploreDropDownMenu
          videoid={videoid}
          customLists={customLists}
          item={item}
          setCustomLists={setCustomLists}
          setIsEllipsisOn={setIsEllipsisOn}
        />
      )}
    </li>
  );
};

export default ExploreEntry;
