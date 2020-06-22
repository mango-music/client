import apiHelper from './apiHelper';
const getUserMusicLists = async () => {
  const url = "http://13.209.19.101:3000/getMusiclists";
  const res = await apiHelper(url);
  return res.data;
}

export default getUserMusicLists;
// 사용 예제를 바꿔야합니다
// json을 하지않고 바로 사용 가능합니다
//.tnen(data => console.log(data));

// const getUserMusicLists = () => {
  // const token = localStorage.getItem('x-access-token');
  // if(!token) {
    // console.log('x-access-token이 없습니다.')
    // return;
  // }
// 
  // var myHeaders = new Headers();
  // myHeaders.append("Authorization", `Bearer ${token}`);
// 
  // var requestOptions = {
    // method: 'GET',
    // headers: myHeaders,
    // redirect: 'follow'
  // };
// 
  // return fetch("http://13.209.19.101:3000/getMusiclists", requestOptions);
// }
// 
// export default getUserMusicLists;

/*
사용 예제

getUserMusicLists(<token>)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.log(err));
*/