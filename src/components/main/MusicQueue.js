import React, { memo } from 'react';
import MusicQueueEntry from './MusicQueueEntry';

const MusicQueue = (props) => {
  const {
    currentItems,
    player,
    setItemIndex,
    setIsPlayButtonOn,
    isShuffleOn,
    setShuffledIndex,
    shuffledQueue,
  } = props;
  // console.log('MusicQueue rendering');
  return (
    <ul className="music-queue">
      {currentItems.map((item, index) => {
        return (
          <MusicQueueEntry
            currentItems={currentItems}
            title={item.title}
            thumbnail={item.thumbnail}
            videoid={item.videoid}
            player={player}
            index={index}
            setItemIndex={setItemIndex}
            setIsPlayButtonOn={setIsPlayButtonOn}
            isShuffleOn={isShuffleOn}
            setShuffledIndex={setShuffledIndex}
            shuffledQueue={shuffledQueue}
            key={item.videoid}
          />
        );
      })}
    </ul>
  );
};

export default memo(MusicQueue);
