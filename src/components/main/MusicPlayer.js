import React, { useState, useEffect, memo } from 'react';
import YouTube from 'react-youtube';
import RatingForm from './RatingForm';
import MusicTitle from './MusicTitle';
import MusicProgressBar from './MusicProgressBar';
import MusicNavBar from './MusicNavBar';
import MusicQueue from './MusicQueue';
import { Close, Remove } from '@material-ui/icons';
import '../../styles/MusicPlayer.scss';

let timer;
const MusicPlayer = (props) => {
  const {
    currentItems,
    currentItem,
    setCurrentItem,
    setCurrentItems,
    itemIndex,
    setItemIndex,
    playerSize,
    changePlayerSize,
    videoIdRatings,
    setVideoIdRatings,
    customLists,
    setCustomLists,
    musicAverage,
    ratingPeople,
  } = props; // fakeData 로딩
  const [player, setPlayer] = useState(null); // video를 처리하기 위한 player 변수
  // const [itemIndex, setItemIndex] = useState(0); // 배열의 몇 번째 음악을 재생하는지 알려주는 숫자
  const [isPlayButtonOn, setIsPlayButtonOn] = useState(false); // 재생 버튼과 일시 정지 버튼을 위한 state
  const [currentTime, setCurrentTime] = useState(0); // 플레이어가 재생하고 있는 시간
  const [durationTime, setDurationTime] = useState(null); // 영상의 총 길이
  // 셔플 관련 state
  const [isShuffleOn, setIsShuffleOn] = useState(false); // 셔플 버튼
  const [shuffledQueue, setShuffledQueue] = useState([]); // [1, 3, 2, 4, 5, 0] 셔플 큐
  const [shuffledIndex, setShuffledIndex] = useState(undefined); // 셔플 큐의 인덱스를 가리키는 숫자
  // 반복 재생 관련 state
  const [isRepeatOn, setIsRepeatOn] = useState(false);

  useEffect(() => {
    // 이중 timer 방지
    clearInterval(timer);
  }, [currentItem]);

  useEffect(() => {
    console.log('currentItem이 바뀔 때에는 셔플 버튼을 초기화합니다.');
    setIsShuffleOn(false);
  }, [currentItem]);

  const opts = {
    playerVars: {
      autoplay: 1,
      rel: 0,
      playsinline: 1,
    },
  };
  const onReady = (event) => {
    console.log('onReady 호출');
    setPlayer(event.target); // video가 로딩 됐을 때 player 변수로 video를 참조할 수 있게 해준다.
    event.target.playVideo();
  };

  const handleSetCurrentTime = () => {
    const currentSecond = Math.floor(player.getCurrentTime());
    if (currentSecond) {
      setCurrentTime(currentSecond);
    }
  };

  const playFirstItem = () => {
    player.loadVideoById(currentItems[0].videoid);
    setItemIndex(0);
    setIsPlayButtonOn(false);
    setItemIndex(0);
  };

  const playFirstShuffledItem = () => {
    const index = shuffledQueue[0];
    player.loadVideoById(currentItems[index].videoid);
    setShuffledIndex(0);
    setIsPlayButtonOn(false);
  };

  const handleStateChange = (event) => {
    // 재생중 => timer 시작
    if (event.data === 1) {
      // 임시로 제거
      timer = setInterval(() => {
        handleSetCurrentTime();
      }, 1000);
      setIsPlayButtonOn(false);
      // 일시중지됨, 종료됨 => timer 제거
    } else if (event.data === 2 || event.data === 0) {
      clearInterval(timer);
      setIsPlayButtonOn(true);
    }
    // 시작되지 않음, 재생중, 일시정지됨 => 총 재생 시간 state
    if (event.data === -1 || event.data === 1 || event.data === 2) {
      setDurationTime(Math.floor(player.getDuration()));
    }
    // 종료됨 => 다음곡 재생
    if (event.data === 0) {
      if (isShuffleOn) {
        if (shuffledIndex === undefined) {
          playFirstShuffledItem();
        } else if (shuffledQueue[shuffledIndex + 1] !== undefined) {
          const index = shuffledQueue[shuffledIndex + 1];
          player.loadVideoById(currentItems[index].videoid);
          setShuffledIndex(shuffledIndex + 1);
          setIsPlayButtonOn(false);
        } else if (isRepeatOn) {
          playFirstShuffledItem();
        }
      } else if (currentItems[itemIndex + 1] !== undefined) {
        player.loadVideoById(currentItems[itemIndex + 1].videoid);
        setItemIndex(itemIndex + 1);
        setIsPlayButtonOn(false);
      } else if (isRepeatOn) {
        playFirstItem();
      }
    }
    handleSetCurrentTime(); // 이벤트가 발생할 때마다 재생 노드 조정
  };

  const stopPlayer = async () => {
    setIsShuffleOn(false);
    setIsRepeatOn(false);
    setShuffledQueue([]); // [1, 3, 2, 4, 5, 0] 셔플 큐
    setShuffledIndex(undefined); // 셔플 큐의 인덱스를 가리키는 숫자
    changePlayerSize();
    setCurrentItem(null);
    setCurrentItems([]);
    setItemIndex(0);
  };

  if (currentItems.length > 0 && currentItem) {
    return (
      <div id="player">
        <div id="player-selector" className={'player-' + playerSize}>
          <div className="player-window">
            <header>
              <div onClick={stopPlayer}>
                <Close />
              </div>
              <div onClick={changePlayerSize}>
                <Remove />
              </div>
            </header>
            <section>
              <YouTube
                videoId={currentItem.videoid}
                opts={opts}
                onReady={onReady}
                onStateChange={handleStateChange}
                className="iframe-video"
              />
            </section>
            <MusicTitle
              currentItems={currentItems}
              itemIndex={itemIndex}
              isShuffleOn={isShuffleOn}
              shuffledIndex={shuffledIndex}
              shuffledQueue={shuffledQueue}
              changePlayerSize={changePlayerSize}
            />
            <RatingForm
              currentItems={currentItems}
              setCurrentItems={setCurrentItems}
              itemIndex={itemIndex}
              isShuffleOn={isShuffleOn}
              shuffledIndex={shuffledIndex}
              shuffledQueue={shuffledQueue}
              videoIdRatings={videoIdRatings}
              setVideoIdRatings={setVideoIdRatings}
              musicAverage={musicAverage}
              ratingPeople={ratingPeople}
            />
            <MusicProgressBar
              currentTime={currentTime}
              durationTime={durationTime}
            />
            <MusicQueue
              currentItems={currentItems}
              setItemIndex={setItemIndex}
              setIsPlayButtonOn={setIsPlayButtonOn}
              player={player}
              isShuffleOn={isShuffleOn}
              setShuffledIndex={setShuffledIndex}
              shuffledQueue={shuffledQueue}
              customLists={customLists}
              setCustomLists={setCustomLists}
            />
          </div>
          <MusicNavBar
            currentItems={currentItems}
            itemIndex={itemIndex}
            setItemIndex={setItemIndex}
            isPlayButtonOn={isPlayButtonOn}
            setIsPlayButtonOn={setIsPlayButtonOn}
            isShuffleOn={isShuffleOn}
            setIsShuffleOn={setIsShuffleOn}
            shuffledQueue={shuffledQueue}
            setShuffledQueue={setShuffledQueue}
            shuffledIndex={shuffledIndex}
            setShuffledIndex={setShuffledIndex}
            isRepeatOn={isRepeatOn}
            setIsRepeatOn={setIsRepeatOn}
            player={player}
            playerSize={playerSize}
            changePlayerSize={changePlayerSize}
          />
        </div>
      </div>
    );
  }
  return null;
};

export default memo(MusicPlayer);
