import apiHelper from './apiHelper';

const changeName = async (nickname) => {
  const url = 'http://13.209.19.101:3000/rename';
  const res = await apiHelper(url, { nickname });
  return res;
};

export default changeName;
