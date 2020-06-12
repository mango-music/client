import React from 'react';
import getMusic from '../../lib/apis/getMusic';

const SearchEntry = (props) => {
  const { setCurrentItem, setCurrentItems } = props;
  return (
    <li
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
            videoId: props.videoId,
            rating: 0, // 초기 rating은 0으로 한다?
          };
          setCurrentItem(item);
          setCurrentItems([item]);
        }
      }}
    >
      <div>
        <img src={props.thumbnail} />
      </div>
      <p>{props.title}</p>
    </li>
  );
};

export default SearchEntry;
