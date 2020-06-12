import React from 'react';

const MusicQueueEntry = (props) => {
  const { currentItems, isShuffleOn, shuffledQueue, setShuffledIndex } = props;
  function getIndexByVideoId(videoId) {
    for (let i = 0; i < currentItems.length; i++) {
      if (currentItems[i].videoId === videoId) {
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
          const index = getIndexByVideoId(props.videoId);
          let shIndex;
          for (let i = 0; i < shuffledQueue.length; i++) {
            if (shuffledQueue[i] === index) {
              shIndex = i;
              break;
            }
          }
          setShuffledIndex(shIndex);
        }
        props.player.loadVideoById(props.videoId);
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

export default MusicQueueEntry;
