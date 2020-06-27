import React from 'react';
import { Paper, Box } from '@material-ui/core';
import noImage from '../../../images/no-image.png';

const Ranks = (props) => {
  const {
    currentItems,
    setCurrentItems,
    setCurrentItem,
    setItemIndex,
    video,
    videoIdRatings,
    ranking,
    musicAverage,
    ratingPeople,
  } = props;
  // const { title, thumbnail } = video;
  const averageMusicRating = musicAverage[video.videoid] // 에러방지 삼항 연산자
    ? musicAverage[video.videoid].toFixed(1)
    : null;
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
        await setCurrentItem(null); // currentItem을 변경하기 위해 초기화, 뮤직 플레이어를 조건 렌
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
    <Box
      component="li"
      onClick={(e) => {
        handleVideoPlay(video);
      }}
      className="home_list-rank_item"
    >
      <div className="home_list-rank_item_rank">
        <span>{ranking}</span>
      </div>
      <div className="home_list-rank_item_thumbnail">
        <img
          src={video.thumbnail ? video.thumbnail : noImage}
          alt="no-thumbnail"
        />
      </div>
      <div className="home_list-rank_item_title">
        <span>{video.title}</span>
        <span>{averageMusicRating}</span>
        <span>{ratingPeople[video.videoid]}</span>
      </div>
    </Box>
  );
};

export default Ranks;
