import axios from 'axios';

async function postAccountData(path, data) {
  // ( path: string, data: object ) -> need typescript
  // if (path !== 'signup' || path !== 'signin') {
  //   throw new Error("First argument must be 'signup' or 'signin'");
  // }
  let result;
  await axios
    .post(`http://13.209.19.101:3000/${path}`, data)
    .then((res) => {
      console.log(res);
      const { userinfo, access_token, refresh_token } = res.data;
      localStorage.setItem('x-access-token', access_token);
      localStorage.setItem('x-refresh-token', refresh_token);
      localStorage.setItem('x-user-info', JSON.stringify(userinfo));
      result = res.status;
    })
    .catch((err) => {
      console.log(err); // when 409 error
    });
  return result;
}

export default postAccountData;
