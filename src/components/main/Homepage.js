import React, { useState, useEffect } from 'react';
import getRecommendedPlaylist from '../../lib/apis/getRecommendedPlaylist';
import KpopMusicEntry from './home/KpopMusicEntry';
import '../../styles/Homepage.scss';
import Recommends from './home/Recommends';

import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    playerSize,
  } = props;
  useEffect(() => {
    getRecommendedPlaylist(10000)
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
    <div id="wrapper" className={`player-brother-${playerSize}`}>
      <div id="kpop">
        <div id="play-all-button">
          <button
            onClick={async () => {
              await setCurrentItem(null);
              await setCurrentItems([]);
              {
                console.log(kpopMusics);
              }
              setCurrentItems(kpopMusics);
              setCurrentItem(kpopMusics[0]);
              setPlayerSize('big');
            }}
          >
            Play All <FontAwesomeIcon icon={faPlay} color="#afafaf" />
          </button>
        </div>
        K-pop
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
