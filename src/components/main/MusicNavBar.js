import React from 'react';
import {
  faFastForward,
  faStepBackward,
  faPause,
  faPlay,
  faRandom,
  faExchangeAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
          <FontAwesomeIcon icon={faPlay} />
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
          <FontAwesomeIcon icon={faPause} />
        </button>
      </div>
    );
  }
  return (
    <div className="music-nav-bar">
      <div>
        <button>
          <FontAwesomeIcon icon={faExchangeAlt} />
        </button>
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
          <FontAwesomeIcon icon={faStepBackward} />
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
          <FontAwesomeIcon icon={faFastForward} />
        </button>
      </div>
      <div>
        <button>
          <FontAwesomeIcon icon={faRandom} />
        </button>
      </div>
    </div>
  );
};

export default MusicNavBar;
