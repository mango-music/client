function postAddMusic(item, customLists, setCustomLists, token) {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);
  myHeaders.append('Content-Type', 'application/json');

  const obj = {
    listname: item.listname,
    thumbnail: item.thumbnail,
    videoid: item.videoid,
    title: item.title,
  };

  const raw = JSON.stringify(obj);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch('http://13.209.19.101:3000/addMusic', requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log('result : ', result);
      const newCustomLists = [...customLists];
      // 리스트에 추가하고 받은 값을 state에 추가해서 리프레쉬한다.
      for (let i = 0; i < newCustomLists.length; i++) {
        if (item.listname === newCustomLists[i].listname) {
          newCustomLists[i].musics.push(result);
          break;
        }
      }
      console.log('newcustomlists : ', newCustomLists);
      setCustomLists(newCustomLists);
    })
    .catch((error) => console.log('error', error));
}

export default postAddMusic;
