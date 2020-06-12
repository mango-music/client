import React, { memo, useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import MusicPlayer from '../components/main/MusicPlayer';
import Home from '../components/main/Home';
import Search from '../components/main/Search';
import Playlists from '../components/main/Playlists';
import Profile from '../components/main/Profile';
import NoMatch from '../components/auth/NoMatch';
import fkdtCurrentItem from '../lib/fixtures/fkdtCurrentItem';
import fkdtCurrentItems from '../lib/fixtures/fkdtCurrentItems';

const Main = memo(({ profile, handleLogout }) => {
  const [recommendedList, setRecommendedList] = useState([]); // [{music}]
  const [customLists, setCustomLists] = useState([]); // [{playlist}]
  const [currentItems, setCurrentItems] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [query, setQuery] = useState('');
  const [queryResult, setQueryResult] = useState([]); // [{music}]
  const [isPlayerMinimized, setPlayerMinimized] = useState(true);

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
          />
        </Route>
        <Route path={`/@${profile.id}/library`}>
          <Playlists />
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
