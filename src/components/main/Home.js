import React from 'react';
import Recommends from './Recommends';
// import Playlists from './Playlists';

const Home = (props) => {
  const {
    currentItems,
    currentItem,
    setCurrentItems,
    setCurrentItem,
    setItemIndex,
  } = props;
  return (
    <>
      <ul>
        <Recommends
          currentItems={currentItems}
          currentItem={currentItem}
          setCurrentItems={setCurrentItems}
          setCurrentItem={setCurrentItem}
          setItemIndex={setItemIndex}
        />
      </ul>
    </>
  );
};

export default Home;
