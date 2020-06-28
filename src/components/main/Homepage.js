import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, IconButton, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { QueueMusic, Update } from '@material-ui/icons';
import getRecommendedPlaylist from '../../lib/apis/getRecommendedPlaylist';
import KpopMusicEntry from './home/KpopMusicEntry';
import Recommends from './home/Recommends';
import '../../styles/Homepage.scss';
import getUpdatedAt from '../../lib/utils/getUpdatedAt';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
    '& h3': {
      fontSize: '1rem',
      marginLeft: '0.25rem',
      fontWeight: 'bold',
    },
    '& button': {
      fontSize: '0.75rem',
      '& span': {
        display: 'inline-flex',
        alignItems: 'center',
      },
    },
  },
}));

const Homepage = (props) => {
  const classes = useStyles();
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
    musicAverage,
    ratingPeople,
  } = props;

  useEffect(() => {
    getRecommendedPlaylist(20)
      .then((res) => res.json())
      .then((data) => {
        setMusics(data.items);
      });
  }, []);

  const handlePlayAllButtonClick = async (e) => {
    await setCurrentItem(null);
    await setCurrentItems([]);
    setCurrentItems(kpopMusics);
    setCurrentItem(kpopMusics[0]);
    setPlayerSize('big');
  };

  const kpopMusics = [];
  const kpopMusiclist = musics.map((video) => {
    const { id, snippet } = video;
    const { title, resourceId, thumbnails } = snippet;
    const videoid = resourceId.videoId;
    kpopMusics.push({ id, title, videoid, thumbnail: thumbnails.high.url });

    return (
      <KpopMusicEntry
        key={videoid}
        video={{ id, title, videoid, thumbnail: thumbnails.high.url }}
        currentItems={currentItems}
        currentItem={currentItem}
        setCurrentItems={setCurrentItems}
        setCurrentItem={setCurrentItem}
        setItemIndex={setItemIndex}
        customLists={customLists}
        setCustomLists={setCustomLists}
        musicAverage={musicAverage}
        ratingPeople={ratingPeople}
      />
    );
  });

  return (
    <Box className={`player-brother-${playerSize} home`}>
      <Box className="home_updatedAt">
        <Update fontSize="small" />
        <span>{getUpdatedAt()} 업데이트 되었습니다.</span>
      </Box>
      <Box component="section">
        <Box component="header" className={classes.header}>
          <Typography variant="h3">실시간 인기 음악</Typography>
          <Button
            startIcon={<QueueMusic />}
            variant="contained"
            color="secondary"
            size="small"
            onClick={handlePlayAllButtonClick}
          >
            모두 재생
          </Button>
        </Box>
        <Box component="ul" id="list-popular" className="home_list-popular">
          {kpopMusiclist}
        </Box>
      </Box>
      <Box component="section">
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
          musicAverage={musicAverage}
          ratingPeople={ratingPeople}
        />
      </Box>
    </Box>
  );
};

export default Homepage;
