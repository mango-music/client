import React from 'react';
import postAddMusic from '../../lib/apis/postAddMusic';
import fkToken from '../../lib/fixtures/fkToken';

const LibraryListItemDropDownMenu = (props) => {
  return (
    // <div id={'button-' + props.videoid} className="search-drop-down-menu">
    <div className="library-list-item-drop-down-menu">
      <div>음악 삭제하기</div>
    </div>
  );
};

export default LibraryListItemDropDownMenu;
