import React, { useState } from 'react';
import MainHeader from './MainHeader';
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
  const { nickname, videoIdRatings, setVideoIdRatings } = props;
  const [genre, setGenre] = useState(BALLAD);

  const genreArr = [
    { name: BALLAD, string: 'BALLAD' },
    { name: DANCE, string: 'DANCE' },
    { name: HIPHOP, string: 'HIPHOP' },
    { name: RB_SOUL, string: 'RB_SOUL' },
    { name: ROCK_METAL, string: 'ROCK_METAL' },
    { name: INDIE, string: 'INDIE' },
    // { name: FOLK_BLUES, string: 'FOLK_BLUES' },
    { name: POP, string: 'POP' },
  ];

  return (
    <div id="additional-rating">
      <MainHeader title="Raiting" nickname={nickname} />
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
          />
        ))}
      </ul>
    </div>
  );
};

export default AdditionalRating;
