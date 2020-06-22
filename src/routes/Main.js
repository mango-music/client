import React, { memo, useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import MusicPlayer from '../components/main/MusicPlayer';
import Recommends from '../components/main/Recommends';
import Explore from '../components/main/Explore';
import Library from '../components/main/Library';
import Profile from '../components/main/Profile';
import NoMatch from '../components/auth/NoMatch';
import getUserMusicLists from '../lib/apis/getUserMusicLists';
import getRatingMusiclist from '../lib/apis/getRatingMusiclist';
import '../styles/ChangeWindowButton.scss';

const Main = memo(({ profile, handleLogout }) => {
  const [recommendedList, setRecommendedList] = useState([]); // [{music}]
  const [ratedMusics, setRatedMusics] = useState([]);
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
      // console.log('사용자가 평가한 데이터 : ', data);
      setRatedMusics(ratedMusics);
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

  useEffect(() => {
    console.log('이전에 재생한 큐를 불러옵니다.');
    let playedItems = localStorage.getItem('playedItems');
    if (Array.isArray(playedItems)) {
      playedItems = JSON.parse(playedItems);
      setCurrentItem(playedItems[0]);
      setCurrentItems(playedItems);
    }
  }, []);

  // 현재 재생 큐 저장
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

  return (
    <>
      <Nav nickname={profile.id} />
      <button
        id="change-window-button"
        type="button"
        onClick={changePlayerSize}
      >
        창전환
      </button>
      <MusicPlayer
        currentItems={currentItems}
        currentItem={currentItem}
        setCurrentItems={setCurrentItems}
        itemIndex={itemIndex}
        setItemIndex={setItemIndex}
        playerSize={playerSize}
      />
      <Switch>
        <Route exact path={`/@${profile.id}`}>
          <Recommends
            currentItems={currentItems}
            currentItem={currentItem}
            setCurrentItems={setCurrentItems}
            setCurrentItem={setCurrentItem}
            setItemIndex={setItemIndex}
            customLists={customLists}
            setCustomLists={setCustomLists}
            nickname={profile.id}
          />
        </Route>
        <Route path={`/@${profile.id}/explore`}>
          <Explore
            setCurrentItem={setCurrentItem}
            setCurrentItems={setCurrentItems}
            currentItems={currentItems}
            customLists={customLists}
            setCustomLists={setCustomLists}
            setItemIndex={setItemIndex}
            nickname={profile.id}
          />
        </Route>
        <Route path={`/@${profile.id}/library`}>
          <Library
            customLists={customLists}
            setCustomLists={setCustomLists}
            setCurrentItems={setCurrentItems}
            setCurrentItem={setCurrentItem}
            currentItems={currentItems}
            setItemIndex={setItemIndex}
            nickname={profile.id}
          />
        </Route>
        <Route path={`/@${profile.id}/rating`}>
          {/* 추가 평가하기 컴포넌트 요기요 */}
        </Route>
        <Route path={`/@${profile.id}/profile`}>
          <Profile profile={profile} handleLogout={handleLogout} />
        </Route>
        <Route path={`/@${profile.id}/player`}>
          <MusicPlayer />
        </Route>
        <Route path={`/@${profile.id}`}>
          <NoMatch />
        </Route>
      </Switch>
    </>
  );
});

export default Main;
