import apiHelper from './apiHelper';

const postAddMusic = async (item, customLists, setCustomLists) => {
  const { listname, thumbnail, videoid, title } = item;
  const url = 'http://13.209.19.101:3000/addMusic';
  const body = { listname, thumbnail, videoid, title };
  const res = await apiHelper(url, body);
  if (!res) return;
  const newCustomLists = [...customLists];
  for (let i = 0; i < newCustomLists.length; i++) {
    if (item.listname === newCustomLists[i].listname) {
      newCustomLists[i].musics.push(res.data);
      break;
    }
  }
  console.log('newcustomlists : ', newCustomLists);
  setCustomLists(newCustomLists);
};

export default postAddMusic;
