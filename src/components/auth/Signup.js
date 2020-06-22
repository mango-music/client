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
import validate from '../../lib/utils/validate';
import postAccountData from '../../lib/apis/postAccountData';

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
    // '& .Mui-error:after': {
    //   borderBottomColor: `${theme.palette.error.main} !important`,
    // },
  },
}));

const initialValues = {
  email: '',
  password: '',
  confirm_password: '',
  nickname: '',
};

const Signup = ({ handleSignupSuccess, history }) => {
  const classes = useStyles();
  const [values, setValues] = useState(initialValues);
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
      window.alert('이미 가입된 이메일 입니다.'); // (임시)
      setValues(initialValues);
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
    <main className="account signup">
      <h2>가입하기</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="textField-container">
          <TextField
            id="email"
            label="이메일"
            type="text"
            value={values.email}
            onChange={handleValueUpdate('email')}
            onBlur={handleValidation} // same as onfocusout event
            error={errors && errors.email}
            helperText={errors && errors.email ? errors.email : null} // 'message' or null
            autoFocus // when mounted
            required
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
            onBlur={handleValidation}
            error={errors && errors.password}
            helperText={errors && errors.password ? errors.password : null}
            required
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
        <div className="textField-container">
          <TextField
            id="password"
            label="비밀번호 확인"
            type={showPassword ? 'text' : 'password'}
            value={values.confirm_password}
            onChange={handleValueUpdate('confirm_password')}
            onBlur={handleValidation}
            error={errors && errors.confirm_password}
            helperText={
              errors && errors.confirm_password ? errors.confirm_password : null
            }
            required
            fullWidth
            className={classes.textField}
          />
        </div>
        <div className="textField-container">
          <TextField
            id="nickname"
            label="사용자명"
            type="text"
            onChange={handleValueUpdate('nickname')}
            onBlur={handleValidation}
            error={errors && errors.nickname}
            helperText={errors && errors.nickname ? errors.nickname : null}
            required
            fullWidth
            className={classes.textField}
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
            가입
          </Button>
        </div>
      </form>
      <div className="options-container">
        <span style={{ fontSize: '0.875rem' }}>이미 Mango 계정이 있나요?</span>
        <Button
          variant="text"
          color="secondary"
          size="medium"
          component={RouterLink}
          to="/signin"
        >
          로그인
        </Button>
      </div>
    </main>
  );
};

export default withRouter(Signup);
