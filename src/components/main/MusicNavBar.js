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
  const {
    currentItems,
    itemIndex,
    setItemIndex,
    isPlayButtonOn,
    setIsPlayButtonOn,
  } = props;
  // console.log('itemIndex : ', itemIndex);
  let centerButton;
  if (isPlayButtonOn) {
    centerButton = (
      <div>
        <button
          type="button"
          onClick={() => {
            props.player.playVideo();
            setIsPlayButtonOn(false);
          }}
        >
          <FontAwesomeIcon icon={faPlay} color="#afafaf" />
        </button>
      </div>
    );
  } else {
    centerButton = (
      <div>
        <button
          type="button"
          onClick={() => {
            props.player.pauseVideo();
            setIsPlayButtonOn(true);
          }}
        >
          <FontAwesomeIcon icon={faPause} color="#afafaf" />
        </button>
      </div>
    );
  }

  if (props.player) {
    return (
      <div id="music-nav-bar" className="music-nav-bar">
        <div>
          <button type="button">
            <FontAwesomeIcon icon={faExchangeAlt} color="#afafaf" />
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              if (currentItems[itemIndex - 1]) {
                props.player.loadVideoById(currentItems[itemIndex - 1].videoId);
                setItemIndex(itemIndex - 1);
                setIsPlayButtonOn(false);
              }
            }}
          >
            <FontAwesomeIcon icon={faStepBackward} color="#afafaf" />
          </button>
        </div>
        {centerButton}
        <div>
          <button
            type="button"
            onClick={() => {
              if (currentItems[itemIndex + 1]) {
                props.player.loadVideoById(currentItems[itemIndex + 1].videoId);
                setItemIndex(itemIndex + 1);
                setIsPlayButtonOn(false);
              }
            }}
          >
            <FontAwesomeIcon icon={faFastForward} color="#afafaf" />
          </button>
        </div>
        <div>
          <button type="button">
            <FontAwesomeIcon icon={faRandom} color="#afafaf" />
          </button>
        </div>
      </div>
    );
  }
  return null;
};

export default MusicNavBar;
