import React from 'react';
import postAddMusic from '../../lib/apis/postAddMusic';
import fkToken from '../../lib/fixtures/fkToken';

const SearchDropDownMenu = (props) => {
  const { customLists, item, setCustomLists, setIsEllipsisOn } = props;

  const addMusicToUserPlayList = (list) => {
    // console.log('item : ', item);
    var obj = {
      listname: list.listname,
      thumbnail: item.snippet.thumbnails.medium.url,
      videoid: item.id.videoId,
      title: item.snippet.title,
    };
    // console.log('setCustomLists : ', setCustomLists);
    postAddMusic(obj, customLists, setCustomLists, fkToken);
  };

  return (
    <div id={'button-' + props.videoid} className="search-drop-down-menu">
      <div>재생목록에 추가하기</div>
      {customLists.map((list) => (
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

export default SearchDropDownMenu;
