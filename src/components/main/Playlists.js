import React, { useEffect, useState } from 'react';
import PlaylistsEntry from './PlaylistsEntry';
import getUserMusicLists from '../../lib/apis/getUserMusicLists';
import '../../styles/Playlists.scss';

const Playlists = (props) => {
  const { setCurrentItems, setCurrentItem, customLists } = props;
  console.log('customLists : ', customLists);
  return (
    <div id="playlists">
      <h3>Library</h3>
      <ul>
        {customLists &&
          customLists.map((list) => {
            return (
              <PlaylistsEntry
                key={list._id}
                listName={list.listname}
                musics={list.musics}
                setCurrentItems={setCurrentItems}
                setCurrentItem={setCurrentItem}
              />
            );
          })}
      </ul>
    </div>
  );
};

export default Playlists;
