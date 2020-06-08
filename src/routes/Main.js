import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import MusicPlayer from '../components/main/MusicPlayer';
import Home from '../components/main/Home';
import Search from '../components/main/Search';
import Playlists from '../components/main/Playlists';
import Profile from '../components/main/Profile';
import fakeDataCurrentItem from '../lib/fixtures/fakeDataCurrentItem';
import fakeDataRecommended from '../lib/fixtures/fakeDataRecommended';

const Main = ({ profile }) => {
  console.log(profile);
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
        <Route path="/search">
          <Search />
        </Route>
        <Route path={`/@${profile.id}/playlists`}>
          <Playlists />
        </Route>
        <Route path={`/@${profile.id}/profile`}>
          <Profile profile={profile} />
        </Route>
        <Route path="/player"></Route>
      </Switch>
    </>
  );
};

export default Main;
