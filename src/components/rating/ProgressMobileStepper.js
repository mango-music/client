import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from './MobileStepper';

const ProgressMobileStepper = ({
  evaluationCount,
  handleRatingButtonClick,
  handleSkipButtonClick,
}) => {
  return (
    <MobileStepper
      variant="progress"
      steps={6}
      position="bottom"
      activeStep={evaluationCount}
      nextButton={
        <span style={{ color: '#f73378' }}>
          {`${evaluationCount} \u2215 5`}
        </span>
      }
    />
  );
};

export default withStyles(null, { withTheme: true })(ProgressMobileStepper);
