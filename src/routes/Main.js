import React, { memo, useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import MusicPlayer from '../components/main/MusicPlayer';
import Home from '../components/main/Home';
import Search from '../components/main/Search';
import Library from '../components/main/Library';
import Profile from '../components/main/Profile';
import NoMatch from '../components/auth/NoMatch';
import getUserMusicLists from '../lib/apis/getUserMusicLists';
import fkdtCurrentItem from '../lib/fixtures/fkdtCurrentItem';
import fkdtCurrentItems from '../lib/fixtures/fkdtCurrentItems';
import fkToken from '../lib/fixtures/fkToken';

const Main = memo(({ profile, handleLogout }) => {
  const [recommendedList, setRecommendedList] = useState([]); // [{music}]
  const [customLists, setCustomLists] = useState(null); // [{playlist}]
  const [currentItems, setCurrentItems] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [itemIndex, setItemIndex] = useState(0); // 배열의 몇 번째 음악을 재생하는지 알려주는 숫자
  const [query, setQuery] = useState('');
  const [queryResult, setQueryResult] = useState([]); // [{music}]
  const [isPlayerMinimized, setPlayerMinimized] = useState(true);

  useEffect(() => {
    getUserMusicLists(fkToken)
      .then((res) => {
        console.log('res.status : ', res.status);
        if (res.status === 200) return res.json();
        return null;
      })
      .then((json) => {
        console.log(json);
        if (json) setCustomLists(json);
        else console.log('사용자의 뮤직 리스트를 불러오지 못했습니다.');
      })
      .catch((err) => console.log(err));
  }, []);

  function getCurrentItem(item) {
    setCurrentItem(item);
  }
  function getCurrentItems(items) {
    setCurrentItems(items);
  }
  // temporyary: 재생 List를 클릭했을 때
  useEffect(() => {
    getCurrentItem(fkdtCurrentItem);
    getCurrentItems(fkdtCurrentItems);
  }, []);

  console.log(profile);
  if (!localStorage.getItem('x-access-token')) {
    localStorage.setItem('x-access-token', 'secret string');
    localStorage.setItem('x-refresh-token', 'secret string');
  }
  return (
    <>
      <Nav profile={profile} />
      <button
        type="button"
        onClick={() => {
          const playerSelector = document.getElementById('player-selector');
          const musicNavBar = document.getElementById('music-nav-bar');
          if (playerSelector && musicNavBar) {
            playerSelector.classList.toggle('big-player');
            playerSelector.classList.toggle('small-player');
            musicNavBar.classList.toggle('music-nav-bar');
            musicNavBar.classList.toggle('music-nav-bar-none');
          }
        }}
        id="change-window-button"
      >
        창 전환 버튼
      </button>
      <MusicPlayer
        currentItems={currentItems}
        currentItem={currentItem}
        setCurrentItems={setCurrentItems}
        itemIndex={itemIndex}
        setItemIndex={setItemIndex}
      />
      <Switch>
        <Route exact path={`/@${profile.id}`}>
          <Home />
        </Route>
        <Route path={`/@${profile.id}/explore`}>
          <Search
            setCurrentItem={setCurrentItem}
            setCurrentItems={setCurrentItems}
            currentItems={currentItems}
            customLists={customLists}
            setCustomLists={setCustomLists}
            setItemIndex={setItemIndex}
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
          />
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
