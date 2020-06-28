/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Container, Typography, Box } from '@material-ui/core';
// import { AccountCircle } from '@material-ui/icons';
import Signin from '../components/auth/Signin';
import Signup from '../components/auth/Signup';
import PasswordReset from '../components/auth/PasswordReset';
import RatingConsentScreen from '../components/rating/RatingConsentScreen';
import Rating from '../components/rating/Rating';
import Main from './Main'; // Nested routes
// import Landing from '../components/auth/Landing';
import Unauthorized from '../components/auth/Unauthorized';
import NoMatch from '../components/auth/NoMatch';
import ProfileButton from './ProfileButton';
import BackButton from './BackButton';
import '../styles/app.scss';
import usePageTitle from '../lib/utils/usePageTitle';

const App = ({ history, location }) => {
  const [isLogin, setLogin] = useState(false);
  const [profile, setProfile] = useState({});
  const [hasJustCreated, setJustCreated] = useState(false);
  // const [hasProfileUpdated, setProfileUpdated] = useState(false);

  const { pathname } = location;
  const { nickname } = profile;
  const title = usePageTitle(pathname, nickname);
  console.log(pathname, nickname, title);
  const callbackPath = useRef(null); // uncontrolled state (not for rendering)

  // Memorize these handler functions until [dependency state] updated
  const handleLogin = () => {
    const userinfo = JSON.parse(localStorage.getItem('x-user-info'));
    callbackPath.current = `/@${userinfo.nickname}`;
    console.log(callbackPath);
    setLogin(true);
    setProfile({
      email: userinfo.email,
      nickname: userinfo.nickname,
    });
  };

  const handleSignupSuccess = useCallback(() => {
    setJustCreated(true);
    handleLogin();
  }, [hasJustCreated]);

  const handleSigninSuccess = () => {
    handleLogin();
  };

  const handleLogout = useCallback(() => {
    setLogin(false);
    setProfile({});
    setJustCreated(false);
    callbackPath.current = null;
  }, [isLogin]);

  /*
    Effect will not run after the initial render.
    Thereafter, it depends on the array of values that should be observed.
    If it's empty, it will run after every render.
    Otherwise, it will run when one of it's values has changed.
  */
  useEffect(() => {
    console.log('Component did mount');
    if (localStorage.getItem('x-access-token')) {
      handleLogin();
    }
  }, []);

  useEffect(() => {
    // after useEffect with no dependency (did mount)
    if (isLogin) {
      console.log('Component did update');
      return history.push('/');
    }
  }, [isLogin]);

  return (
    <Container
      style={{ maxWidth: '100vw', minWidth: '360px' }}
      disableGutters
      className="app"
    >
      {pathname !== '/rating' && pathname !== '/rating_consent' ? (
        <Box component="header" className="app_header">
          {title === '내 계정' ? (
            <>
              <Box
                display="flex"
                style={{ alignItems: 'center', marginLeft: '12px' }}
              >
                <BackButton nickname={nickname} />
                <Typography variant="h2">{title}</Typography>
              </Box>
            </>
          ) : null}
          {pathname.includes(callbackPath.current) && title !== '내 계정' ? (
            <>
              <Typography variant="h2">{title}</Typography>
              <ProfileButton nickname={nickname} />
            </>
          ) : null}
          {title === '로그인' || title === '가입하기' ? (
            <Typography variant="h2">{title}</Typography>
          ) : null}
        </Box>
      ) : null}
      <Box
        component="main"
        className="app_main"
        style={pathname === callbackPath.current ? { paddingRight: 0 } : null}
      >
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              console.log('isLogin', isLogin, 'hasJustCreated', hasJustCreated);
              if (hasJustCreated) {
                return <Redirect to="/rating_consent" />;
              }
              if (isLogin) {
                return <Redirect to={callbackPath.current} />;
              }
              return <Redirect to="/signin" />;
            }}
          />
          <Route path="/signin">
            <Signin handleSigninSuccess={handleSigninSuccess} />
          </Route>
          <Route path="/signup">
            <Signup handleSignupSuccess={handleSignupSuccess} />
          </Route>
          <Route path="/rating_consent">
            <RatingConsentScreen nickname={nickname} />
          </Route>
          <Route path="/rating">
            <Rating callbackPath={callbackPath.current} nickname={nickname} />
          </Route>
          <Route
            path={callbackPath.current}
            render={() => {
              if (!localStorage.getItem('x-access-token')) {
                return <Unauthorized />;
              }
              return <Main profile={profile} handleLogout={handleLogout} />;
            }}
          />
          <Route path="/account/password_reset">
            <PasswordReset />
          </Route>
          <Route path="/*" component={NoMatch} />
        </Switch>
      </Box>
    </Container>
  );
};

export default withRouter(App);
