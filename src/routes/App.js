import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';
import '../styles/App.css';
import Main from './Main';
import NoMatch from '../components/auth/NoMatch';

const App = () => {
  const [isLogin, setLogin] = useState(false);
  const [profile, setProfile] = useState({});
  const [isLoading, setLoading] = useState(true);

  const handleAutoLoginSuccess = () => {
    setLogin(true);
    setProfile({
      id: 'socratone',
      email: 'gim2origin@gmail.com',
      lv: 1,
    });
    setLoading(false);
  };
  const handleAutoLoginFailure = () => {
    setLoading(false);
  };

  useEffect(() => {
    if (!localStorage.getItem('x-access-token')) {
      localStorage.setItem('x-access-token', 'secret string'); // 나중에 삭제 예정
      return handleAutoLoginFailure();
    }
    return handleAutoLoginSuccess();
  }, []);

  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            if (!isLoading) {
              return isLogin ? (
                <Redirect to={`/@${profile.id}`} />
              ) : (
                <Redirect to="/signin" />
              );
            } else {
              return <h3>Loading...</h3>;
            }
          }}
        />
        <Route path="/signin">
          <h3>로그인</h3>
          <Link to="/signup">회원가입</Link>
        </Route>
        <Route path="/signup">
          <h3>회원가입</h3>
        </Route>
        <Route path={`/@${profile.id}`}>
          <Router>
            <Main profile={profile} />
          </Router>
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </>
  );
};

export default App;
