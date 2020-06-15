import React from 'react';
import LibraryListItem from './LibraryListItem';
import { faTimes, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LibraryListItems = (props) => {
  const { libraryList, setLibraryList, customLists } = props;
  let items;
  for (let i = 0; i < customLists.length; i++) {
    if (customLists[i].listname === libraryList) {
      items = customLists[i].musics;
      break;
    }
  }
  return (
    <div id="library-list-items">
      <header>
        <div>
          <button onClick={() => setLibraryList(null)}>
            <FontAwesomeIcon icon={faTimes} color="#afafaf" />
          </button>
        </div>
        <div>
          <button>
            <FontAwesomeIcon icon={faEllipsisV} color="#afafaf" />
          </button>
        </div>
        <div className="library-list-title">{libraryList}</div>
      </header>

      <ul>
        {items &&
          items.map((item) => {
            return <LibraryListItem key={item.videoid} item={item} />;
          })}
      </ul>
    </div>
  );
};

export default LibraryListItems;
