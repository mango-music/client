import React, { useEffect, useState } from 'react';
import PlaylistsEntry from './PlaylistsEntry';
import getUserMusicLists from '../../lib/apis/getUserMusicLists';

const Playlists = (props) => {
  const { setCurrentItems, setCurrentItem } = props;
  const [musicLists, setMusicLists] = useState(null);
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTFiZGZhNmE2NWIwMmUzNzc4MGI1YSIsImVtYWlsIjoic29jcmF0b25lQGdtYWlsLmNvbSIsImlhdCI6MTU5MjA3MTYyNSwiZXhwIjoxNTkyMDczNDI1fQ.BqmITU7w1mAALHlw4cMOEXn2WevwZ7AWlO9gqmRjVp8';
  useEffect(() => {
    getUserMusicLists(token)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setMusicLists(json);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <h3>Playlists</h3>
      <ul>
        {musicLists &&
          musicLists.map((list) => {
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
    </>
  );
};

export default Playlists;
