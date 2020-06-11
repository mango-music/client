import React from 'react';
import Recommends from './Recommends';
// import Playlists from './Playlists';

const Home = () => {
  return (
    <>
      <h2>Recommended for you</h2>
      <ul>
        <Recommends />
      </ul>
    </>
  );
};

export default Home;
