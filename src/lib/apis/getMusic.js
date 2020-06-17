const getMusic = async (videoId) => {
  // 임시
  return {
    title: 'Lady Gaga, Ariana Grande - Rain On Me (Official Music Video)',
    thumbnail: 'https://i.ytimg.com/vi/AoAm4om0wTs/mqdefault.jpg',
    videoId: 'AoAm4om0wTs',
    rating: 5,
  }
}

module.exports = getMusic;

/*
사용 예제

getMusic(3)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.log(err));
*/