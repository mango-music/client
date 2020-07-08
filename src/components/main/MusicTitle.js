import React, { memo } from 'react';

const MusicTitle = (props) => {
  const { isShuffleOn, shuffledIndex, changePlayerSize } = props;
  console.log('MusicTitle rendering');
  let title;
  // 셔플일 때
  if (isShuffleOn && shuffledIndex !== undefined) {
    const index = props.shuffledQueue[shuffledIndex];
    title = props.currentItems[index].title;
  } else {
    title = props.currentItems[props.itemIndex].title;
  }
  return (
    <p className="music-title" onClick={changePlayerSize}>
      {title}
    </p>
  );
};

export default memo(MusicTitle);
