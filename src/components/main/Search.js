import React, { useState } from 'react';
import SearchEntry from './SearchEntry';
import searchMusicsByQuerry from '../../lib/apis/searchMusicsByQuerry';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../styles/Search.scss';

const Search = (props) => {
  const { setCurrentItem, setCurrentItems } = props;
  const [querry, setQuerry] = useState('');
  const [searchItems, setSearchItems] = useState(null);
  return (
    <div id="search">
      <div id="search-form">
        <input
          type="text"
          onChange={(e) => {
            setQuerry(e.target.value);
          }}
        />
        <button
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
                videoId={item.id.videoId}
                setCurrentItem={setCurrentItem}
                setCurrentItems={setCurrentItems}
                key={item.id.videoId}
              />
            );
          })}
      </ul>
    </div>
  );
};

export default Search;
