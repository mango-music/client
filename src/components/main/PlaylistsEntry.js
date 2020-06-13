import React from 'react';

const PlaylistsEntry = (props) => {
  const { listName, musics, setCurrentItems, setCurrentItem } = props;
  console.log(musics);
  return (
    <div>
      <div
        onClick={() => {
          setCurrentItems(musics);
          setCurrentItem(musics[0]);
        }}
      >
        {listName}
      </div>
      <div>
        {musics.map((music) => {
          return <div key={music.videoid}>{music.title}</div>; // videoid -> videoId
        })}
      </div>
    </div>
  );
};

export default PlaylistsEntry;
