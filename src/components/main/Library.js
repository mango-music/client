import React, { useState, memo, useEffect } from 'react';
import UserPlaylist from './UserPlaylist';
import UserPlaylistItems from './UserPlaylistItems';
import UserPlaylistRated from './UserPlaylistRated';
import MainHeader from './MainHeader';
import postMusiclist from '../../lib/apis/postMusiclist';
import {
  faPlusCircle,
  faCheckCircle,
  faTimesCircle,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
      <React.Fragment>
        <div onClick={() => setAddButtonOn(false)}>
          <FontAwesomeIcon icon={faTimesCircle} color="#afafaf" />
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
          <FontAwesomeIcon icon={faCheckCircle} color="#afafaf" />
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
      </React.Fragment>
    );
  } else {
    addPlaylist = (
      <React.Fragment>
        <div
          onClick={(e) => {
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
      <MainHeader title={'Library'} nickname={nickname} />
      <ul>
        <li>
          <div className="list-img">
            {ratedMusics[0] && <img src={ratedMusics[0].thumbnail} />}
          </div>
          <div className="list-title">
            <p onClick={() => playVideos(ratedMusics)}>Rated Musics</p>
          </div>
          <div className="list-button">
            <button onClick={() => setRatedButtonOn(true)}>
              <FontAwesomeIcon icon={faAngleRight} color="#afafaf" />
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
          items={ratedMusics}
          videoIdRatings={videoIdRatings}
        />
      )}
    </div>
  );
};

export default memo(Library);
