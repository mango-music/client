import React, { useState, useEffect } from 'react';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MainHeader from './MainHeader';
import RecommendsEntry from './RecommendsEntry';
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
    nickname,
    videoIdRatings,
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

  const playVideos = async () => {
    await setCurrentItem(null);
    await setCurrentItems([]);
    const videos = [...recommends];
    for (let i = 0; i < videos.length; i++) {
      const videoId = videos[i].videoid;
      if (videoIdRatings[videoId]) {
        const rating = videoIdRatings[videoId];
        videos[i].rating = rating;
      }
    }
    setCurrentItems(videos);
    setCurrentItem(videos[0]);
  };

  return (
    <div id="recommends">
      <MainHeader title="Recommends" nickname={nickname} />
      <div id="play-all-button">
        <button onClick={playVideos}>
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
