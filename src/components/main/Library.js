import React, { useEffect, useState } from 'react';
import LibraryList from './LibraryList';
import LibraryListItems from './LibraryListItems';
import postMusiclist from '../../lib/apis/postMusiclist';
import getUserMusicLists from '../../lib/apis/getUserMusicLists';
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
  const [libraryList, setLibraryList] = useState(null);
  const [isClickedAdd, setIsClickedAdd] = useState(false);
  let addPlaylist;
  if (isClickedAdd) {
    addPlaylist = (
      <React.Fragment>
        <div onClick={() => setIsClickedAdd(false)}>
          <FontAwesomeIcon icon={faTimesCircle} color="#afafaf" />
        </div>
        <div
          onClick={() => {
            const text = document.getElementById('library-add-input').value;
            console.log('text : ', text);
            postMusiclist(text, customLists, setCustomLists, fkToken);
            setIsClickedAdd(false);
          }}
        >
          <FontAwesomeIcon icon={faCheckCircle} color="#afafaf" />
        </div>
        <div>
          <input id="library-add-input" type="text" />
        </div>
      </React.Fragment>
    );
  } else {
    addPlaylist = (
      <React.Fragment>
        <div
          onClick={(e) => {
            // console.log('e : ', e);
            setIsClickedAdd(true);
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
              <LibraryList
                key={list._id}
                listName={list.listname}
                items={list.musics}
                setCurrentItems={setCurrentItems}
                setCurrentItem={setCurrentItem}
                setLibraryList={setLibraryList}
              />
            );
          })}
      </ul>
      <div id="library-add-playlist">{addPlaylist}</div>
      {libraryList && (
        <LibraryListItems
          libraryList={libraryList}
          setLibraryList={setLibraryList}
          customLists={customLists}
        />
      )}
    </div>
  );
};

export default Library;
