import axios from 'axios';

async function postAccountData(path, data) {
  // ( path: string, data: object ) -> need typescript
  const result = await axios
    .post(`http://13.209.19.101:3000/${path}`, data)
    .then((res) => {
      console.log(res);
      const { userinfo, access_token, refresh_token } = res.data;
      localStorage.setItem('x-access-token', access_token);
      localStorage.setItem('x-refresh-token', refresh_token);
      localStorage.setItem('x-user-info', JSON.stringify(userinfo));
      return res.status;
    })
    .catch((err) => {
      console.log(JSON.stringify(err)); // when 409 error
      return err.response.status;
    });

  return result;
}

export default postAccountData;
