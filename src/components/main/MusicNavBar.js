import React, { memo } from 'react';
import {
  faStepForward,
  faStepBackward,
  faPause,
  faPlay,
  faRandom,
  faExchangeAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../styles/MusicNavBar.scss';

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
  } = props;
  // console.log('MusicNavBar rendering');

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

  let repeatButton;
  if (isRepeatOn) {
    repeatButton = (
      <button
        type="button"
        onClick={() => {
          console.log('반복 버튼이 꺼졌습니다.');
          setIsRepeatOn(false);
        }}
      >
        <FontAwesomeIcon icon={faExchangeAlt} color="black" />
      </button>
    );
  } else {
    repeatButton = (
      <button
        type="button"
        onClick={() => {
          console.log('반복 버튼이 켜졌습니다.');
          setIsRepeatOn(true);
        }}
      >
        <FontAwesomeIcon icon={faExchangeAlt} color="#afafaf" />
      </button>
    );
  }

  let centerButton;
  if (isPlayButtonOn) {
    centerButton = (
      <button
        type="button"
        onClick={() => {
          props.player.playVideo();
          setIsPlayButtonOn(false);
        }}
      >
        <FontAwesomeIcon icon={faPlay} color="#afafaf" />
      </button>
    );
  } else {
    centerButton = (
      <button
        type="button"
        onClick={() => {
          props.player.pauseVideo();
          setIsPlayButtonOn(true);
        }}
      >
        <FontAwesomeIcon icon={faPause} color="#afafaf" />
      </button>
    );
  }

  let shuffleButton;
  if (isShuffleOn) {
    shuffleButton = (
      <button
        type="button"
        onClick={() => {
          console.log('셔플 버튼이 꺼졌습니다.');
          // 셔플 인덱스에 메인 인덱스를 맞춰준다.
          const shIndex = shuffledQueue[shuffledIndex];
          // 셔플 버튼을 눌렀을 때 초기값은 undefined가 되므로 예외처리를 해줬다.
          if (shIndex) {
            const index = getIndexByVideoId(currentItems[shIndex].videoid);
            setItemIndex(index);
          }
          setIsShuffleOn(false);
        }}
      >
        <FontAwesomeIcon icon={faRandom} color="black" />
      </button>
    );
  } else {
    shuffleButton = (
      <button
        type="button"
        onClick={() => {
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
        }}
      >
        <FontAwesomeIcon icon={faRandom} color="#afafaf" />
      </button>
    );
  }

  if (props.player) {
    return (
      <div id="music-nav-bar" className="music-nav-bar">
        <div>{repeatButton}</div>
        <div>
          <button
            type="button"
            onClick={() => {
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
            }}
          >
            <FontAwesomeIcon icon={faStepBackward} color="#afafaf" />
          </button>
        </div>
        <div>{centerButton}</div>
        <div>
          <button
            type="button"
            onClick={() => {
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
            }}
          >
            <FontAwesomeIcon icon={faStepForward} color="#afafaf" />
          </button>
        </div>
        <div>{shuffleButton}</div>
      </div>
    );
  }
  return null;
};

export default memo(MusicNavBar);
