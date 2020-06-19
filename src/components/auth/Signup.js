import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    '& label.Mui-focused': {
      color: theme.palette.info.main,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.info.main,
    },
    '& .MuiInputBase-input': {
      fontSize: '1.125rem',
    },
    '& .MuiInputAdornment-root': {
      height: 'auto',
    },
  },
}));

const Signup = ({ handlePostSignupData, history }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: '',
    password: '',
    nickname: '',
  });
  const [confirmPassword, setConfirmPassword] = useState(''); // 나중에하기
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // 까먹지 말자!
    handlePostSignupData(values);
    setTimeout(() => {
      history.push('/');
    }, 1000);
  };

  const handleValueChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };
  const handleShowPasswordToggle = () => setShowPassword(!showPassword);

  // useEffect(() => {
  //   if (isApproved) {
  //     return history.push('/');
  //   }
  // }, [isApproved]);

  return (
    <>
      <h2>계정 만들기</h2>
      <form className={classes.root} onSubmit={handleSubmit} autoComplete="off">
        <div>
          <TextField
            id="email"
            label="이메일"
            type="text"
            value={values.email}
            onChange={handleValueChange('email')}
            error={false}
            helperText={'유효성 검사 피드백'}
          />
        </div>
        <div>
          <TextField
            id="password"
            label="비밀번호"
            type={showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleValueChange('password')}
            error={false}
            helperText={'유효성 검사 피드백'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowPasswordToggle}
                    onMouseDown={handleShowPasswordToggle}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div>
          <TextField
            id="password"
            label="비밀번호 확인"
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            // onChange={}
            error={false}
            helperText={'유효성 검사 피드백'}
          />
        </div>
        <div>
          <TextField
            id="nickname"
            label="사용자명"
            type="text"
            onChange={handleValueChange('nickname')}
            error={false}
            helperText={'유효성 검사 피드백'}
          />
        </div>
        <div>
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="primary"
          >
            계정 만들기
          </Button>
        </div>
      </form>
      <div>
        <span style={{ fontSize: '0.875rem' }}>이미 Mango 계정이 있나요?</span>
        <Button
          variant="text"
          color="primary"
          // size="medium" // Default size
          component={RouterLink}
          to="/signin"
        >
          로그인
        </Button>
      </div>
    </>
  );
};

export default withRouter(Signup);
