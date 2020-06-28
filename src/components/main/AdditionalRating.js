import React, { useState } from 'react';
import AdditionalRatingEntry from './AdditionalRatingEntry';
import {
  BALLAD,
  DANCE,
  HIPHOP,
  RB_SOUL,
  ROCK_METAL,
  INDIE,
  FOLK_BLUES,
  POP,
} from '../../lib/fixtures/sample';
import '../../styles/AdditionalRating.scss';

const AdditionalRating = (props) => {
  const {
    nickname,
    videoIdRatings,
    setVideoIdRatings,
    playerSize,
    musicAverage,
    ratingPeople,
  } = props;
  const [genre, setGenre] = useState(BALLAD);

  const genreArr = [
    { name: BALLAD, string: '발라드' },
    { name: DANCE, string: '댄스' },
    { name: HIPHOP, string: '힙합' },
    { name: RB_SOUL, string: '알앤비' },
    { name: ROCK_METAL, string: '락' },
    { name: INDIE, string: '인디' },
    { name: FOLK_BLUES, string: '포크' },
    { name: POP, string: '팝' },
  ];

  return (
    <div id="additional-rating" className={`player-brother-${playerSize}`}>
      <nav>
        {genreArr.map(({ name, string }) => {
          return (
            <p
              key={string}
              onClick={() => {
                setGenre(name);
              }}
            >
              {string}
            </p>
          );
        })}
      </nav>
      <ul>
        {genre.map((music) => (
          <AdditionalRatingEntry
            key={music.videoid}
            music={music}
            videoIdRatings={videoIdRatings}
            setVideoIdRatings={setVideoIdRatings}
            musicAverage={musicAverage}
            ratingPeople={ratingPeople}
          />
        ))}
      </ul>
    </div>
  );
};

export default AdditionalRating;
