import React, { memo, useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  PlayArrow,
  Pause,
  SkipNext,
  SkipPrevious,
  Repeat,
  Shuffle,
} from '@material-ui/icons';
import '../../styles/MusicNavBar.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'fixed',
    left: 0,
    bottom: 0,
    zIndex: 10,
    borderTop: '1px solid rgba(28, 31, 12, 0.7)',
    backgroundColor: '#1C1C1F',
  },
}));

const MusicNavBar = (props) => {
  const {
    currentItems,
    itemIndex,
    setItemIndex,
    isPlayButtonOn,
    setIsPlayButtonOn,
    isShuffleOn,
    setIsShuffleOn,
    shuffledQueue,
    setShuffledQueue,
    shuffledIndex,
    setShuffledIndex,
    isRepeatOn,
    setIsRepeatOn,
    playerSize,
    changePlayerSize,
  } = props;

  const [value, setValue] = useState(0);

  const classes = useStyles();

  function shuffleArrayES6(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function getIndexByVideoId(videoid) {
    for (let i = 0; i < currentItems.length; i++) {
      if (currentItems[i].videoid === videoid) {
        return i;
      }
    }
    return 0; // 에러 방지
  }

  const handleRepeat = () => {
    if (isRepeatOn) {
      console.log('반복 버튼이 꺼졌습니다.');
      setIsRepeatOn(false);
    } else {
      console.log('반복 버튼이 켜졌습니다.');
      setIsRepeatOn(true);
    }
  };

  const handlePrevious = () => {
    if (isShuffleOn) {
      // 셔플을 누르고 나서 첫 번째 재생시
      if (shuffledIndex === undefined) {
        const index = shuffledQueue[0];
        props.player.loadVideoById(currentItems[index].videoid);
        setShuffledIndex(0); // index를 0으로 초기화
        setIsPlayButtonOn(false);
        // 두 번째 재생시
      } else if (shuffledQueue[shuffledIndex - 1] !== undefined) {
        const index = shuffledQueue[shuffledIndex - 1];
        props.player.loadVideoById(currentItems[index].videoid);
        setShuffledIndex(shuffledIndex - 1);
        setIsPlayButtonOn(false);
      }
    } else if (currentItems[itemIndex - 1]) {
      props.player.loadVideoById(currentItems[itemIndex - 1].videoid);
      setItemIndex(itemIndex - 1);
      setIsPlayButtonOn(false);
    }
  };

  const handlePlay = () => {
    if (isPlayButtonOn) {
      props.player.playVideo();
      setIsPlayButtonOn(false);
    } else {
      props.player.pauseVideo();
      setIsPlayButtonOn(true);
    }
  };

  const handleNext = () => {
    if (isShuffleOn) {
      // 셔플을 누르고 나서 첫 번째 재생시
      if (shuffledIndex === undefined) {
        const index = shuffledQueue[0];
        props.player.loadVideoById(currentItems[index].videoid);
        setShuffledIndex(0); // index를 0으로 초기화
        setIsPlayButtonOn(false);
        // 두 번째 재생시
      } else if (shuffledQueue[shuffledIndex + 1] !== undefined) {
        const index = shuffledQueue[shuffledIndex + 1];
        props.player.loadVideoById(currentItems[index].videoid);
        setShuffledIndex(shuffledIndex + 1);
        setIsPlayButtonOn(false);
      }
    } else if (currentItems[itemIndex + 1]) {
      props.player.loadVideoById(currentItems[itemIndex + 1].videoid);
      setItemIndex(itemIndex + 1);
      setIsPlayButtonOn(false);
    }
  };

  const handleShuffle = () => {
    if (isShuffleOn) {
      console.log('셔플 버튼이 꺼졌습니다.');
      // 셔플 인덱스에 메인 인덱스를 맞춰준다.
      const shIndex = shuffledQueue[shuffledIndex];
      // 셔플 버튼을 눌렀을 때 초기값은 undefined가 되므로 예외처리를 해줬다.
      if (shIndex) {
        const index = getIndexByVideoId(currentItems[shIndex].videoid);
        setItemIndex(index);
      }
      setIsShuffleOn(false);
    } else {
      const queue = [];
      for (let i = 0; i < currentItems.length; i++) {
        queue.push(i);
      }
      shuffleArrayES6(queue);
      console.log('셔플 버튼이 눌렸습니다.');
      console.log('셔플된 queue : ', queue);
      setShuffledQueue(queue);
      setShuffledIndex(undefined);
      setIsShuffleOn(true);
    }
  };

  // player가 활성화 됐을 때만 렌더링
  // big일 때
  if (props.player && playerSize === 'big') {
    return (
      <div className="music-nav-bar-big">
        <div>
          <button onClick={handleRepeat}>
            {isRepeatOn ? <Repeat style={{ color: '#ffb347' }} /> : <Repeat />}
          </button>
        </div>

        <div>
          <button onClick={handlePrevious}>
            <SkipPrevious />
          </button>
        </div>

        <div>
          <button onClick={handlePlay}>
            {isPlayButtonOn ? <PlayArrow /> : <Pause />}
          </button>
        </div>

        <div>
          <button onClick={handleNext}>
            <SkipNext />
          </button>
        </div>

        <div>
          <button onClick={handleShuffle}>
            {isShuffleOn ? (
              <Shuffle style={{ color: '#ffb347' }} />
            ) : (
              <Shuffle />
            )}
          </button>
        </div>
      </div>
    );
  }

  // small일 때
  if (props.player && playerSize === 'small') {
    return (
      <div id="music-nav-bar" className="music-nav-bar-small">
        <div />
        <div className="music-nav-bar-title" onClick={changePlayerSize}>
          <marquee>{currentItems[itemIndex].title}</marquee>
        </div>
        <div>
          <button onClick={handlePlay}>
            {isPlayButtonOn ? <PlayArrow /> : <Pause />}
          </button>
        </div>
        <div>
          <button onClick={handleNext}>
            <SkipNext />
          </button>
        </div>
      </div>
    );
  }
  return null;
};

export default memo(MusicNavBar);
