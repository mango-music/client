import React from 'react';

const MusicNavBar = (props) => {
  let { itemIndex, setItemIndex, isPlayButtonOn, setIsPlayButtonOn } = props;
  console.log('itemIndex : ', itemIndex);
  let centerButton;
  if (isPlayButtonOn) {
    centerButton = (
      <div>
        <button
          onClick={() => {
            props.player.playVideo();
            setIsPlayButtonOn(false);
          }}
        >
          ▶️
        </button>
      </div>
    );
  } else {
    centerButton = (
      <div>
        <button
          onClick={() => {
            props.player.pauseVideo();
            setIsPlayButtonOn(true);
          }}
        >
          ⏸
        </button>
      </div>
    );
  }
  return (
    <div className="music-nav-bar">
      <div>
        <button>↜</button>
      </div>
      <div>
        <button
          onClick={() => {
            if (props.currentItems[itemIndex - 1]) {
              props.player.loadVideoById(
                props.currentItems[itemIndex - 1].snippet.resourceId.videoId,
              );
              setItemIndex(itemIndex - 1);
              setIsPlayButtonOn(false);
            }
          }}
        >
          ←
        </button>
      </div>
      {centerButton}
      <div>
        <button
          onClick={() => {
            if (props.currentItems[itemIndex + 1]) {
              props.player.loadVideoById(
                props.currentItems[itemIndex + 1].snippet.resourceId.videoId,
              );
              setItemIndex(itemIndex + 1);
              setIsPlayButtonOn(false);
            }
          }}
        >
          →
        </button>
      </div>
      <div>
        <button>⤺</button>
      </div>
    </div>
  );
};

export default MusicNavBar;
