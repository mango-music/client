import React, { useState, useEffect } from 'react';
import SearchEntry from './SearchEntry';
import searchMusicsByQuerry from '../../lib/apis/searchMusicsByQuerry';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../styles/Search.scss';

const Search = (props) => {
  const { currentItems, setCurrentItem, setCurrentItems } = props;
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
      <div id="search-form">
        <input
          id="search-text"
          type="text"
          onChange={(e) => {
            setQuerry(e.target.value);
          }}
        />
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
      </div>
      <ul className="search-list">
        {searchItems &&
          searchItems.map((item) => {
            return (
              <SearchEntry
                thumbnail={item.snippet.thumbnails.medium.url}
                title={item.snippet.title}
                videoid={item.id.videoid}
                setCurrentItem={setCurrentItem}
                setCurrentItems={setCurrentItems}
                currentItems={currentItems}
                key={item.id.videoid}
              />
            );
          })}
      </ul>
    </div>
  );
};

export default Search;
