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
        onClick={async () => {
          console.log(`${props.title}을 재생합니다.`);
          const item = await getMusic();
          if (item === 'isExsistent') {
            // temp: 현재 절대 통과 안 됨
            // 별점을 이미 매긴 음악이라면 서버의 것을 가져온다.
            setCurrentItem(item);
            setCurrentItems([item]);
          } else {
            // 그렇지 않다면 데이터 형태를 바꿔준다.
            const item = {
              title: props.title,
              thumbnail: props.thumbnail,
              videoid: props.videoid,
              rating: 0, // 초기 rating은 0으로 한다?
            };
            const newCurrentItems = currentItems.slice();
            newCurrentItems.unshift(item);
            setCurrentItem(item);
            setCurrentItems(newCurrentItems);
          }
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
