import React from 'react';
import postAddMusic from '../../../lib/apis/postAddMusic';

const RecommendsDropDownMenu = (props) => {
  const { customLists, item, setCustomLists, setIsEllipsisOn } = props;

  const addMusicToUserPlaylist = (list) => {
    var obj = {
      listname: list.listname,
      thumbnail: item.thumbnail,
      videoid: item.videoid,
      title: item.title,
    };
    postAddMusic(obj, customLists, setCustomLists);
  };

  return (
    <div id={'button-' + props.videoid} className="recommends-drop-down-menu">
      <div>재생목록에 추가하기</div>
      {customLists.map((list) => (
        <div
          onClick={() => {
            addMusicToUserPlaylist(list);
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

export default RecommendsDropDownMenu;
