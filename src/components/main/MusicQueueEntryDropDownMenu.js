import React from 'react';
import postAddMusic from '../../lib/apis/postAddMusic';

const MusicQueueEntryDropDownMenu = (props) => {
  const { customLists, item, setCustomLists, setIsEllipsisOn } = props;

  const addMusicToUserPlayList = (list) => {
    // console.log('item : ', item);
    var obj = {
      listname: list.listname,
      thumbnail: item.thumbnail,
      videoid: item.videoid,
      title: item.title,
    };
    // console.log('setCustomLists : ', setCustomLists);
    console.log('재생목록', list.listname, '에', obj, '를 요청합니다.');
    postAddMusic(obj, customLists, setCustomLists);
  };

  return (
    <div className="drop-down-menu">
      <p>재생목록에 추가하기</p>
      {customLists &&
        customLists.map((list) => (
          <div
            onClick={() => {
              addMusicToUserPlayList(list);
              setIsEllipsisOn(false);
            }}
            key={list.listname}
          >
            {list.listname}
          </div>
        ))}
    </div>
  );
};

export default MusicQueueEntryDropDownMenu;
