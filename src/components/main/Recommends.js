import React, { useState, useEffect } from 'react';
import MainHeader from './MainHeader';
import RecommendsEntry from './RecommendsEntry';
import '../../styles/Recommends.scss';
import fkdtRecommends from '../../lib/fixtures/fkdtRecommends';

const Recommends = (props) => {
  const {
    currentItems,
    currentItem,
    setCurrentItems,
    setCurrentItem,
    setItemIndex,
  } = props;
  const [recommends, setRecommends] = useState([]);
  // 추천 리스트 요청
  useEffect(() => {
    setRecommends(fkdtRecommends);
  });

  return (
    <div id="recommends">
      <MainHeader name={'Recommends'} />
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
          />
        ))}
      </ul>
    </div>
  );
};

export default Recommends;
