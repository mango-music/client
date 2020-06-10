import React from 'react';
import MusicQueueEntry from './MusicQueueEntry';

const MusicQueue = (props) => {
  return (
    <ul className="music-queue">
      {props.currentItems.map((item, index) => {
        return (
          <MusicQueueEntry
            title={item.title}
            thumbnail={item.thumbnail}
            videoId={item.videoId}
            player={props.player}
            index={index}
            setItemIndex={props.setItemIndex}
            setIsPlayButtonOn={props.setIsPlayButtonOn}
            key={item.videoId}
          />
        );
      })}
    </ul>
  );
};

export default MusicQueue;
