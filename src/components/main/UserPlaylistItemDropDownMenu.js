import React from 'react';
import postDeleteMusic from '../../lib/apis/postDeleteMusic';

const UserPlaylistItemDropDownMenu = (props) => {
  const {
    videoid,
    selectedList,
    customLists,
    setCustomLists,
    setIsEllipsisOn,
  } = props;
  return (
    <div className="drop-down-menu">
      <div
        onClick={() => {
          postDeleteMusic(selectedList, videoid, customLists, setCustomLists);
          setIsEllipsisOn(false);
        }}
      >
        음악 삭제하기
      </div>
    </div>
  );
};

export default UserPlaylistItemDropDownMenu;
