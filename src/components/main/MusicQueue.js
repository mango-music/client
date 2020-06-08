import React from 'react';
import MusicQueueEntry from './MusicQueueEntry';

const MusicQueue = (props) => {
  return (
    <ul className="music-queue">
      {props.currentItems.map((item) => {
        return (
          <MusicQueueEntry
            title={item.snippet.title}
            thumbnail={item.snippet.thumbnails.default.url}
            videoId={item.snippet.resourceId.videoId}
            key={item.snippet.resourceId.videoId}
          />
        );
      })}
    </ul>
  );
};

export default MusicQueue;
