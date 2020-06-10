import React, { memo, useState } from 'react';
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
          document
            .getElementById('player-selector')
            .classList.toggle('big-player');
          document
            .getElementById('player-selector')
            .classList.toggle('small-player');
          document
            .getElementById('music-nav-bar')
            .classList.toggle('music-nav-bar');
          document
            .getElementById('music-nav-bar')
            .classList.toggle('music-nav-bar-none');
        }}
        id="change-window-button"
      >
        창 전환 버튼
      </button>
      <MusicPlayer
        currentItems={fkdtCurrentItems}
        currentItem={fkdtCurrentItem}
      />
      <Switch>
        <Route exact path={`/@${profile.id}`}>
          <Home />
        </Route>
        <Route path={`/@${profile.id}/explore`}>
          <Search />
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
