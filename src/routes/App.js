/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import '../styles/App.scss';
import Signin from '../components/auth/Signin';
import Signup from '../components/auth/Signup';
import PasswordReset from '../components/auth/PasswordReset';
import RatingConsent from '../components/rating/RatingConsent';
import Rating from '../components/rating/Rating';
import Main from './Main'; // -> Nested routes
import Unauthorized from '../components/auth/Unauthorized';
import NoMatch from '../components/auth/NoMatch';

const App = () => {
  const [isLogin, setLogin] = useState(false);
  const [profile, setProfile] = useState({});
  const [isMounted, setMounted] = useState(false);
  const [hasJustCreated, setJustCreated] = useState(false);
  // const [hasRated, setRated] = useState(false);

  // const nickname = useRef(''); // mainUrl { current: '' }

  const handleSignupSuccess = () => {
    setJustCreated(true);
  };
  const handleLoginSuccess = useCallback(() => {
    setLogin(true);
    setProfile({
      id: 'socratone',
      email: 'gim2origin@gmail.com',
      lv: 1,
    });
    setMounted(true);
  }, [isLogin]); // memorize this function until dependency(isLogin) updated
  const handleLoginFailure = () => {
    setMounted(true);
  };
  const handleLogout = () => {
    setLogin(false);
    setProfile({});
    setMounted(false);
    setJustCreated(false);
  };

  /*
    Effect will not run after the initial render.
    Thereafter, it depends on the array of values that should be observed.
    If it's empty, it will run after every render.
    Otherwise, it will run when one of it's values has changed.
  */
  useEffect(() => {
    if (!localStorage.getItem('x-access-token')) {
      return handleLoginFailure();
    }
    return handleLoginSuccess();
  }, [isMounted]);
  // useEffect(() => {
  //   // if (!mounted.current) {
  //   //   mounted.current = true; // 1. DidMount
  //   // }
  //   if (localStorage.getItem('x-access-token')) {
  //     return handleLoginSuccess(); // 3. DidUpdate
  //   }
  // }, [mounted.current]); // 2. Check dependency change

  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            if (hasJustCreated) {
              return <Redirect to={`/@${profile.id}/rating_consent`} />;
            }
            if (isMounted) {
              return isLogin ? (
                <Redirect to={`/@${profile.id}`} />
              ) : (
                <Redirect to="/signin" />
              );
            }
            return <h3>Loading...</h3>;
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
        <Route path={`/@${profile.id}/rating_consent`}>
          <RatingConsent profile={profile} />
        </Route>
        <Route path={`/@${profile.id}/rating`}>
          <Rating profile={profile} />
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
