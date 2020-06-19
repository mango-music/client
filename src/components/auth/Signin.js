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

const Signin = ({ handlePostSigninData, history }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleValueChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePostSigninData(values);
    setTimeout(() => {
      history.push('/');
    }, 1000);
  };

  const handleShowPasswordToggle = () => setShowPassword(!showPassword);

  return (
    <>
      <h2>로그인</h2>
      <form className={classes.root} onSubmit={handleSubmit} autoComplete="off">
        <div>
          <TextField
            id="email"
            label="이메일"
            type="text"
            value={values.email}
            onChange={handleValueChange('email')}
            error={false}
            helperText={'이메일을 입력하세요.'}
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
            helperText={
              '비밀번호는 최소 8자 이상이어야 합니다. 다시 시도해 주세요.'
            }
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
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="primary"
          >
            로그인
          </Button>
        </div>
      </form>
      <div>
        <Button
          variant="text"
          color="default"
          size="medium"
          component={RouterLink}
          to="/account/password_reset"
        >
          비밀번호를 잊으셨나요?
        </Button>
      </div>
      <div>
        <span style={{ fontSize: '0.875rem' }}>Mango가 처음이신가요?</span>
        <Button
          variant="text"
          color="primary"
          size="medium"
          component={RouterLink}
          to="/signup"
        >
          가입하기
        </Button>
      </div>
    </>
  );
};

export default withRouter(Signin);
