import axios from 'axios';
import refresh from './refresh';
const apiHelper = async (url, body) => {
  const token = localStorage.getItem('x-access-token');
  if (!token) return console.log('x-access-token이 없습니다.');
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const res = body
      ? await axios.post(url, body, { headers })
      : await axios.get(url, { headers });
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    if (!err.response) {
      return;
    }
    if (err.response.status === 419) {
      refresh();
      return apiHelper(url, body);
    }
    return err.response;
  }
};
export default apiHelper;
