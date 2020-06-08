import React from 'react';
import Recommends from './Recommends';
import Playlists from './Playlists';

const Home = () => {
  return (
    <>
      <h2>Home</h2>
      <Recommends />
      <Playlists />
    </>
  );
};

export default Home;
