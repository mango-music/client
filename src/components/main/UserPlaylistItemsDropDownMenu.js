import React from 'react';
import postDeleteMusicList from '../../lib/apis/postDeleteMusicList';

const UserPlaylistItemsDropDownMenu = (props) => {
  const {
    setIsEllipsisOn,
    customLists,
    setCustomLists,
    selectedList,
    setSelectedList,
  } = props;
  return (
    <div className="drop-down-menu">
      <div
        onClick={() => {
          postDeleteMusicList(selectedList, customLists, setCustomLists);
          setIsEllipsisOn(false);
          setSelectedList(null);
        }}
      >
        목록 삭제
      </div>
    </div>
  );
};

export default UserPlaylistItemsDropDownMenu;
