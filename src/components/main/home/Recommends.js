import React, { useState, useEffect } from 'react';
// import { faPlay } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RecommendsEntry from './RecommendsEntry';
import getRecommendedMusic from '../../../lib/apis/getRecommendedMusic';
import '../../../styles/Recommends.scss';
import Ranks from './Ranks';

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

  const recommnendRanks = recommends.map((video, index) => (
    <Ranks
      key={video.videoid}
      ranking={index + 1}
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
  ));

  const recommendMusics = recommends.map((video) => (
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
  ));
  return (
    <div id="recommends">
      <div className="recommends-title">
        <span>{nickname} 님이 좋아하실만한 음악이에요</span>
      </div>
      <div className="recommends-button">
        <span
          onClick={async () => {
            await setCurrentItem(null);
            await setCurrentItems([]);
            setCurrentItems(recommends);
            setCurrentItem(recommends[0]);
            setPlayerSize('big');
          }}
        >
          모두 듣기
        </span>
      </div>
      <div className="ranks">
        <span className="ranks-title">
          취향이 비슷한 유저가 추천해준 노래 Top 100
        </span>
        <ul className="ranks-list">{recommnendRanks}</ul>
      </div>
      <div className="recommends-musics">
        <ul className="recommend-list">{recommendMusics}</ul>
      </div>
    </div>
  );
};

export default Recommends;
