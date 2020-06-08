import React from 'react';

const MusicNavBar = (props) => {
  return (
    <div className="music-nav-bar">
      <div><button>↜</button></div>
      <div><button>←</button></div>
      <div><button onClick={() => props.player.playVideo()}>►</button></div>
      <div><button>→</button></div>
      <div><button>⤺</button></div>
    </div>
  );
}

export default MusicNavBar;
