import apiHelper from './apiHelper';

const postRatingMusiclist = async (ratingMusiclist) => {
  const url = 'http://13.209.19.101:3000/postRatingMusiclist';
  const res = await apiHelper(url, { ratingMusiclist });
  if (!res) return;
  return res.status;
};

export default postRatingMusiclist;
