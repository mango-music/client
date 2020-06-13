const getUserMusicLists = async (token) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return fetch("http://13.209.19.101:3000/getMusiclists", requestOptions);
}

export default getUserMusicLists;

/*
사용 예제

getUserMusicLists(<token>)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.log(err));
*/