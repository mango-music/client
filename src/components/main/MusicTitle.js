import React, { useState } from 'react';

const MusicTitle = (props) => {
  return (
    <div className="music-title">
      {props.currentItems[props.itemIndex].snippet.title}
    </div>
  );
};

export default MusicTitle;
