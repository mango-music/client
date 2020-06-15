import React from 'react';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LibraryListItem = (props) => {
  const { item } = props;
  return (
    <li>
      <div className="library-list-img">
        <img src={item.thumbnail} />
      </div>
      <div className="library-list-title">
        <p>{item.title}</p>
      </div>
      <div className="library-list-button">
        <button onClick={() => console.log('안녕')}>
          <FontAwesomeIcon icon={faEllipsisV} color="#afafaf" />
        </button>
      </div>
    </li>
  );
};

export default LibraryListItem;
