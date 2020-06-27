import React from 'react';
import MuiRating from '@material-ui/lab/Rating';
import postRatingMusic from '../../lib/apis/postRatingMusic';
import postDelRating from '../../lib/apis/postDelRating';

const AdditionalRatingEntry = (props) => {
  const {
    music,
    videoIdRatings,
    setVideoIdRatings,
    musicAverage,
    ratingPeople,
  } = props;
  const src = `https://www.youtube.com/embed/${music.videoid}?autoplay=0`;
  const averageMusicRating = musicAverage[music.videoid] // 에러방지 삼항 연산자
    ? musicAverage[music.videoid].toFixed(1)
    : null;
  const ratingCount = ratingPeople[music.videoid];
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
      <p>{music.title}</p>
      <div className="stars">
        <MuiRating
          name={music.videoid}
          size="large"
          precision={0.5}
          value={getStars()} // 초기값
          onChange={(e, starsCount) => {
            console.log(
              `AdditionalRatingEntry : ${music.title}에 ${starsCount}점을 매깁니다.`,
            );
            if (starsCount === null) {
              // 별점을 삭제할 때
              postDelRating(music, videoIdRatings, setVideoIdRatings);
            } else {
              // 별점을 매길 때
              postRatingMusic(
                music,
                starsCount,
                videoIdRatings,
                setVideoIdRatings,
              );
            }
          }}
        />
      </div>
      {ratingCount && (
        <div className="rating-average">
          <p>평균 {averageMusicRating}</p>
          <p>({ratingCount}명)</p>
        </div>
      )}
    </li>
  );
};

export default AdditionalRatingEntry;
