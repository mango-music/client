import React, { useState } from 'react';
import YouTube from 'react-youtube';
import RatingForm from './RatingForm';
import MusicTitle from './MusicTitle';
import MusicProgressBar from './MusicProgressBar';
import MusicNavBar from './MusicNavBar';
import '../../styles/MusicPlayer.scss';

const MusicPlayer = (props) => {
  const [player, setPlayer] = useState(null); // video를 처리하기 위한 player 변수
  const opts = {
    playerVars: {
      autoplay: 0,
    },
  };
  const onReady = (event) => {
    setPlayer(event.target); // video가 로딩 됐을 때 player 변수로 video를 참조할 수 있게 해준다.
  }
  return (
    <div className="player">
      <div id="player-window" className="big-window">
        <YouTube
          videoId="ZbZSe6N_BXs"
          opts={opts}
          onReady={onReady}
          className="player-video" />
        <RatingForm />
        <MusicTitle />
        <MusicProgressBar />
        <MusicNavBar player={player} />
      </div>
    </div>
  );
}

export default MusicPlayer;
