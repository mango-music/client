/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Container, Typography, Box } from '@material-ui/core';
import Signin from '../components/auth/Signin';
import Signup from '../components/auth/Signup';
import PasswordReset from '../components/auth/PasswordReset';
import RatingConsentScreen from '../components/rating/RatingConsentScreen';
import Rating from '../components/rating/Rating';
import Main from './Main'; // Nested routes
import Landing from '../components/auth/Landing';
import Unauthorized from '../components/auth/Unauthorized';
import NoMatch from '../components/auth/NoMatch';
import '../styles/app.scss';
import usePageTitle from '../lib/utils/usePageTitle';

const App = ({ location }) => {
  const [isLogin, setLogin] = useState(false);
  const [profile, setProfile] = useState({});
  const [hasJustCreated, setJustCreated] = useState(false);

  const title = usePageTitle(location.pathname);
  const callbackPath = useRef(null); // uncontrolled state (not for rendering)

  // Memorize these handler functions until [dependency state] updated
  const handleLogin = useCallback(() => {
    const userinfo = JSON.parse(localStorage.getItem('x-user-info'));
    callbackPath.current = `/@${userinfo.nickname}`;
    console.log(callbackPath);
    setLogin(true);
    setProfile({
      email: userinfo.email,
      nickname: userinfo.nickname,
    });
  }, [isLogin]);

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
      return handleLogin();
    }
  }, []);

  return (
    <Container disableGutters className="app">
      <Box component="header" className="app_header">
        <Typography variant="h1">{title}</Typography>
      </Box>
      <Box component="main" className="app_main">
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
            <RatingConsentScreen nickname={profile.nickname} />
          </Route>
          <Route path="/rating">
            <Rating
              callbackPath={callbackPath.current}
              nickname={profile.nickname}
            />
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
