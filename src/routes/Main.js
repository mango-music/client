import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import Player from '../components/main/MusicPlayer';
import Home from '../components/main/Home';
import Search from '../components/main/Search';
import Playlists from '../components/main/Playlists';
import Profile from '../components/main/Profile';

const Main = ({ profile }) => {
  console.log(profile);
  return (
    <>
      <Nav profile={profile} />
      {/* <Player /> */}
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
        <Route path="/player">
          <Player />
        </Route>
      </Switch>
    </>
  );
};

export default Main;
