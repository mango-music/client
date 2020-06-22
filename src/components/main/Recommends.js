import React, { useState, useEffect } from 'react';
import MainHeader from './MainHeader';
import RecommendsEntry from './RecommendsEntry';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../styles/Recommends.scss';
import fkdtRecommends from '../../lib/fixtures/fkdtRecommends';

const Recommends = (props) => {
  const {
    currentItems,
    currentItem,
    setCurrentItems,
    setCurrentItem,
    setItemIndex,
    customLists,
    setCustomLists,
  } = props;
  const [recommends, setRecommends] = useState([]);
  // 추천 리스트 요청
  useEffect(() => {
    setRecommends(fkdtRecommends);
  }, []);

  return (
    <div id="recommends">
      <MainHeader name={'Recommends'} />
      <div id="play-all-button">
        <button
          onClick={async () => {
            await setCurrentItem(null);
            await setCurrentItems(null);
            setCurrentItems(fkdtRecommends);
            setCurrentItem(fkdtRecommends[0]);
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
          />
        ))}
      </ul>
    </div>
  );
};

export default Recommends;
