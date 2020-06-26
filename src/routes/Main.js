/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ImageOutlined, Home } from '@material-ui/icons';
import Nav from './Nav';
import MusicPlayer from '../components/main/MusicPlayer';
import Explore from '../components/main/Explore';
import Library from '../components/main/Library';
import Profile from '../components/main/Profile';
import AdditionalRating from '../components/main/AdditionalRating';
import NoMatch from '../components/auth/NoMatch';
import getUserMusicLists from '../lib/apis/getUserMusicLists';
import getRatingMusiclist from '../lib/apis/getRatingMusiclist';
import Homepage from '../components/main/Homepage';

const Main = ({ profile, handleLogout }) => {
  const [recommendedList, setRecommendedList] = useState([]); // [{music}]
  const [ratedMusics, setRatedMusics] = useState([]); // 서버에서 받아오는 사용자 별점 데이터
  const [videoIdRatings, setVideoIdRatings] = useState({}); // 서버에서 받아온 별점 데이터를 객체에 담고 여기에 최신화를 시킨다.
  const [customLists, setCustomLists] = useState(null); // [{playlist}]
  const [currentItems, setCurrentItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [itemIndex, setItemIndex] = useState(0); // 배열의 몇 번째 음악을 재생하는지 알려주는 숫자
  const [playerSize, setPlayerSize] = useState('small');

  useEffect(() => {
    console.log('사용자가 평가한 음악 리스트를 불러옵니다.');
    const token = localStorage.getItem('x-access-token');
    if (!token) return console.log('토큰이 없습니다.');
    getRatingMusiclist().then((items) => {
      try {
        const newItems = [...items];
        newItems.reverse();
        setRatedMusics(newItems);
        console.log('사용자가 평가한 데이터 : ', newItems);
        // 사용자가 평가한 videoid를 객체에 담아둔다. { videoid: rating }
        const ratings = {};
        newItems.forEach((video) => {
          ratings[video.videoid] = video.rating;
        });
        setVideoIdRatings(ratings);
      } catch (error) {
        console.error(
          '사용자가 평가한 음악 리스트를 불러오고 객체로 처리하는 과정에서 오류가 발생했습니다.',
          error,
        );
      }
    });
  }, []);

  useEffect(() => {
    console.log('사용자의 뮤직리스트를 불러옵니다.');
    const token = localStorage.getItem('x-access-token');
    if (!token) return console.log('토큰이 없습니다.');
    getUserMusicLists(token)
      .then((json) => {
        console.log(json);
        if (json) {
          json.reverse();
          setCustomLists(json);
        } else {
          console.log('사용자의 뮤직 리스트를 불러오지 못했습니다.');
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   console.log('이전에 재생한 큐를 불러옵니다.');
  //   let playedItems = localStorage.getItem('playedItems');
  //   if (playedItems) {
  //     playedItems = JSON.parse(playedItems);
  //     if (Array.isArray(playedItems)) {
  //       setCurrentItem(playedItems[0]);
  //       setCurrentItems(playedItems);
  //     }
  //   }
  // }, []);

  useEffect(() => {
    console.log('현재 재생 큐를 저장합니다.');
    if (Array.isArray(currentItems)) {
      localStorage.setItem('playedItems', JSON.stringify(currentItems));
    }
  }, [currentItems]);

  const changePlayerSize = () => {
    if (playerSize === 'big') {
      setPlayerSize('small');
    } else if (playerSize === 'small') {
      setPlayerSize('big');
    }
  };

  const { nickname } = profile;

  return (
    <>
      <Nav nickname={nickname} playerSize={playerSize} />
      <MusicPlayer
        currentItems={currentItems}
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
        setCurrentItems={setCurrentItems}
        itemIndex={itemIndex}
        setItemIndex={setItemIndex}
        playerSize={playerSize}
        changePlayerSize={changePlayerSize}
        videoIdRatings={videoIdRatings}
        setVideoIdRatings={setVideoIdRatings}
        customLists={customLists}
        setCustomLists={setCustomLists}
      />
      <Switch>
        <Route exact path={`/@${nickname}`}>
          {/* <h1>Hello world</h1> */}
          <Homepage
            currentItems={currentItems}
            currentItem={currentItem}
            setCurrentItems={setCurrentItems}
            setCurrentItem={setCurrentItem}
            setItemIndex={setItemIndex}
            customLists={customLists}
            setCustomLists={setCustomLists}
            nickname={nickname}
            videoIdRatings={videoIdRatings}
            setPlayerSize={setPlayerSize}
            playerSize={playerSize}
          />
        </Route>
        <Route path={`/@${nickname}/explore`}>
          <Explore
            setCurrentItem={setCurrentItem}
            setCurrentItems={setCurrentItems}
            currentItems={currentItems}
            customLists={customLists}
            setCustomLists={setCustomLists}
            setItemIndex={setItemIndex}
            nickname={nickname}
            videoIdRatings={videoIdRatings}
            playerSize={playerSize}
          />
        </Route>
        <Route path={`/@${nickname}/library`}>
          <Library
            customLists={customLists}
            setCustomLists={setCustomLists}
            setCurrentItems={setCurrentItems}
            setCurrentItem={setCurrentItem}
            currentItems={currentItems}
            setItemIndex={setItemIndex}
            nickname={nickname}
            ratedMusics={ratedMusics}
            videoIdRatings={videoIdRatings}
            playerSize={playerSize}
          />
        </Route>
        <Route path={`/@${nickname}/rating`}>
          <AdditionalRating
            nickname={nickname}
            videoIdRatings={videoIdRatings}
            setVideoIdRatings={setVideoIdRatings}
            playerSize={playerSize}
          />
        </Route>
        <Route path={`/@${nickname}/profile`}>
          <Profile profile={profile} handleLogout={handleLogout} />
        </Route>
        <Route path={`/@${nickname}/player`}>
          <MusicPlayer />
        </Route>
        <Route path={`/@${nickname}`} component={NoMatch} />
      </Switch>
    </>
  );
};

export default React.memo(Main);
