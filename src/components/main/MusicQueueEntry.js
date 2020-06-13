import React, { memo } from 'react';

const MusicQueueEntry = (props) => {
  const { currentItems, isShuffleOn, shuffledQueue, setShuffledIndex } = props;
  // console.log('MusicQueueEntry rendering');
  function getIndexByVideoId(videoid) {
    for (let i = 0; i < currentItems.length; i++) {
      if (currentItems[i].videoid === videoid) {
        return i;
      }
    }
    return 0; // 에러 방지
  }

  return (
    <li
      className="music-queue-entry"
      onClick={() => {
        if (isShuffleOn) {
          // 셔플 인덱스를 바꿔준다.
          const index = getIndexByVideoId(props.videoid);
          let shIndex;
          for (let i = 0; i < shuffledQueue.length; i++) {
            if (shuffledQueue[i] === index) {
              shIndex = i;
              break;
            }
          }
          setShuffledIndex(shIndex);
        }
        props.player.loadVideoById(props.videoid);
        props.setItemIndex(props.index);
        props.setIsPlayButtonOn(false);
      }}
    >
      <div>
        <img src={props.thumbnail} />
      </div>
      <p>{props.title}</p>
    </li>
  );
};

export default memo(MusicQueueEntry);
