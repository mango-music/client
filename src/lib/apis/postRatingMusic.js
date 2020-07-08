import apiHelper from './apiHelper';
const postRatingMusic = async (
  item,
  rating,
  videoIdRatings,
  setVideoIdRatings,
) => {
  item.rating = rating;
  const url = 'http://13.209.19.101:3000/ratingMusic';
  const res = await apiHelper(url, item);
  if (!res) return;
  console.log('postRatingMusic res : ', res);
  if (res.status === 200) {
    const newVideoIdRatings = { ...videoIdRatings };
    newVideoIdRatings[item.videoid] = rating;
    setVideoIdRatings(newVideoIdRatings);
  }
  return res.status;
};

export default postRatingMusic;

/*
  // item argument 예제

  item = {
    "rating": 4,
    "thumbnail": "https://i.ytimg.com/vi/TgOu00Mf3kI/mqdefault.jpg",
    "videoid": "TgOu00Mf3kI", 
    "title": "[MV] IU(아이유) _ eight(에잇) (Prod.&Feat. SUGA of BTS)"
  }
*/
