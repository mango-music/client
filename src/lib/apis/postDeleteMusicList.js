import apiHelper from './apiHelper';
const postDeleteMusicList = async (listname, customLists, setCustomLists) => {
  try {
    const url = 'http://13.209.19.101:3000/deleteMusiclist';
    const res = await apiHelper(url, { listname });
    if (!res) return;
    const newCustomLists = [...customLists];
    let listIndex;
    for (let i = 0; i < newCustomLists.length; i++) {
      if (newCustomLists[i].listname === listname) {
        listIndex = i;
        break;
      }
    }
    newCustomLists.splice(listIndex, 1);
    setCustomLists(newCustomLists);
  } catch (err) {
    console.log(err);
  }
};

export default postDeleteMusicList;
