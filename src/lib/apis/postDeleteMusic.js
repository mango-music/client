function postDeleteMusic(listname, videoid, customLists, setCustomLists) {
  const token = localStorage.getItem('x-access-token');
  if(!token) {
    console.log('x-access-token이 없습니다.')
    return;
  }
  
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "listname": listname,
    "videoid": videoid
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch("http://13.209.19.101:3000/deleteMusic", requestOptions)
    .then(response => {
      if(response.status === 200) {
        const newCustomLists = [...customLists];
        let listIndex;
        for (let i = 0; i < newCustomLists.length; i++) {
          if(newCustomLists[i].listname === listname) {
            listIndex = i;
            break;
          }
        }
        const items = newCustomLists[listIndex].musics;
        for (let i = 0; i < items.length; i++) {
          if(items[i].videoid === videoid) {
            items.splice(i, 1);
            break;
          }
        }
        setCustomLists(newCustomLists);
      }
      return response.text();
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

export default postDeleteMusic;