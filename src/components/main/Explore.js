import React, { useState, useEffect } from 'react';
import SearchEntry from './ExploreEntry';
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
  } = props;
  const [querry, setQuerry] = useState('');
  const [searchItems, setSearchItems] = useState(null);

  useEffect(() => {
    const input = document.getElementById('search-text');
    input.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById('search-button').click();
      }
    });
  }, []);
  return (
    <div id="search">
      <MainHeader name={'Explore'} />
      <div id="search-form">
        <button
          id="search-button"
          onClick={() => {
            searchMusicsByQuerry(querry, 15)
              .then((res) => res.json())
              .then((json) => {
                console.log(json);
                setSearchItems(json.items);
              })
              .catch((err) => console.log(err));
          }}
        >
          <FontAwesomeIcon icon={faSearch} color="#afafaf" />
        </button>
        <input
          id="search-text"
          type="text"
          onChange={(e) => {
            setQuerry(e.target.value);
          }}
        />
      </div>
      <ul className="search-list">
        {searchItems &&
          searchItems.map((item) => {
            return (
              <SearchEntry
                thumbnail={item.snippet.thumbnails.medium.url}
                title={item.snippet.title}
                videoid={item.id.videoId}
                setCurrentItem={setCurrentItem}
                setCurrentItems={setCurrentItems}
                currentItems={currentItems}
                customLists={customLists}
                key={item.id.videoId}
                item={item}
                setCustomLists={setCustomLists}
                setItemIndex={setItemIndex}
              />
            );
          })}
      </ul>
    </div>
  );
};

export default Explore;