import React, { memo } from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import Player from '../components/main/Player';
import Home from '../components/main/Home';
import Search from '../components/main/Search';
import Playlists from '../components/main/Playlists';
import Profile from '../components/main/Profile';
import NoMatch from '../components/auth/NoMatch';

const Main = memo(({ profile, handleLogout }) => {
  console.log(profile);
  if (!localStorage.getItem('x-access-token')) {
    localStorage.setItem('x-access-token', 'secret string');
    localStorage.setItem('x-refresh-token', 'secret string');
  }
  return (
    <>
      <Nav profile={profile} />
      <Player />
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
        <Route path={`/@${profile.id}/*`}>
          <NoMatch />
        </Route>
      </Switch>
    </>
  );
});

export default Main;
