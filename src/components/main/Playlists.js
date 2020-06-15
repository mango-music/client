import React, { useEffect, useState } from 'react';
import PlaylistsEntry from './PlaylistsEntry';
import getUserMusicLists from '../../lib/apis/getUserMusicLists';
import '../../styles/Playlists.scss';

const Playlists = (props) => {
  const { setCurrentItems, setCurrentItem } = props;
  const [musicLists, setMusicLists] = useState(null);
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTFiZGZhNmE2NWIwMmUzNzc4MGI1YSIsImVtYWlsIjoic29jcmF0b25lQGdtYWlsLmNvbSIsImlhdCI6MTU5MjE4NzUzOSwiZXhwIjoxNTkyMTg5MzM5fQ.sseJQSR6PW8xlOivpkJrYymSPhkUAkJQl03vobnbjKQ';
  useEffect(() => {
    getUserMusicLists(token)
      .then((res) => {
        console.log('res.status : ', res.status);
        if (res.status === 200) return res.json();
        return null;
      })
      .then((json) => {
        console.log(json);
        if (json) setMusicLists(json);
        else console.log('사용자의 뮤직 리스트를 불러오지 못했습니다.');
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div id="playlists">
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
    </div>
  );
};

export default Playlists;
