import React, { useState, useEffect, useRef } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { ImageOutlined, Home } from '@material-ui/icons';
import Nav from './Nav';
import MusicPlayer from '../components/main/MusicPlayer';
import Recommends from '../components/main/home/Recommends';
import Explore from '../components/main/Explore';
import Library from '../components/main/Library';
import Profile from '../components/main/Profile';
import AdditionalRating from '../components/main/AdditionalRating';
import NoMatch from '../components/auth/NoMatch';
import getUserMusicLists from '../lib/apis/getUserMusicLists';
import getRatingMusiclist from '../lib/apis/getRatingMusiclist';
import '../styles/ChangeWindowButton.scss';
import Homepage from '../components/main/Homepage';

const Refresh = ({ path = '/' }) => (
  <Route
    path={path}
    component={({ history, location, match }) => {
      history.replace({
        ...location,
        pathname: location.pathname.substring(match.path.length),
      });
      return null;
    }}
  />
);

const Main = ({ profile, handleProfileUpdate, handleLogout }) => {
  const [recommendedList, setRecommendedList] = useState([]); // [{music}]
  const [ratedMusics, setRatedMusics] = useState([]); // 서버에서 받아오는 사용자 별점 데이터
  const [videoIdRatings, setVideoIdRatings] = useState({}); // 서버에서 받아온 별점 데이터를 객체에 담고 여기에 최신화를 시킨다.
  const [customLists, setCustomLists] = useState(null); // [{playlist}]
  const [currentItems, setCurrentItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [itemIndex, setItemIndex] = useState(0); // 배열의 몇 번째 음악을 재생하는지 알려주는 숫자
  const [playerSize, setPlayerSize] = useState('small');
  // const [nickname, setNickname] = useState(profile.nickname);

  // const profileRef = useRef({ ...profile });
  // const history = useHistory();

  useEffect(() => {
    console.log('사용자가 평가한 음악 리스트를 불러옵니다.');
    const token = localStorage.getItem('x-access-token');
    if (!token) return console.log('토큰이 없습니다.');
    getRatingMusiclist().then((data) => {
      console.log('사용자가 평가한 데이터 : ', data);
      setRatedMusics(data);
      // 사용자가 평가한 videoid를 객체에 담아둔다. { videoid: rating }
      const ratings = {};
      data.forEach((video) => {
        ratings[video.videoid] = video.rating;
      });
      setVideoIdRatings(ratings);
    });
  }, []);

  useEffect(() => {
    console.log('사용자의 뮤직리스트를 불러옵니다.');
    const token = localStorage.getItem('x-access-token');
    if (!token) return console.log('토큰이 없습니다.');
    getUserMusicLists(token)
      .then((json) => {
        console.log(json);
        if (json) setCustomLists(json);
        else console.log('사용자의 뮤직 리스트를 불러오지 못했습니다.');
      })
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   const stored_nickname = JSON.parse(localStorage.getItem('x-user-info'))
  //     .nickname;
  //   console.log('현재 닉네임', stored_nickname);
  //   if (stored_nickname !== nickname) {
  //     console.log('프로필 닉네임 변경을 인지하고 프로필 객체를 변경합니다.');
  //     profileRef.current.nickname = stored_nickname;
  //     // localStorage.setItem('x-user-info', JSON.stringify(profileRef.current));
  //     // setNickname(stored_nickname);
  //     history.push('/');
  //   }
  // }, [nickname]);

  // const handleNicknameUpdate = (string) => {
  //   console.log('닉네임 상태를 변경 합니다.');
  //   setNickname(string);
  // };

  // useEffect(() => {
  //   console.log('이전에 재생한 큐를 불러옵니다.');
  //   let playedItems = localStorage.getItem('playedItems');
  //   if (playedItems) {
  //     playedItems = JSON.parse(playedItems);
  //     if (Array.isArray(playedItems)) {
  //       setCurrentItem(playedItems[0]);
  //       setCurrentItems(playedItems);
  //     }
  //   }
  // }, []);

  // 현재 재생 큐 저장
  // useEffect(() => {
  //   console.log('현재 재생 큐를 저장합니다.');
  //   if (Array.isArray(currentItems)) {
  //     localStorage.setItem('playedItems', JSON.stringify(currentItems));
  //   }
  // }, [currentItems]);

  const changePlayerSize = () => {
    if (playerSize === 'big') {
      setPlayerSize('small');
    } else if (playerSize === 'small') {
      setPlayerSize('big');
    }
  };

  const { nickname } = profile;

  return (
    <>
      <Nav nickname={nickname} />
      {/* <button
        id="change-window-button"
        type="button"
        onClick={changePlayerSize}
      >
        창전환
      </button> */}
      <MusicPlayer
        currentItems={currentItems}
        currentItem={currentItem}
        setCurrentItems={setCurrentItems}
        itemIndex={itemIndex}
        setItemIndex={setItemIndex}
        playerSize={playerSize}
        changePlayerSize={changePlayerSize}
        videoIdRatings={videoIdRatings}
        setVideoIdRatings={setVideoIdRatings}
      />
      <Switch>
        <Route path="/*/reload" component={null} />
        <Route exact path={`/@${nickname}`}>
          {/* <h1>Hello world</h1> */}
          <Homepage
            currentItems={currentItems}
            currentItem={currentItem}
            setCurrentItems={setCurrentItems}
            setCurrentItem={setCurrentItem}
            setItemIndex={setItemIndex}
            customLists={customLists}
            setCustomLists={setCustomLists}
            nickname={nickname}
            videoIdRatings={videoIdRatings}
            setPlayerSize={setPlayerSize}
          />
        </Route>
        <Route path={`/@${nickname}/explore`}>
          <Explore
            setCurrentItem={setCurrentItem}
            setCurrentItems={setCurrentItems}
            currentItems={currentItems}
            customLists={customLists}
            setCustomLists={setCustomLists}
            setItemIndex={setItemIndex}
            nickname={nickname}
            videoIdRatings={videoIdRatings}
          />
        </Route>
        <Route path={`/@${nickname}/library`}>
          <Library
            customLists={customLists}
            setCustomLists={setCustomLists}
            setCurrentItems={setCurrentItems}
            setCurrentItem={setCurrentItem}
            currentItems={currentItems}
            setItemIndex={setItemIndex}
            nickname={nickname}
            ratedMusics={ratedMusics}
            videoIdRatings={videoIdRatings}
          />
        </Route>
        <Route path={`/@${nickname}/rating`}>
          <AdditionalRating
            nickname={nickname}
            videoIdRatings={videoIdRatings}
            setVideoIdRatings={setVideoIdRatings}
          />
        </Route>
        <Route path={`/@${nickname}/profile`}>
          <Profile
            profile={profile}
            handleProfileUpdate={handleProfileUpdate}
            handleLogout={handleLogout}
          />
        </Route>
        <Route path={`/@${nickname}/player`}>
          <MusicPlayer />
        </Route>
        <Refresh />
        <Route path={`/@${nickname}`} component={NoMatch} />
      </Switch>
    </>
  );
};

export default React.memo(Main);
