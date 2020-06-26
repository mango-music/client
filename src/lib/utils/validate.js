const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function isValidEmail(str) {
  if (regex.test(str)) {
    return true;
  }
  return false;
}

function validate(obj) {
  const { email, password, confirm_password, nickname } = obj;
  const errors = {};

  if (email.trim() === '') {
    errors['email'] = '필수 항목 입니다.';
  }
  if (!errors['email'] && !isValidEmail(email)) {
    errors['email'] = '유효하지 않은 이메일 주소 입니다.';
  }
  if (password.trim() === '') {
    errors['password'] = '필수 항목 입니다.';
  }
  if (!errors['password'] && password.length < 8) {
    errors['password'] = '비밀번호는 최소 8자 이상이어야 합니다.';
  }
  if (confirm_password.trim() === '') {
    errors['confirm_password'] = '필수 항목 입니다.';
  }
  if (!errors['confirm_password'] && confirm_password !== password) {
    errors['confirm_password'] = '비밀번호가 일치하지 않습니다.';
  }
  if (nickname.trim() === '') {
    errors['nickname'] = '필수 항목 입니다.';
  }
  return Object.keys(errors).length > 0 ? errors : null;
}

export default validate;

// eslint-disable-next-line no-restricted-syntax
// for (const prop in obj) {
//   if (obj[prop].trim() === '') {
//     errors[prop] = '필수 항목 입니다.';
//   }
// }
