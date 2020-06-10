import React, { memo, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import MusicPlayer from '../components/main/MusicPlayer';
import Home from '../components/main/Home';
import Search from '../components/main/Search';
import Playlists from '../components/main/Playlists';
import Profile from '../components/main/Profile';
import NoMatch from '../components/auth/NoMatch';
import fakeDataCurrentItem from '../lib/fixtures/fakeDataCurrentItem';
import fakeDataRecommended from '../lib/fixtures/fakeDataRecommended';

const Main = memo(({ profile, handleLogout }) => {
  console.log(profile);
  if (!localStorage.getItem('x-access-token')) {
    localStorage.setItem('x-access-token', 'secret string');
    localStorage.setItem('x-refresh-token', 'secret string');
  }
  return (
    <>
      <Nav profile={profile} />
      <button
        onClick={() => {
          document
            .getElementById('player-selector')
            .classList.toggle('big-player');
          document
            .getElementById('player-selector')
            .classList.toggle('small-player');
        }}
      >
        창 전환 버튼
      </button>
      <MusicPlayer
        currentItems={fakeDataRecommended.items}
        currentItem={fakeDataCurrentItem}
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
          <Player />
        </Route>
        <Route path={`/@${profile.id}`}>
          <NoMatch />
        </Route>
      </Switch>
    </>
  );
});

export default Main;
