import React from 'react';

const MusicQueueEntry = (props) => {
  return (
    <li className="music-queue-entry" onClick={() => console.log('clicked')}>
      <div>
        <img src={props.thumbnail} />
      </div>
      <p>{props.title}</p>
    </li>
  );
};

export default MusicQueueEntry;
