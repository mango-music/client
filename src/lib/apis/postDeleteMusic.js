import apiHelper from './apiHelper';

const postDeleteMusic = async (
  listname,
  videoid,
  customLists,
  setCustomLists,
) => {
  try {
    const url = 'http://13.209.19.101:3000/deleteMusic';
    const res = await apiHelper(url, { listname, videoid });
    if (!res) return;
    const newCustomLists = [...customLists];
    let listIndex;
    for (let i = 0; i < newCustomLists.length; i++) {
      if (newCustomLists[i].listname === listname) {
        listIndex = i;
        break;
      }
    }
    const items = newCustomLists[listIndex].musics;
    for (let i = 0; i < items.length; i++) {
      if (items[i].videoid === videoid) {
        items.splice(i, 1);
        break;
      }
    }
    setCustomLists(newCustomLists);
  } catch (err) {
    console.log(err);
  }
};

export default postDeleteMusic;
