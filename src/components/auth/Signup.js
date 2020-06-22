import React, { useState, useEffect, useCallback } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import '../../styles/Signup.scss';
import validate from '../../lib/utils/validate';
import postAccountData from '../../lib/apis/postAccountData';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .Mui-focused': {
      color: '#303030 !important',
      borderBottomColor: '#303030 !important',
    },
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#303030',
    },
    '& .Mui-error:after': {
      borderBottomColor: theme.palette.error.main,
    },
    '& .MuiInputBase-input': {
      fontSize: '1.125rem',
    },
    '& .MuiInputAdornment-root': {
      height: 'auto',
    },
  },
}));

const Signup = ({ handleSignupSuccess, history }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: '',
    password: '',
    confirm_password: '',
    nickname: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(errors);
    if (errors) {
      // errors가 에러 내용이 담긴 객체일 경우,
      // eslint-disable-next-line no-alert
      window.alert('유효하지 않은 양식입니다.'); // (임시)
      return;
    }
    const { confirm_password, ...data } = values; // 필요한 부분만 추출
    const status = await postAccountData('signup', data);
    console.log(status ? 201 : 409);
    // 409
    if (!status) {
      // eslint-disable-next-line no-alert
      window.alert('이미 존재하는 이메일 입니다.'); // (임시)
      return;
    }
    // 201
    handleSignupSuccess();
    setTimeout(() => {
      history.push('/');
    }, 500); // 동기적으로 실행할 수 있는 방법 찾아보기
  };

  const handleValueUpdate = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const handleValidation = (e) => {
    const result = validate(values); // object or null
    setErrors(result); // result 값에 상관 없이 errors 상태 값을 업데이트해 리렌더를 트리거한다
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div id="Signup">
      <h2>계정 만들기</h2>
      <form className={classes.root} onSubmit={handleSubmit} autoComplete="off">
        <div className="TextField-container">
          <TextField
            id="email"
            label="이메일"
            variant="standard"
            type="text"
            value={values.email}
            onChange={handleValueUpdate('email')}
            onBlur={handleValidation} // same as onfocusout event
            error={errors && errors.email}
            helperText={errors && errors.email ? errors.email : null} // 'message' or null
            // autoFocus // when mounted
            required
          />
        </div>
        <div className="TextField-container">
          <TextField
            id="password"
            label="비밀번호"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleValueUpdate('password')}
            onBlur={handleValidation}
            error={errors && errors.password}
            helperText={errors && errors.password ? errors.password : null}
            required
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
        <div className="TextField-container">
          <TextField
            id="password"
            label="비밀번호 확인"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            value={values.confirm_password}
            onChange={handleValueUpdate('confirm_password')}
            onBlur={handleValidation}
            error={errors && errors.confirm_password}
            helperText={
              errors && errors.confirm_password ? errors.confirm_password : null
            }
            required
          />
        </div>
        <div className="TextField-container">
          <TextField
            id="nickname"
            label="사용자명"
            variant="outlined"
            type="text"
            onChange={handleValueUpdate('nickname')}
            onBlur={handleValidation}
            error={errors && errors.nickname}
            helperText={errors && errors.nickname ? errors.nickname : null}
            required
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
          component={RouterLink}
          to="/signin"
        >
          로그인
        </Button>
      </div>
    </div>
  );
};

export default withRouter(Signup);
