import React, { useState, useEffect } from 'react';
import ExploreEntry from './ExploreEntry';
import searchMusicsByQuerry from '../../lib/apis/searchMusicsByQuerry';
import MainHeader from './MainHeader';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../styles/Explore.scss';

const Explore = (props) => {
  const {
    currentItems,
    setCurrentItem,
    setCurrentItems,
    customLists,
    setCustomLists,
    setItemIndex,
    nickname,
    videoIdRatings,
    playerSize,
  } = props;
  const [querry, setQuerry] = useState('');
  const [searchItems, setSearchItems] = useState(null);

  useEffect(() => {
    let searchedItems = localStorage.getItem('searchedItems');
    if (searchedItems) {
      searchedItems = JSON.parse(searchedItems);
      if (Array.isArray(searchedItems)) {
        setSearchItems(searchedItems);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('searchedItems', JSON.stringify(searchItems));
  }, [searchItems]);

  const input = React.createRef();
  const searchButton = React.createRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    searchMusicsByQuerry(querry, 15)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setSearchItems(json.items);
      })
      .catch((err) => console.log(err));
  };

  if (playerSize === 'big') {
  }

  return (
    <div id="search" className={`player-brother-${playerSize}`}>
      <MainHeader title="Explore" nickname={nickname} />
      <form onSubmit={(e) => handleSubmit(e)}>
        <button ref={searchButton}>
          <FontAwesomeIcon icon={faSearch} color="#afafaf" />
        </button>
        <input
          type="text"
          ref={input}
          onChange={(e) => {
            setQuerry(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              e.preventDefault();
              searchButton.current.click();
            }
          }}
        />
      </form>
      <ul>
        {searchItems &&
          searchItems.map((item) => {
            return (
              <ExploreEntry
                setCurrentItem={setCurrentItem}
                setCurrentItems={setCurrentItems}
                currentItems={currentItems}
                customLists={customLists}
                key={item.id.videoId}
                item={item}
                setCustomLists={setCustomLists}
                setItemIndex={setItemIndex}
                videoIdRatings={videoIdRatings}
              />
            );
          })}
      </ul>
    </div>
  );
};

export default Explore;
