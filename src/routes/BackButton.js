import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: '0.5rem',
  },
}));

const BackButton = ({ nickname }) => {
  const classes = useStyles();
  return (
    <IconButton
      aria-label="back-arrow-button"
      size="small"
      classes={classes}
      component={RouterLink}
      to={`/@${nickname}`}
    >
      <ArrowBackIos
        style={{
          color: 'rgba(255,255,255,0.7)',
          fontSize: 23,
        }}
      />
    </IconButton>
  );
};

export default BackButton;
