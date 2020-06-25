import apiHelper from './apiHelper';

const getRatingMusiclist = async () => {
  const url = 'http://13.209.19.101:3000/getRatingMusiclist';
  const res = await apiHelper(url);
  if (!res) return [];
  console.log(res);
  return res.data;
};

// getRatingMusiclist
//   .then(data => console.log(data));
// output = [{음악}, {음악}, {음악}]
export default getRatingMusiclist;
