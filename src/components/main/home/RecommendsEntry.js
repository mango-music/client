import React, { useState } from 'react';
import { Paper, Box } from '@material-ui/core';
import RecommendsDropDownMenu from './RecommendsDropDownMenu';
import '../../../styles/Recommends.scss';

const RecommendsEntry = (props) => {
  const {
    currentItems,
    setCurrentItems,
    setCurrentItem,
    setItemIndex,
    video,
    customLists,
    setCustomLists,
    videoIdRatings,
  } = props;

  const handleVideoPlay = async (video) => {
    // videoIdRatings에서 평가했던 음악이 있다면 rating을 넣어준다.
    let rating = null;
    if (videoIdRatings[video.videoid]) {
      rating = videoIdRatings[video.videoid];
    }
    const newCurrentItems = [...currentItems];
    // currentItems에 중복된 비디오가 있다면 삭제
    for (let i = 0; i < newCurrentItems.length; i++) {
      if (newCurrentItems[i].videoid === video.videoid) {
        newCurrentItems.splice(i, 1);
        await setCurrentItem(null); // currentItem을 변경하기 위해 초기화, 뮤직 플레이어를 조건 렌더링으로 바꾼 뒤 수정
        break;
      }
    }
    video.rating = rating;
    newCurrentItems.unshift(video);
    console.log('video : ', video);
    setCurrentItem(video);
    setCurrentItems(newCurrentItems);
    setItemIndex(0); // TODO: 셔플 버튼이 켜져 있을 때에도 통제할 수 있게 수정해야 한다.
  };

  return (
    <li className="home_list-recommended_item">
      <Paper
        elevation={3}
        onClick={(e) => {
          handleVideoPlay(video);
        }}
        className="home_list-recommended_item_thumbnail"
      >
        <img
          src={`http://img.youtube.com/vi/${video.videoid}/mqdefault.jpg`}
          alt={`${video.videoid}`}
        />
      </Paper>
      <Box className="home_list-recommended_item_title">
        <span>{video.title}</span>
      </Box>
    </li>
  );
};

export default RecommendsEntry;
