import React, { memo, useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import MusicPlayer from '../components/main/MusicPlayer';
import Recommends from '../components/main/Recommends';
import Explore from '../components/main/Explore';
import Library from '../components/main/Library';
import Profile from '../components/main/Profile';
import AdditionalRating from '../components/main/AdditionalRating';
import NoMatch from '../components/auth/NoMatch';
import getUserMusicLists from '../lib/apis/getUserMusicLists';
import getRatingMusiclist from '../lib/apis/getRatingMusiclist';
import '../styles/ChangeWindowButton.scss';

const Main = memo(({ profile, handleLogout }) => {
  const [recommendedList, setRecommendedList] = useState([]); // [{music}]
  const [ratedMusics, setRatedMusics] = useState([]);
  const [videoIdRatings, setVideoIdRatings] = useState({});
  const [customLists, setCustomLists] = useState(null); // [{playlist}]
  const [currentItems, setCurrentItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [itemIndex, setItemIndex] = useState(0); // 배열의 몇 번째 음악을 재생하는지 알려주는 숫자
  const [playerSize, setPlayerSize] = useState('small');

  useEffect(() => {
    console.log('사용자가 평가한 음악 리스트를 불러옵니다.');
    const token = localStorage.getItem('x-access-token');
    if (!token) return console.log('토큰이 없습니다.');
    getRatingMusiclist().then((data) => {
      console.log('사용자가 평가한 데이터 : ', data);
      setRatedMusics(data);
      // 사용자가 평가한 videoid를 객체에 담아둔다. { videoid(wefwfwef): rating(3.5) }
      const ratings = {};
      data.forEach((video) => {
        ratings[video.videoid] = video.rating;
      });
      setVideoIdRatings(ratings);
    });
  }, []);

  useEffect(() => {
    console.log('사용자의 뮤직리스트를 불러옵니다.');
    const token = localStorage.getItem('x-access-token');
    if (!token) return console.log('토큰이 없습니다.');
    getUserMusicLists(token)
      .then((json) => {
        console.log(json);
        if (json) setCustomLists(json);
        else console.log('사용자의 뮤직 리스트를 불러오지 못했습니다.');
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

  // 현재 재생 큐 저장
  // useEffect(() => {
  //   console.log('현재 재생 큐를 저장합니다.');
  //   if (Array.isArray(currentItems)) {
  //     localStorage.setItem('playedItems', JSON.stringify(currentItems));
  //   }
  // }, [currentItems]);

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
      <Nav nickname={nickname} />
      {/* <button
        id="change-window-button"
        type="button"
        onClick={changePlayerSize}
      >
        창전환
      </button> */}
      <MusicPlayer
        currentItems={currentItems}
        currentItem={currentItem}
        setCurrentItems={setCurrentItems}
        itemIndex={itemIndex}
        setItemIndex={setItemIndex}
        playerSize={playerSize}
        changePlayerSize={changePlayerSize}
      />
      <Switch>
        <Route exact path={`/@${nickname}`}>
          <Recommends
            currentItems={currentItems}
            currentItem={currentItem}
            setCurrentItems={setCurrentItems}
            setCurrentItem={setCurrentItem}
            setItemIndex={setItemIndex}
            customLists={customLists}
            setCustomLists={setCustomLists}
            nickname={nickname}
            videoIdRatings={videoIdRatings}
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
            nickname={profile.id}
            videoIdRatings={videoIdRatings}
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
            nickname={profile.id}
            ratedMusics={ratedMusics}
            videoIdRatings={videoIdRatings}
          />
        </Route>
        <Route path={`/@${nickname}/rating`}>
          <AdditionalRating
            nickname={nickname}
            videoIdRatings={videoIdRatings}
            setVideoIdRatings={setVideoIdRatings}
          />
        </Route>
        <Route path={`/@${nickname}/profile`}>
          <Profile profile={profile} handleLogout={handleLogout} />
        </Route>
        <Route path={`/@${nickname}/player`}>
          <MusicPlayer />
        </Route>
        <Route path="/*" component={NoMatch} />
      </Switch>
    </>
  );
});

export default Main;
