import React, { useState, useEffect } from 'react';
import getRecommendedPlaylist from '../../lib/apis/getRecommendedPlaylist';
import KpopMusicEntry from './home/KpopMusicEntry';
import '../../styles/Homepage.scss';
import './home/Recommends';
import Recommends from './home/Recommends';
import MainHeader from './MainHeader';
const Homepage = (props) => {
  const [musics, setMusics] = useState([]);
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
  useEffect(() => {
    getRecommendedPlaylist(20)
      .then((res) => res.json())
      .then((data) => {
        setMusics(data.items);
      });
  }, []);
  const kpopMusics = [];
  const kpopMusiclist = musics.map((video) => {
    const { id, snippet } = video;
    const { title, resourceId, thumbnails } = snippet;
    const videoid = resourceId.videoId;
    kpopMusics.push({ id, title, videoid, thumbnail: thumbnails.default.url });

    return (
      <KpopMusicEntry
        key={videoid}
        video={{ id, title, videoid, thumbnail: thumbnails.default.url }}
        currentItems={currentItems}
        currentItem={currentItem}
        setCurrentItems={setCurrentItems}
        setCurrentItem={setCurrentItem}
        setItemIndex={setItemIndex}
        customLists={customLists}
        setCustomLists={setCustomLists}
      />
    );
  });
  // const rankMusic = musics.map((music, index) => (
  // <Ranks music={music} ranking={index} />
  // ));
  return (
    <div id="wrapper">
      <MainHeader nickname={nickname} />
      <div id="kpop">
        <div className="kpop-title">
          <span>K-pop top 20</span>
        </div>
        <div className="kpop-button">
          <span
            onClick={async () => {
              await setCurrentItem(null);
              await setCurrentItems([]);
              setCurrentItems(kpopMusics);
              setCurrentItem(kpopMusics[0]);
              setPlayerSize('big');
            }}
          >
            모두 듣기
          </span>
        </div>
        <ul className="list">{kpopMusiclist}</ul>
      </div>
      <Recommends
        currentItems={currentItems}
        currentItem={currentItem}
        setCurrentItems={setCurrentItems}
        setCurrentItem={setCurrentItem}
        setItemIndex={setItemIndex}
        customLists={customLists}
        setCustomLists={setCustomLists}
        nickname={nickname}
        setPlayerSize={setPlayerSize}
        videoIdRatings={videoIdRatings}
      />
    </div>
  );
};

export default Homepage;
