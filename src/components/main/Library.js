import React, { useState } from 'react';
import UserPlaylist from './UserPlaylist';
import UserPlaylistItems from './UserPlaylistItems';
import postMusiclist from '../../lib/apis/postMusiclist';
import {
  faPlusCircle,
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../styles/Library.scss';

import fkToken from '../../lib/fixtures/fkToken';

const Library = (props) => {
  const {
    setCurrentItems,
    setCurrentItem,
    customLists,
    setCustomLists,
  } = props;
  const [selectedList, setSelectedList] = useState(null);
  const [addButtonOn, setAddButtonOn] = useState(false);
  let addPlaylist;
  if (addButtonOn) {
    addPlaylist = (
      <React.Fragment>
        <div onClick={() => setAddButtonOn(false)}>
          <FontAwesomeIcon icon={faTimesCircle} color="#afafaf" />
        </div>
        <div
          onClick={() => {
            const text = document.getElementById('playlist-input').value;
            console.log('text : ', text);
            postMusiclist(text, customLists, setCustomLists, fkToken);
            setAddButtonOn(false);
          }}
        >
          <FontAwesomeIcon icon={faCheckCircle} color="#afafaf" />
        </div>
        <div>
          <input id="playlist-input" type="text" />
        </div>
      </React.Fragment>
    );
  } else {
    addPlaylist = (
      <React.Fragment>
        <div
          onClick={(e) => {
            // console.log('e : ', e);
            setAddButtonOn(true);
          }}
        >
          <FontAwesomeIcon icon={faPlusCircle} color="#afafaf" />
        </div>
        <div>
          <p>Add new playlist</p>
        </div>
      </React.Fragment>
    );
  }
  return (
    <div id="library">
      <header>Library</header>
      <ul>
        {customLists &&
          customLists.map((list) => {
            return (
              <UserPlaylist
                key={list._id}
                listName={list.listname}
                items={list.musics}
                setCurrentItems={setCurrentItems}
                setCurrentItem={setCurrentItem}
                setSelectedList={setSelectedList}
              />
            );
          })}
      </ul>
      <div id="add-playlist">{addPlaylist}</div>
      {selectedList && (
        <UserPlaylistItems
          selectedList={selectedList}
          setSelectedList={setSelectedList}
          customLists={customLists}
        />
      )}
    </div>
  );
};

export default Library;
