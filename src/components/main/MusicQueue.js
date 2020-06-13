import React, { memo } from 'react';
import MusicQueueEntry from './MusicQueueEntry';

const MusicQueue = (props) => {
  // console.log('MusicQueue rendering');
  return (
    <ul className="music-queue">
      {props.currentItems.map((item, index) => {
        return (
          <MusicQueueEntry
            currentItems={props.currentItems}
            title={item.title}
            thumbnail={item.thumbnail}
            videoid={item.videoid}
            player={props.player}
            index={index}
            setItemIndex={props.setItemIndex}
            setIsPlayButtonOn={props.setIsPlayButtonOn}
            isShuffleOn={props.isShuffleOn}
            setShuffledIndex={props.setShuffledIndex}
            shuffledQueue={props.shuffledQueue}
            key={item.videoid}
          />
        );
      })}
    </ul>
  );
};

export default memo(MusicQueue);
