import React, { useState, useEffect } from 'react';

const Ranks = (props) => {
  const { music } = props;
  console.log(music);
  const videoId = music.snippet.resourceId.videoId;
  return (
    <li>
      <img
        className="thumbnail"
        src={`http://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
      />
    </li>
  );
};

export default Ranks;
