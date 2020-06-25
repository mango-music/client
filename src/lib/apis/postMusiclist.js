import apiHelper from './apiHelper';

const postMusiclist = async (listname, customLists, setCustomLists) => {
  try {
    const url = 'http://13.209.19.101:3000/postMusiclist';
    const res = await apiHelper(url, { listname });
    if (!res) return;
    if (res.status === 409) {
      return alert('같은 이름의 리스트가 존재합니다');
    }
    console.log(res.data);
    const newCustomLists = [...customLists];
    newCustomLists.push(res.data);
    setCustomLists(newCustomLists);
  } catch (err) {
    console.log(err);
  }
};
export default postMusiclist;
