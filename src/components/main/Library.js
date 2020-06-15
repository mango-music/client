import React, { useEffect, useState } from 'react';
import LibraryList from './LibraryList';
import LibraryListItems from './LibraryListItems';
import getUserMusicLists from '../../lib/apis/getUserMusicLists';
import '../../styles/Library.scss';

const Library = (props) => {
  const { setCurrentItems, setCurrentItem, customLists } = props;
  const [libraryList, setLibraryList] = useState(null);
  return (
    <div id="library">
      <header>Library</header>
      <ul>
        {customLists &&
          customLists.map((list) => {
            return (
              <LibraryList
                key={list._id}
                listName={list.listname}
                items={list.musics}
                setCurrentItems={setCurrentItems}
                setCurrentItem={setCurrentItem}
                setLibraryList={setLibraryList}
              />
            );
          })}
      </ul>
      {libraryList && (
        <LibraryListItems
          libraryList={libraryList}
          setLibraryList={setLibraryList}
          customLists={customLists}
        />
      )}
    </div>
  );
};

export default Library;
