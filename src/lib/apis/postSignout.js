import apiHelper from './apiHelper';

const postSignout = async (tokens) => {
  const url = 'http://13.209.19.101:3000/signout';
  const res = await apiHelper(url, tokens);
  return res.data;
};

export default postSignout;
