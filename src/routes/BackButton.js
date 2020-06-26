import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';

const BackButton = ({ nickname }) => {
  return (
    <IconButton
      aria-label="back-arrow-button"
      size="medium"
      component={RouterLink}
      to={`/@${nickname}`}
    >
      <ArrowBackIos
        style={{
          color: 'rgba(255,255,255,0.7)',
        }}
      />
    </IconButton>
  );
};

export default BackButton;
