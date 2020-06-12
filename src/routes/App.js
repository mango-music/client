/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import '../styles/App.scss';
import Signin from '../components/auth/Signin';
import Signup from '../components/auth/Signup';
import PasswordReset from '../components/auth/PasswordReset';
import RatingConsent from '../components/rating/RatingConsent';
import Rating from '../components/rating/Rating';
import Main from './Main'; // Nested routes
import Loading from '../components/auth/Loading';
import Unauthorized from '../components/auth/Unauthorized';
import NoMatch from '../components/auth/NoMatch';

const App = () => {
  const [isLogin, setLogin] = useState(false);
  const [profile, setProfile] = useState({});
  const [isMounted, setMounted] = useState(false);
  const [hasJustCreated, setJustCreated] = useState(false);

  // const callbackPath = useRef(null);

  // Memorize these handler functions until [dependency state] updated
  const handleSignupSuccess = useCallback(() => {
    setJustCreated(true);
  }, [hasJustCreated]);

  const handleLoginSuccess = useCallback(() => {
    setLogin(true);
    setProfile({
      id: 'socratone',
      email: 'gim2origin@gmail.com',
      lv: 1,
    });
    setMounted(true);
  }, [isLogin]);

  const handleLoginFailure = useCallback(() => {
    setMounted(true);
  }, [isMounted]);

  const handleLogout = useCallback(() => {
    setLogin(false);
    setProfile({});
    setMounted(false);
    setJustCreated(false);
  }, [isLogin]);

  /*
    Effect will not run after the initial render.
    Thereafter, it depends on the array of values that should be observed.
    If it's empty, it will run after every render.
    Otherwise, it will run when one of it's values has changed.
  */
  useEffect(() => {
    // Execute here on first render (DidMount)
    // Execute After detecting isMount update (DidUpdate)
    if (!localStorage.getItem('x-access-token')) {
      return handleLoginFailure();
    }
    return handleLoginSuccess();
  }, [isMounted]); // Check if dependency updated
  // useEffect(() => {
  //   // 1. Did Mount (first update)
  //   if (!mounted.current) {
  //     mounted.current = true;
  //     if (localStorage.getItem('x-access-token')) {
  //       return handleLoginSuccess();
  //     }
  //   }
  //   // 3. Did Update (if mounted.current re-updated)
  // }, [mounted.current]); // 2. Check dependency change
  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            if (hasJustCreated) {
              return <Redirect to="/rating_consent" />;
            }
            if (isMounted) {
              return isLogin ? (
                <Redirect to={`/@${profile.id}`} />
              ) : (
                <Redirect to="/signin" />
              );
            }
            return <Loading />;
          }}
        />
        <Route path="/signin">
          <Signin handleLoginSuccess={handleLoginSuccess} />
        </Route>
        <Route path="/signup">
          <Signup
            handleSignupSuccess={handleSignupSuccess}
            handleLoginSuccess={handleLoginSuccess}
          />
        </Route>
        <Route path="/rating_consent">
          <RatingConsent nickname={profile.id} />
        </Route>
        <Route path="/rating">
          <Rating callbackPath={`/@${profile.id}`} />
        </Route>
        <Route path={`/@${profile.id}`}>
          <Main profile={profile} handleLogout={handleLogout} />
        </Route>
        <Route path="/account/password_reset">
          <PasswordReset />
        </Route>
        <Route
          path="*"
          render={() => {
            if (!localStorage.getItem('x-access-token')) {
              return <Unauthorized />;
            }
            return <NoMatch />;
          }}
        />
      </Switch>
    </>
  );
};

export default App;
