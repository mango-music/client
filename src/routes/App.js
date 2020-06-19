/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import '../styles/App.scss';
import axios from 'axios';
import Signin from '../components/auth/Signin';
import Signup from '../components/auth/Signup';
import PasswordReset from '../components/auth/PasswordReset';
import RatingConsentScreen from '../components/rating/RatingConsentScreen';
import Rating from '../components/rating/Rating';
import Main from './Main'; // Nested routes
import Landing from '../components/auth/Landing';
import Unauthorized from '../components/auth/Unauthorized';
import NoMatch from '../components/auth/NoMatch';

const App = ({ history }) => {
  // const [isMounted, setMounted] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [profile, setProfile] = useState({});
  const [hasJustCreated, setJustCreated] = useState(false);

  const callbackPath = useRef(null); // uncontrolled state (not for rendering)

  // Memorize these handler functions until [dependency state] updated
  const handlePostSignupData = (signupData) => {
    axios('http://13.209.19.101:3000/signup', signupData)
      .then((body) => {
        console.log(body);
        const { userinfo, access_token, refresh_token } = body.data;
        localStorage.setItem('x-access-token', access_token);
        localStorage.setItem('x-refresh-token', refresh_token);
        localStorage.setItem('x-user-info', JSON.stringify(userinfo));
        setJustCreated(true);
        handleLogin();
      })
      .catch((err) => {
        console.log(err); // when 409 error
      });
  };

  const handlePostSigninData = (signinData) => {
    axios
      .post('http://13.209.19.101:3000/signin', signinData)
      .then((body) => {
        console.log(body);
        const { userinfo, access_token, refresh_token } = body.data;
        localStorage.setItem('x-access-token', access_token);
        localStorage.setItem('x-refresh-token', refresh_token);
        localStorage.setItem('x-user-info', JSON.stringify(userinfo));
        handleLogin();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogin = () => {
    const userinfo = JSON.parse(localStorage.getItem('x-user-info'));
    callbackPath.current = `/@${userinfo.nickname}`;
    console.log(callbackPath);
    setLogin(true);
    setProfile({
      id: userinfo.nickname,
      email: userinfo.email,
    });
    // history.push('/'); // 동기적으로 작동하는지 계속 디버깅 해보기
    // setTimeout(() => {
    //   history.push('/');
    // }, 500);
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
    // if (!isLogin) {
    //   if (localStorage.getItem('x-access-token')) {
    //     return handleLogin();
    //   }
    // }
  }, []);

  // useEffect(() => {
  //   console.log('Component did update');
  //   if (hasJustCreated) {
  //     history.push('/');
  //   }
  // }, [hasJustCreated]);

  // useEffect(() => {
  //   console.log('Component did update');
  // }, [hasJustCreated, isLogin]);

  // useEffect(() => {
  //   // Execute here on first render (DidMount)
  //   // if (isMounted && localStorage.getItem('x-access-token')) {
  //   //   return handleAutoLoginSuccess();
  //   // }
  //   // if (isMounted) {
  //   //   if (!localStorage.getItem('x-access-token')) {
  //   //     return handleAutoLoginFailure();
  //   //   }
  //   //   return handleAutoLoginSuccess();
  //   // }
  //   // Execute After detecting profile update (DidUpdate)
  //   if (profile.id) {
  //     callbackPath.current = `/@${profile.id}`;
  //   } else {
  //     callbackPath.current = null;
  //   }
  // }, [profile]); // Check if dependency updated

  return (
    <>
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
          <Signin handlePostSigninData={handlePostSigninData} />
        </Route>
        <Route path="/signup">
          <Signup
            isApproved={hasJustCreated}
            handlePostSignupData={handlePostSignupData}
          />
        </Route>
        <Route path="/rating_consent">
          <RatingConsentScreen nickname={profile.id} />
        </Route>
        <Route path="/rating">
          <Rating callbackPath={callbackPath.current} nickname={profile.id} />
        </Route>
        <Route path={callbackPath.current}>
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

export default withRouter(App);
