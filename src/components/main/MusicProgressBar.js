import React from 'react';

const MusicProgressBar = ({ currentTime, durationTime }) => {
  const currentTimeMinute = Math.floor(currentTime / 60);
  let currentTimeSecond = currentTime % 60;
  if (String(currentTimeSecond).length === 1) {
    currentTimeSecond = '0' + currentTimeSecond;
  }
  const durationTimeMinute = Math.floor(durationTime / 60);
  let durationTimeSecond = durationTime % 60;
  if (String(durationTimeSecond).length === 1) {
    durationTimeSecond = '0' + durationTimeSecond;
  }
  const progressState = (currentTime / durationTime) * 100;
  return (
    <div className="music-progress-bar">
      <div className="progress-bar">
        <div
          className="progress-node"
          style={{ width: `${progressState}%` }}
        ></div>
      </div>
      <div className="play-time">
        <div>
          {currentTimeMinute}:{currentTimeSecond}
        </div>
        <div>
          {durationTimeMinute}:{durationTimeSecond}
        </div>
      </div>
    </div>
  );
};

export default MusicProgressBar;
