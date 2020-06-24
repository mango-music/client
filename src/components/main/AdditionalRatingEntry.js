import React from 'react';
import MuiRating from '@material-ui/lab/Rating';
import postRatingMusic from '../../lib/apis/postRatingMusic';
import postDelRating from '../../lib/apis/postDelRating';

const AdditionalRatingEntry = (props) => {
  const { music, videoIdRatings } = props;
  const src = `https://www.youtube.com/embed/${music.videoid}?autoplay=0`;

  const getStars = () => {
    let rating = null;
    if (videoIdRatings[music.videoid]) {
      rating = videoIdRatings[music.videoid];
    }
    return rating;
  };

  return (
    <li>
      <div className="iframe-wrapper">
        <iframe
          title={music.videoid}
          type="text/html"
          src={src}
          frameBorder="0"
        />
      </div>
      <div className="stars">
        <MuiRating
          name="additionalRating"
          size="large"
          precision={0.5}
          value={getStars()} // 초기값
          onChange={(e, starsCount) => {
            console.log(
              `AdditionalRatingEntry : ${music.title}에 ${starsCount}점을 매깁니다.`,
            );
            if (starsCount) {
              // 별점을 매길 때
              postRatingMusic(music, starsCount);
            } else {
              // 별점을 삭제할 때
              postDelRating(music.videoid);
            }
          }}
        />
      </div>
      <p>{music.title}</p>
    </li>
  );
};

export default AdditionalRatingEntry;
