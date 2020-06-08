import React, { useState } from 'react';
import YouTube from 'react-youtube';
import RatingForm from './RatingForm';
import MusicTitle from './MusicTitle';
import MusicProgressBar from './MusicProgressBar';
import MusicNavBar from './MusicNavBar';
import MusicQueue from './MusicQueue';
import '../../styles/MusicPlayer.scss';

import getRecommendedPlaylist from '../../lib/apis/getRecommendedPlaylist';

const MusicPlayer = (props) => {
  const { currentItems, currentItem } = props; // fakeData 로딩
  const [player, setPlayer] = useState(null); // video를 처리하기 위한 player 변수
  const opts = {
    playerVars: {
      autoplay: 0,
    },
  };
  const onReady = (event) => {
    setPlayer(event.target); // video가 로딩 됐을 때 player 변수로 video를 참조할 수 있게 해준다.
  };
  return (
    <div className="player">
      <div id="player-window" className="big-window">
        <YouTube
          videoId={currentItem.snippet.resourceId.videoId}
          opts={opts}
          onReady={onReady}
          className="player-video"
        />
        <RatingForm />
        <MusicTitle />
        <MusicProgressBar />
        <MusicQueue currentItems={currentItems} />
      </div>
      <MusicNavBar player={player} />
    </div>
  );
};

export default MusicPlayer;
