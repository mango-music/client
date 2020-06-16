import React from 'react';
import postAddMusic from '../../lib/apis/postAddMusic';
import fkToken from '../../lib/fixtures/fkToken';

const UserPlaylistItemDropDownMenu = (props) => {
  return (
    <div className="library-list-item-drop-down-menu">
      <div>음악 삭제하기</div>
    </div>
  );
};

export default UserPlaylistItemDropDownMenu;
