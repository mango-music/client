import axios from 'axios';

const refresh = async () => {
  const token = localStorage.getItem('x-refresh-token');
  if(!token) {
      return console.log('x-refresh-token이 없습니다.');
  }
  const headers = {'Authorization' : `Bearer ${token}`};
  try {
    const res = await axios.get("http://13.209.19.101:3000/refresh", {headers});
    const {access_token} = res.data;
    localStorage.setItem('x-access-token', access_token);
  } catch(err) {
    console.log(err);
    if(err.response.status === 419) {
      return alert('로그인을 새로 해주세요')
    }
  }
}

export default refresh;