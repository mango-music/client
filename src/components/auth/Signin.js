import React, { useState } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import {
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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

const Signin = ({ handleLoginSuccess, history }) => {
  const classes = useStyles();
  // const [values, setValues] = useState({
  //   password: '',
  //   showPassword: false,
  // });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    handleLoginSuccess();
    history.push('/');
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <>
      <h2>로그인</h2>
      <form className={classes.root} onSubmit={handleSubmit} autoComplete="off">
        <div>
          <TextField
            id="email"
            label="Email"
            type="text"
            margin="normal"
            error={false}
            helperText={'유효성 검사 피드백'}
          />
        </div>
        <div>
          <TextField
            id="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            margin="normal"
            error={false}
            helperText={'유효성 검사 피드백'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
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
        <span>Mango가 처음이신가요?</span>
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
