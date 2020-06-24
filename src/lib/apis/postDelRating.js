import apiHelper from './apiHelper';

const postDelRating = async (item) => {
  const url = 'http://13.209.19.101:3000/delRatingMusic';
  const { videoid } = item;
  const body = { videoid };
  const res = await apiHelper(url, body);
  console.log('postDelRating res : ', res);
};

export default postDelRating;
