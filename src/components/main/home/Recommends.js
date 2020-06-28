import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { QueueMusic, AccountBox } from '@material-ui/icons';
import RecommendsEntry from './RecommendsEntry';
import getRecommendedMusic from '../../../lib/apis/getRecommendedMusic';
import Ranks from './Ranks';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
    '& h3': {
      fontSize: '1rem',
      marginLeft: '0.25rem',
      '& span': {
        fontSize: '1.125rem',
        fontWeight: 'bold',
        color: theme.palette.primary.main,
      },
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
    musicAverage,
    ratingPeople,
  } = props;
  const [recommends, setRecommends] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    console.log('추천 음악을 요청합니다.');
    getRecommendedMusic().then((data) => {
      if (Array.isArray(data)) {
        setRecommends(data);
      } else {
        console.log('추천 음악을 요청했지만 배열로 받지 못했습니다.');
      }
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
      musicAverage={musicAverage}
      ratingPeople={ratingPeople}
    />
  ));
  console.log(recommnendRanks);

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

  const handlePlayAllButtonClick = async (e) => {
    await setCurrentItem(null);
    await setCurrentItems([]);
    setCurrentItems(recommends);
    setCurrentItem(recommends[0]);
    setPlayerSize('big');
  };

  return (
    <>
      <Box component="header" className={classes.header}>
        <Typography variant="h3">
          <span>{nickname}</span>님을 위한 추천 음악
        </Typography>
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
      <Box
        component="ul"
        id="list-recommended"
        className="home_list-recommended"
      >
        {recommendMusics}
      </Box>
      <Box component="ul" id="list-rank" className="home_list-rank">
        {recommnendRanks}
      </Box>
    </>
  );
};

export default Recommends;
