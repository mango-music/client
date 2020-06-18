import React, { useState } from 'react';
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

const Signup = ({ handleSignupSuccess, handleLoginSuccess, history }) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    handleSignupSuccess();
    handleLoginSuccess();
    history.push('/');
  };

  const handleShowPasswordToggle = () => setShowPassword(!showPassword);

  return (
    <>
      <h2>계정 만들기</h2>
      <form className={classes.root} onSubmit={handleSubmit} autoComplete="off">
        <div>
          <TextField
            id="email"
            label="이메일"
            type="text"
            error={false}
            helperText={'유효성 검사 피드백'}
          />
        </div>
        <div>
          <TextField
            id="password"
            label="비밀번호"
            type={showPassword ? 'text' : 'password'}
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
            error={false}
            helperText={'유효성 검사 피드백'}
          />
        </div>
        <div>
          <TextField
            id="username"
            label="사용자명"
            type="text"
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
