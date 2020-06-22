import apiHelper from './apiHelper';
const postDeleteMusicList = async (listname, customLists, setCustomLists) => {
  try {
    const url = "http://13.209.19.101:3000/deleteMusiclist";
    const res = await apiHelper(url, {listname});
    const newCustomLists = [...customLists];
    let listIndex;
    for (let i = 0; i < newCustomLists.length; i++) {
      if(newCustomLists[i].listname === listname) {
        listIndex = i;
        break;
      }
    }
    newCustomLists.splice(listIndex, 1);
    setCustomLists(newCustomLists);
  }catch(err) {
    console.log(err);
  }
}
// function postDeleteMusicList(listname, customLists, setCustomLists) {
  // const token = localStorage.getItem('x-access-token');
  // if(!token) {
    // console.log('x-access-token이 없습니다.')
    // return;
  // }
  // 
  // var myHeaders = new Headers();
  // myHeaders.append("Authorization", `Bearer ${token}`);
  // myHeaders.append("Content-Type", "application/json");
  // 
  // var raw = JSON.stringify({
    // "listname": listname
  // });
  // 
  // var requestOptions = {
    // method: 'POST',
    // headers: myHeaders,
    // body: raw,
    // redirect: 'follow'
  // };
  // 
  // fetch("http://13.209.19.101:3000/deleteMusiclist", requestOptions)
    // .then(response => {
      // if(response.status === 200) {
        // const newCustomLists = [...customLists];
        // let listIndex;
        // for (let i = 0; i < newCustomLists.length; i++) {
          // if(newCustomLists[i].listname === listname) {
            // listIndex = i;
            // break;
          // }
        // }
        // newCustomLists.splice(listIndex, 1);
        // setCustomLists(newCustomLists);
      // }
      // return response.text()
    // })
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));
// }

export default postDeleteMusicList;