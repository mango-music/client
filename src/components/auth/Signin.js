import React, { useState } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import postAccountData from '../../lib/apis/postAccountData';

// const token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZjBhZDhhNTU0MWRiN2NkNWI5MGZlNyIsImVtYWlsIjoibGlzYXN1QG5hdGUuY29tIiwiaWF0IjoxNTkzMDgzMjE4LCJleHAiOjE1OTMwODUwMTh9.H0kgqH3N5YUkSWIGb67eZhClFT1H0TMxCKJ1Lad6LFE';
// const userinfo = { email: 'lisasu@nate.com', nickname: 'kirin' };

const useStyles = makeStyles((theme) => ({
  root: {},
  textField: {
    '& .MuiInputLabel-formControl': {
      fontSize: '1.125rem',
      top: '0.5rem',
    },
    '& .MuiInputLabel-shrink': {
      top: 0,
    },
    '& .MuiInputBase-root': {
      padding: '6px 0',
    },
  },
}));

const Signin = ({ handleSigninSuccess, history }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const status = await postAccountData('signin', values);
    console.log(status);
    // 404 - 가입되지 않은 이메일 혹은 비밀번호가 틀림?
    if (status !== 200) {
      // eslint-disable-next-line no-alert
      return window.alert('가입되지 않은 이메일이거나 잘못된 비밀번호 입니다.'); // (임시)
    }
    // fakeAuth
    // localStorage.setItem('x-access-token', token);
    // localStorage.setItem('x-user-info', JSON.stringify(userinfo));
    handleSigninSuccess();
    setTimeout(() => {
      history.push('/');
    }, 500);
  };

  const handleValueUpdate = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box className="account signin">
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="textField-container">
          <TextField
            id="email"
            label="이메일"
            type="text"
            value={values.email}
            onChange={handleValueUpdate('email')}
            // error={false}
            // helperText="이메일을 입력하세요."
            fullWidth
            className={classes.textField}
          />
        </div>
        <div className="textField-container">
          <TextField
            id="password"
            label="비밀번호"
            type={showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleValueUpdate('password')}
            // error={false}
            // helperText="비밀번호는 최소 8자 이상이어야 합니다. 다시 시도해 주세요."
            fullWidth
            className={classes.textField}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowPasswordToggle}
                    onMouseDown={handleShowPasswordToggle}
                    disableRipple
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="button-container">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
          >
            로그인
          </Button>
        </div>
      </form>
      {/* <div>
        <Button
          variant="text"
          color="default"
          size="medium"
          component={RouterLink}
          to="/account/password_reset"
        >
          비밀번호를 잊으셨나요?
        </Button>
      </div> */}
      <div className="options-container">
        <span style={{ fontSize: '0.875rem' }}>Mango가 처음이신가요?</span>
        <Button
          variant="text"
          color="secondary"
          size="medium"
          component={RouterLink}
          to="/signup"
        >
          가입하기
        </Button>
      </div>
    </Box>
  );
};

export default withRouter(Signin);
