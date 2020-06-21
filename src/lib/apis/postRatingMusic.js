const postRatingMusic = (item, rating) => {
  const token = localStorage.getItem('x-access-token');
  if(!token) {
    console.log('x-access-token이 없습니다.')
    return;
  }
  
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  item.rating = rating;
  var raw = JSON.stringify(item);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://13.209.19.101:3000/ratingMusic", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

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