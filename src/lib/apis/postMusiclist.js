const postMusiclist = (text, customLists, setCustomLists) => {
  const token = localStorage.getItem('x-access-token');
  if(!token) {
    console.log('x-access-token이 없습니다.')
    return;
  }
  
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({"listname": text});

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  console.log('customLists : ', customLists)

  fetch("http://13.209.19.101:3000/postMusiclist", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      const newCustomLists = [...customLists];
      newCustomLists.push(result);
      setCustomLists(newCustomLists);
    })
    .catch(error => console.log('error', error));
}
export default postMusiclist;
