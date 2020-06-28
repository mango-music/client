import React, { useState, memo } from 'react';
import { Button } from '@material-ui/core';
import {
  AddCircleOutline,
  PlaylistAdd,
  CheckCircleOutline,
  HighlightOff,
  NavigateNext,
} from '@material-ui/icons';
import UserPlaylist from './UserPlaylist';
import UserPlaylistItems from './UserPlaylistItems';
import UserPlaylistRated from './UserPlaylistRated';
import postMusiclist from '../../lib/apis/postMusiclist';
import '../../styles/Library.scss';

const Library = (props) => {
  const {
    setCurrentItems,
    setCurrentItem,
    customLists,
    setCustomLists,
    currentItems,
    setItemIndex,
    nickname,
    ratedMusics,
    videoIdRatings,
    playerSize,
  } = props;
  const [selectedList, setSelectedList] = useState(null);
  const [addButtonOn, setAddButtonOn] = useState(false);
  const [ratedButtonOn, setRatedButtonOn] = useState(false);

  const input = React.createRef();
  const addButton = React.createRef();

  const playVideos = async (curruentVideos) => {
    await setCurrentItem(null);
    await setCurrentItems([]);
    const videos = [...curruentVideos];
    for (let i = 0; i < videos.length; i++) {
      const videoId = videos[i].videoid;
      if (videoIdRatings[videoId]) {
        const rating = videoIdRatings[videoId];
        videos[i].rating = rating;
      }
    }
    setCurrentItems(videos);
    setCurrentItem(videos[0]);
  };

  let addPlaylist;
  if (addButtonOn) {
    addPlaylist = (
      <>
        <div onClick={() => setAddButtonOn(false)}>
          <HighlightOff />
        </div>
        <div
          id="add-playlist-button"
          ref={addButton}
          onClick={() => {
            const text = input.current.value;
            console.log('text : ', text);
            postMusiclist(text, customLists, setCustomLists);
            setAddButtonOn(false);
          }}
        >
          <CheckCircleOutline />
        </div>
        <div>
          <input
            id="playlist-input"
            type="text"
            ref={input}
            onKeyUp={(event) => {
              if (event.keyCode === 13) {
                event.preventDefault();
                addButton.current.click();
              }
            }}
          />
        </div>
      </>
    );
  } else {
    addPlaylist = (
      <>
        <Button
          startIcon={<PlaylistAdd />}
          variant="outlined"
          color="secondary"
          size="large"
          fullWidth
          onClick={(e) => {
            setAddButtonOn(true);
          }}
        >
          재생 목록 만들기
        </Button>
        {/* <div
          onClick={(e) => {
            setAddButtonOn(true);
          }}
        >
          <PlaylistAdd fontSize="large" />
        </div>
        <div>
          <p>재생 목록 추가</p>
        </div> */}
      </>
    );
  }
  return (
    <div id="library" className={`player-brother-${playerSize}`}>
      <ul>
        <li>
          <div className="list-img">
            {ratedMusics[0] && <img src={ratedMusics[0].thumbnail} />}
          </div>
          <div className="list-title">
            <p onClick={() => playVideos(ratedMusics)}>내가 평가한 음악</p>
          </div>
          <div className="list-button">
            <button onClick={() => setRatedButtonOn(true)}>
              <NavigateNext />
            </button>
          </div>
        </li>
        {customLists &&
          customLists.map((list) => {
            return (
              <UserPlaylist
                key={list.listname}
                listName={list.listname}
                items={list.musics}
                setSelectedList={setSelectedList}
                playVideos={playVideos}
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
          setCustomLists={setCustomLists}
          currentItems={currentItems}
          setCurrentItem={setCurrentItem}
          setCurrentItems={setCurrentItems}
          setItemIndex={setItemIndex}
          videoIdRatings={videoIdRatings}
          playerSize={playerSize}
        />
      )}
      {ratedButtonOn && (
        <UserPlaylistRated
          setRatedButtonOn={setRatedButtonOn}
          // selectedList={selectedList}
          // setSelectedList={setSelectedList}
          // customLists={customLists}
          // setCustomLists={setCustomLists}
          currentItems={currentItems}
          setCurrentItem={setCurrentItem}
          setCurrentItems={setCurrentItems}
          setItemIndex={setItemIndex}
          videoIdRatings={videoIdRatings}
        />
      )}
    </div>
  );
};

export default memo(Library);
