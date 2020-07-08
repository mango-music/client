import React, { useState, useEffect } from 'react';
import { Box, Paper } from '@material-ui/core';

const Musiclist = (props) => {
  const {
    currentItems,
    setCurrentItems,
    setCurrentItem,
    setItemIndex,
    video,
    customLists,
    setCustomLists,
  } = props;
  const { videoid } = video;

  const handleVideoPlay = async (video) => {
    const newCurrentItems = [...currentItems];
    // currentItems에 중복된 비디오가 있다면 삭제
    for (let i = 0; i < newCurrentItems.length; i++) {
      if (newCurrentItems[i].videoid === video.videoid) {
        newCurrentItems.splice(i, 1);
        await setCurrentItem(null); // currentItem을 변경하기 위해 초기화, 뮤직 플레이
        break;
      }
    }
    newCurrentItems.unshift(video);
    console.log('video : ', video);
    setCurrentItem(video);
    setCurrentItems(newCurrentItems);
    setItemIndex(0); // TODO: 셔플 버튼이 켜져 있을 때에도 통제할 수 있게 수정해야 한다
  };

  return (
    <li className="home_list-popular_item">
      <Paper
        elevation={3}
        onClick={(e) => {
          handleVideoPlay(video);
        }}
        className="home_list-popular_item_thumbnail"
      >
        <img
          src={`http://img.youtube.com/vi/${videoid}/mqdefault.jpg`}
          alt={`${videoid}`}
        />
      </Paper>
      <Box className="home_list-popular_item_title">
        <span>{video.title}</span>
      </Box>
    </li>
  );
};

export default Musiclist;
