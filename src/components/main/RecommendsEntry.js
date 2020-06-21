import React from 'react';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../styles/Recommends.scss';
import fkdtRecommends from '../../lib/fixtures/fkdtRecommends';

const RecommendsEntry = (props) => {
  const {
    currentItems,
    currentItem,
    setCurrentItems,
    setCurrentItem,
    setItemIndex,
    video,
  } = props;

  const playVideo = async (video) => {
    const newCurrentItems = [...currentItems];
    // currentItems에 중복된 비디오가 있다면 삭제
    for (let i = 0; i < newCurrentItems.length; i++) {
      if (newCurrentItems[i].videoid === video.videoid) {
        newCurrentItems.splice(i, 1);
        await setCurrentItem(null); // currentItem을 변경하기 위해 초기화, 뮤직 플레이어를 조건 렌더링으로 바꾼 뒤 수정
        break;
      }
    }
    newCurrentItems.unshift(video);
    console.log('video : ', video);
    setCurrentItem(video);
    setCurrentItems(newCurrentItems);
    setItemIndex(0); // TODO: 셔플 버튼이 켜져 있을 때에도 통제할 수 있게 수정해야 한다.
  };

  return (
    <li>
      <div className="recommends-image">
        <img src={video.thumbnail} />
      </div>
      <div
        className="recommends-title"
        onClick={() => {
          console.log('ssssss : ', video.videoid);
          console.log(`${video.title}을 재생합니다.`);
          playVideo(video);
        }}
      >
        {video.title}
      </div>
      <div className="recommends-button">
        <button>
          <FontAwesomeIcon icon={faEllipsisV} color="#afafaf" />
        </button>
      </div>
    </li>
  );
};

export default RecommendsEntry;
