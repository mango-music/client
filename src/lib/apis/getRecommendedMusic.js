import apiHelper from './apiHelper';

const getRecommendedMusic = async () => {
  const url = 'http://13.209.19.101:3000/recommendedMusic';
  const res = await apiHelper(url);
  if (!res) return [];
  return res.data;
};
// getRecommendedMusic
//   .then(data => console.log(data));
// output = [{음악}, {음악}, {음악}]
export default getRecommendedMusic;
