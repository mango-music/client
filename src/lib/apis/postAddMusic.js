function postAddMusic(item, customLists, setCustomLists, token) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  var obj = {
    listname: item.listname,
    thumbnail: item.thumbnail,
    videoid: item.videoid,
    title: item.title
  };

  // console.log('obj : ', obj)

  var raw = JSON.stringify(obj);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://13.209.19.101:3000/addMusic", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log('result : ', result);
      const newCustomLists = [...customLists];
      // 받은 값을 state에 추가해서 리프레쉬한다.
      for(let i = 0; i < newCustomLists.length; i++) {
        if(item.listname === newCustomLists[i].listname) {
          newCustomLists[i].musics.push(result);
          break;
        }
      }
      console.log('newcustomlists : ', newCustomLists)
      setCustomLists(newCustomLists);
    })
    .catch(error => console.log('error', error));
}

export default postAddMusic;