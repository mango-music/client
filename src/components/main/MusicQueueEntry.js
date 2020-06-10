import React from 'react';

const MusicQueueEntry = (props) => {
  return (
    <li
      className="music-queue-entry"
      onClick={() => {
        props.player.loadVideoById(props.videoId);
        props.setItemIndex(props.index);
        props.setIsPlayButtonOn(false);
      }}
    >
      <div>
        <img src={props.thumbnail} />
      </div>
      <p>{props.title}</p>
    </li>
  );
};

export default MusicQueueEntry;
