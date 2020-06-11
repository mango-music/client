import React, { useState } from 'react';

const MusicTitle = (props) => {
  const { isShuffleOn, shuffledIndex } = props;
  let title;
  // 셔플일 때
  if (isShuffleOn && shuffledIndex !== undefined) {
    const index = props.shuffledQueue[shuffledIndex];
    title = props.currentItems[index].title;
  } else {
    title = props.currentItems[props.itemIndex].title;
  }
  return <div className="music-title">{title}</div>;
};

export default MusicTitle;
