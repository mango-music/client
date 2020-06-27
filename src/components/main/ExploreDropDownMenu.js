import React from 'react';
import postAddMusic from '../../lib/apis/postAddMusic';

const ExploreDropDownMenu = (props) => {
  const { customLists, item, setCustomLists, setIsEllipsisOn } = props;

  const addMusicToUserPlayList = (list) => {
    // console.log('item : ', item);
    var obj = {
      listname: list.listname,
      thumbnail: item.snippet.thumbnails.high.url,
      videoid: item.id.videoId,
      title: item.snippet.title,
    };
    // console.log('setCustomLists : ', setCustomLists);
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

export default ExploreDropDownMenu;
