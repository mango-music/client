import React, { PureComponent } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';
import './styles/App.css';
import Main from '../Main';
import NoMatch from '../NoMatch';
// import Loading from './Loading';

class App extends PureComponent {
  state = {
    isLogin: false,
    profile: {},
    isLoading: true,
  };
  handleAutoLoginSuccess = () => {
    this.setState({
      isLogin: !this.state.isLogin,
      profile: {
        id: 'godman',
        email: 'gkfka1189@gmail.com',
        lv: 1,
      },
      isLoading: false,
    });
  };
  handleAutoLoginFailure = () => {
    this.setState({
      isLoading: false,
    });
  };
  componentDidMount() {
    // localStorage.setItem('x-access-token', 'cjsd19');
    if (!localStorage.getItem('x-access-token')) {
      // 로컬스토리지에 인증 쿠키가 없으면 로그인 화면, 있으면 유저 화면 리다이렉트
      return this.handleAutoLoginFailure();
    }
    return this.handleAutoLoginSuccess();
  }
  render() {
    const { isLogin, profile, isLoading } = this.state;
    return (
      <>
        {/* {isLogin ? (
        <Redirect to={`/@${profile.id}`} />
      ) : (
        <Redirect to="/signin" />
      )} */}
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
  }
}

// export default App;

/*
  ComponentDidMount
  * 로컬스토리지에서 세션 쿠키를 꺼내어 서버로 보낸다.
    - 쿠키가 유효하다면 (200), { isLogin: true, profile: res.body }
    - 유효하지 않다면 (401), { isLogin: false }
  * 로컬스토리지에 로그인 세션 쿠키가 없다면, { isLogin: false }
*/

// [] only componentDidMount
// if [dept] inputs are included, update condition musted be implemented to prevent infinite update
