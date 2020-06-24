import React, { useState, useEffect } from 'react';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RecommendsEntry from './RecommendsEntry';
import getRecommendedMusic from '../../../lib/apis/getRecommendedMusic';
import '../../../styles/Recommends.scss';

const Recommends = (props) => {
  const {
    currentItems,
    currentItem,
    setCurrentItems,
    setCurrentItem,
    setItemIndex,
    customLists,
    setCustomLists,
    nickname,
    setPlayerSize,
    videoIdRatings,
  } = props;
  const [recommends, setRecommends] = useState([]);

  useEffect(() => {
    getRecommendedMusic().then((data) => {
      setRecommends(data);
    });
  }, []);

  return (
    <div id="recommends">
      <div id="play-all-button">
        <button
          onClick={async () => {
            await setCurrentItem(null);
            await setCurrentItems([]);
            setCurrentItems(recommends);
            setCurrentItem(recommends[0]);
            setPlayerSize('big');
          }}
        >
          Play All <FontAwesomeIcon icon={faPlay} color="#afafaf" />
        </button>
      </div>
      <ul>
        {recommends.map((video) => (
          <RecommendsEntry
            key={video.videoid}
            video={video}
            currentItems={currentItems}
            currentItem={currentItem}
            setCurrentItems={setCurrentItems}
            setCurrentItem={setCurrentItem}
            setItemIndex={setItemIndex}
            customLists={customLists}
            setCustomLists={setCustomLists}
            videoIdRatings={videoIdRatings}
          />
        ))}
      </ul>
    </div>
  );
};

export default Recommends;
