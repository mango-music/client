function postDeleteMusicList(listname, customLists, setCustomLists, token) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "listname": listname
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch("http://13.209.19.101:3000/deleteMusiclist", requestOptions)
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
        newCustomLists.splice(listIndex, 1);
        setCustomLists(newCustomLists);
      }
      return response.text()
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

export default postDeleteMusicList;