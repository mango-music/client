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
    setPlayer(event.target); // video가 로딩 됐을 때 player 변수로 video를 참조할 수 있게 해준다.
  };
  const handleStateChange = (event) => {
    if (event.data == 1) {
      // 재생중
      timer = setInterval(() => {
        const currentSecond = Math.floor(player.getCurrentTime());
        if (currentSecond) {
          setCurrentTime(currentSecond);
        }
      }, 1000);
    } else if (event.data === 2 || event.data === 0) {
      // 일시중지됨, 종료됨
      clearInterval(timer);
    }
    if (event.data === -1 || event.data === 1 || event.data === 2) {
      // 시작되지 않음, 재생중, 일시정지됨
      setDurationTime(Math.floor(player.getDuration()));
    }
  };
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
        <RatingForm />
        <MusicTitle title={currentItem.snippet.title} />
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
};

export default MusicPlayer;
