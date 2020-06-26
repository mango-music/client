import React, { memo, useState } from 'react';
import { MoreVert } from '@material-ui/icons';
import MusicQueueEntryDropDownMenu from './MusicQueueEntryDropDownMenu';

const MusicQueueEntry = (props) => {
  const {
    currentItems,
    isShuffleOn,
    shuffledQueue,
    setShuffledIndex,
    customLists,
    setCustomLists,
    item,
  } = props;
  // console.log('MusicQueueEntry rendering');

  const [isEllipsisOn, setIsEllipsisOn] = useState(false);

  const getIndexByVideoId = (videoid) => {
    for (let i = 0; i < currentItems.length; i++) {
      if (currentItems[i].videoid === videoid) {
        return i;
      }
    }
    return 0; // 에러 방지
  };

  const handleTitleClick = () => {
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
  };

  return (
    <li className="music-queue-entry">
      <div
        className="queue-image"
        style={{ backgroundImage: 'url(' + props.thumbnail + ')' }}
      ></div>
      <div className="queue-title" onClick={handleTitleClick}>
        <p>{props.title}</p>
      </div>
      <div className="queue-ellipsis">
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
        <MusicQueueEntryDropDownMenu
          customLists={customLists}
          setCustomLists={setCustomLists}
          setIsEllipsisOn={setIsEllipsisOn}
          item={item}
        />
      )}
    </li>
  );
};

export default memo(MusicQueueEntry);
