import React from 'react';

const MusicNavBar = (props) => {
  return (
    <div className="music-nav-bar">
      <div>
        <button>↜</button>
      </div>
      <div>
        <button>←</button>
      </div>
      <div id="play-button" className="hidden">
        <button
          onClick={() => {
            props.player.playVideo();
            document.getElementById('play-button').classList.toggle('hidden');
            document.getElementById('pause-button').classList.toggle('hidden');
          }}
        >
          ▶️
        </button>
      </div>
      <div id="pause-button">
        <button
          onClick={() => {
            props.player.pauseVideo();
            document.getElementById('pause-button').classList.toggle('hidden');
            document.getElementById('play-button').classList.toggle('hidden');
          }}
        >
          ⏸
        </button>
      </div>
      <div>
        <button>→</button>
      </div>
      <div>
        <button>⤺</button>
      </div>
    </div>
  );
};

export default MusicNavBar;
