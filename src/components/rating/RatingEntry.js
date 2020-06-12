import React, { useMemo } from 'react';
import fixtures from '../../lib/fixtures/RatingFixtures';
import { Button, ButtonGroup, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const RatingEntry = ({ video, handleRatingUpdate, handleRatingSkip }) => {
  const classes = useStyles();
  const handleRatingButtonClick = (e) => {
    e.preventDefault();
    // console.log(e.currentTarget);
    handleRatingUpdate(video.videoId, e.currentTarget.value);
  };
  const handleSkipButtonClick = (e) => {
    handleRatingSkip();
  };
  return (
    <article className="rating_entry">
      <h2>이 노래는 어떤가요?</h2>
      <div>
        <img src={video.thumbnail} alt="thumbnail" />
      </div>
      <h3>{video.title}</h3>
      <div className={classes.root}>
        <ButtonGroup
          orientation="vertical"
          color="primary"
          aria-label="vertical outlined primary button group"
        >
          {fixtures.map((fixture) => (
            <Button
              value={fixture.value}
              onClick={handleRatingButtonClick}
              className="rating_button"
            >
              <img src={fixture.img_src} alt={fixture.img_alt} />
              <span>{fixture.copy}</span>
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <div>
        <Button onClick={handleSkipButtonClick}>모르는 노래에요</Button>
      </div>
    </article>
  );
};

export default RatingEntry;
