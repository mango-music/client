import React from 'react';
import getMusic from '../../lib/apis/getMusic';
import { faPlus, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchEntry = (props) => {
  const { currentItems, setCurrentItem, setCurrentItems } = props;

  return (
    <li>
      <div className="search-image">
        <img src={props.thumbnail} />
      </div>
      <p
        onClick={() => {
          console.log(`${props.title}을 재생합니다.`);
          const newCurrentItems = [...currentItems];
          const item = {
            title: props.title,
            thumbnail: props.thumbnail,
            videoid: props.videoid,
            rating: 0, // 초기 rating은 0으로 한다?
          };
          // currentItems에 중복된 비디오가 있다면 삭제
          for (let i = 0; i < newCurrentItems.length; i++) {
            if (newCurrentItems[i].videoid === item.videoid) {
              newCurrentItems.splice(i, 1);
              break;
            }
          }
          newCurrentItems.unshift(item);
          setCurrentItem(item);
          setCurrentItems(newCurrentItems);
        }}
      >
        {props.title}
      </p>
      <button className="search-play">
        <FontAwesomeIcon icon={faPlus} color="#afafaf" />
      </button>
      <button className="search-ellipsis">
        <FontAwesomeIcon icon={faEllipsisV} color="#afafaf" />
      </button>
    </li>
  );
};

export default SearchEntry;
