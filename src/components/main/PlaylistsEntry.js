import React from 'react';

const PlaylistsEntry = (props) => {
  const { listName, musics, setCurrentItems, setCurrentItem } = props;
  console.log('musics : ', musics);
  return (
    <li>
      <div
        onClick={() => {
          setCurrentItems(musics);
          setCurrentItem(musics[0]);
        }}
      >
        {listName}
      </div>
      <div className="musics">
        {musics &&
          musics.map((music) => {
            return <div key={music.videoid}>{music.title}</div>; // videoid -> videoId
          })}
      </div>
    </li>
  );
};

export default PlaylistsEntry;
