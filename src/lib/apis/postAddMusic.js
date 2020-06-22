import apiHelper from './apiHelper';

const postAddMusic = async (item, customLists, setCustomLists) => {
  const {listname, thumbnail, videoid, title} = item;
  const url = "http://13.209.19.101:3000/addMusic";
  const body = {listname, thumbnail, videoid, title};
  const res = await apiHelper(url, body);
  console.log(res.data);
  const newCustomLists = [...customLists];
  for(let i = 0; i < newCustomLists.length; i++) {
    if(item.listname === newCustomLists[i].listname) {
      newCustomLists[i].musics.push(res.data);
      break;
    }
  }
  console.log('newcustomlists : ', newCustomLists);
  setCustomLists(newCustomLists);
}

// const token = localStorage.getItem('x-access-token');
// if(!token) {
  // console.log('x-access-token이 없습니다.')
  // return;
// }
// var myHeaders = new Headers();
// myHeaders.append("Authorization", `Bearer ${token}`);
// myHeaders.append("Content-Type", "application/json");
// var obj = {
  // listname: item.listname,
  // thumbnail: item.thumbnail,
  // videoid: item.videoid,
  // title: item.title
// };
// var raw = JSON.stringify(obj);
// var requestOptions = {
  // method: 'POST',
  // headers: myHeaders,
  // body: raw,
  // redirect: 'follow'
// };
// fetch("http://13.209.19.101:3000/addMusic", requestOptions)
  // .then(response => response.json())
  // .then(result => {
    // console.log('result : ', result);
    // const newCustomLists = [...customLists];
    // 리스트에 추가하고 받은 값을 state에 추가해서 리프레쉬한다. //
    // for(let i = 0; i < newCustomLists.length; i++) {
      // if(item.listname === newCustomLists[i].listname) {
        // newCustomLists[i].musics.push(result);
        // break;
      // }
    // }
    // console.log('newcustomlists : ', newCustomLists)
    // setCustomLists(newCustomLists);
  // })
  // .catch(error => console.log('error', error));

export default postAddMusic;
