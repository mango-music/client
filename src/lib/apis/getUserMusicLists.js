import apiHelper from './apiHelper';
const getUserMusicLists = async () => {
  const url = 'http://13.209.19.101:3000/getMusiclists';
  const res = await apiHelper(url);
  if (!res) return [];
  return res.data;
};

export default getUserMusicLists;
// 사용 예제를 바꿔야합니다
// json을 하지않고 바로 사용 가능합니다
//.tnen(data => console.log(data));
