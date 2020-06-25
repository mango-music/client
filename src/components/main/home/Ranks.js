import React, { useState, useEffect } from 'react';

const Ranks = (props) => {
  const {
    currentItems,
    setCurrentItems,
    setCurrentItem,
    setItemIndex,
    video,
    videoIdRatings,
    ranking,
  } = props;
  const { title, thumbnail } = video;
  const playVideo = async (video) => {
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
    <li>
      <div className="rank-number">
        <p className="recommends-ranking">{ranking}</p>
      </div>
      <div
        style={{
          backgroundImage: 'url(' + thumbnail + ')',
        }}
        className="rank-image"
      ></div>
      {/* <img className="recommends-rank-img" src={thumbnail} /> */}
      <div className="rank-title">
        <p
          className="recommends-rank-title pointer"
          onClick={() => {
            playVideo(video);
          }}
        >
          {title}
        </p>
      </div>
    </li>
  );
};

export default Ranks;
