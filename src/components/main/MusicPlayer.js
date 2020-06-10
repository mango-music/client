import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import RatingForm from './RatingForm';
import MusicTitle from './MusicTitle';
import MusicProgressBar from './MusicProgressBar';
import MusicNavBar from './MusicNavBar';
import MusicQueue from './MusicQueue';
import '../../styles/MusicPlayer.scss';

let timer;
const MusicPlayer = (props) => {
  const { currentItems, currentItem } = props; // fakeData 로딩
  const [player, setPlayer] = useState(null); // video를 처리하기 위한 player 변수
  const [itemIndex, setItemIndex] = useState(0); // 배열의 몇 번째 음악을 재생하는지 알려주는 state
  const [isPlayButtonOn, setIsPlayButtonOn] = useState(false); // 재생 버튼과 일시 정지 버튼을 위한 state
  const [currentTime, setCurrentTime] = useState(0); // 플레이어가 재생하고 있는 시간
  const [durationTime, setDurationTime] = useState(null); // 영상의 총 길이

  const opts = {
    playerVars: {
      autoplay: 1,
    },
  };
  const onReady = (event) => {
    console.log('onReady 호출');
    setPlayer(event.target); // video가 로딩 됐을 때 player 변수로 video를 참조할 수 있게 해준다.
  };

  const handleSetCurrentTime = () => {
    const currentSecond = Math.floor(player.getCurrentTime());
    if (currentSecond) {
      setCurrentTime(currentSecond);
    }
  };

  const handleStateChange = (event) => {
    // 재생중 => timer 시작
    if (event.data === 1) {
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
      if (currentItems[itemIndex + 1]) {
        player.loadVideoById(
          currentItems[itemIndex + 1].snippet.resourceId.videoId,
        );
        setItemIndex(itemIndex + 1);
        setIsPlayButtonOn(false);
      }
    }
    handleSetCurrentTime(); // 이벤트가 발생할 때마다 재생 노드 조정
  };

  // 렌더링 조건
  if (currentItems && currentItem) {
    return (
      <div id="player-selector" className="big-player">
        <div className="player-window">
          <YouTube
            videoId={currentItem.snippet.resourceId.videoId}
            opts={opts}
            onReady={onReady}
            onStateChange={handleStateChange}
            className="iframe-video"
          />
          <RatingForm starsCount={4} />
          <MusicTitle currentItems={currentItems} itemIndex={itemIndex} />
          <MusicProgressBar
            currentTime={currentTime}
            durationTime={durationTime}
          />
          <MusicQueue
            currentItems={currentItems}
            setItemIndex={setItemIndex}
            setIsPlayButtonOn={setIsPlayButtonOn}
            player={player}
          />
        </div>
        <MusicNavBar
          currentItems={currentItems}
          itemIndex={itemIndex}
          setItemIndex={setItemIndex}
          isPlayButtonOn={isPlayButtonOn}
          setIsPlayButtonOn={setIsPlayButtonOn}
          player={player}
        />
      </div>
    );
  } else {
    return null;
  }
};

export default MusicPlayer;
