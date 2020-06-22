import React, { useState, useEffect } from 'react';
import MainHeader from './MainHeader';
import RecommendsEntry from './RecommendsEntry';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getRecommendedMusic from '../../lib/apis/getRecommendedMusic';
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

  useEffect(() => {
    console.log('추천 재생 리스트를 불러옵니다.');
    getRecommendedMusic().then((data) => {
      console.log('추천 재생 리스트의 데이터 : ', data);
      // setRecommends(data);
    });
    setRecommends(fkdtRecommends); // 이거 대신 위로 바꿔야 함
  }, []);

  return (
    <div id="recommends">
      <MainHeader name={'Recommends'} />
      <div id="play-all-button">
        <button
          onClick={async () => {
            await setCurrentItem(null);
            await setCurrentItems([]);
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
