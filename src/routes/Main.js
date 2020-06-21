import React, { memo, useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import MusicPlayer from '../components/main/MusicPlayer';
import Home from '../components/main/Home';
import Explore from '../components/main/Explore';
import Library from '../components/main/Library';
import Profile from '../components/main/Profile';
import NoMatch from '../components/auth/NoMatch';
import getUserMusicLists from '../lib/apis/getUserMusicLists';
import fkdtCurrentItem from '../lib/fixtures/fkdtCurrentItem';
import fkdtCurrentItems from '../lib/fixtures/fkdtCurrentItems';
import '../styles/ChangeWindowButton.scss';

const Main = memo(({ profile, handleLogout }) => {
  const [recommendedList, setRecommendedList] = useState([]); // [{music}]
  const [customLists, setCustomLists] = useState(null); // [{playlist}]
  const [currentItems, setCurrentItems] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [itemIndex, setItemIndex] = useState(0); // 배열의 몇 번째 음악을 재생하는지 알려주는 숫자
  // const [query, setQuery] = useState('');
  // const [queryResult, setQueryResult] = useState([]); // [{music}]
  const [playerSize, setPlayerSize] = useState('small');

  // 사용자의 뮤직 리스트를 불러온다.
  useEffect(() => {
    const token = localStorage.getItem('x-access-token');
    if (!token) return console.log('토큰이 없습니다.');
    getUserMusicLists(token)
      // .then((res) => {
      // console.log('res.status : ', res.status);
      // if (res.status === 200) return res.json();
      // return null;
      // })
      .then((json) => {
        console.log(json);
        if (json) setCustomLists(json);
        else console.log('사용자의 뮤직 리스트를 불러오지 못했습니다.');
      })
      .catch((err) => console.log(err));
  }, []);

  // TODO: 처음에 페이크 데이터를 플레이어에 로딩한다. localStorage로 바꿔야한다.
  useEffect(() => {
    setCurrentItem(fkdtCurrentItem);
    setCurrentItems(fkdtCurrentItems);
  }, []);

  const changePlayerSize = () => {
    if (playerSize === 'big') {
      setPlayerSize('small');
    } else if (playerSize === 'small') {
      setPlayerSize('big');
    }
  };

  return (
    <>
      <Nav nickname={profile.id} />
      <button
        id="change-window-button"
        type="button"
        onClick={changePlayerSize}
      >
        창전환
      </button>
      <MusicPlayer
        currentItems={currentItems}
        currentItem={currentItem}
        setCurrentItems={setCurrentItems}
        itemIndex={itemIndex}
        setItemIndex={setItemIndex}
        playerSize={playerSize}
      />
      <Switch>
        <Route exact path={`/@${profile.id}`}>
          <Home
            currentItems={currentItems}
            currentItem={currentItem}
            setCurrentItems={setCurrentItems}
            setCurrentItem={setCurrentItem}
            setItemIndex={setItemIndex}
          />
        </Route>
        <Route path={`/@${profile.id}/explore`}>
          <Explore
            setCurrentItem={setCurrentItem}
            setCurrentItems={setCurrentItems}
            currentItems={currentItems}
            customLists={customLists}
            setCustomLists={setCustomLists}
            setItemIndex={setItemIndex}
          />
        </Route>
        <Route path={`/@${profile.id}/library`}>
          <Library
            customLists={customLists}
            setCustomLists={setCustomLists}
            setCurrentItems={setCurrentItems}
            setCurrentItem={setCurrentItem}
            currentItems={currentItems}
            setItemIndex={setItemIndex}
          />
        </Route>
        <Route path={`/@${profile.id}/profile`}>
          <Profile profile={profile} handleLogout={handleLogout} />
        </Route>
        <Route path={`/@${profile.id}/player`}>
          <MusicPlayer />
        </Route>
        <Route path={`/@${profile.id}`}>
          <NoMatch />
        </Route>
      </Switch>
    </>
  );
});

export default Main;
