import React from 'react';
import postDeleteMusic from '../../lib/apis/postDeleteMusic';
import fkToken from '../../lib/fixtures/fkToken';

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
          postDeleteMusic(
            selectedList,
            videoid,
            customLists,
            setCustomLists,
            fkToken,
          );
          setIsEllipsisOn(false);
        }}
      >
        음악 삭제하기
      </div>
    </div>
  );
};

export default UserPlaylistItemDropDownMenu;
