import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import StyledMobileStepper from './StyledMobileStepper';

const ProgressMobileStepper = ({
  evaluationCount,
  handleRatingButtonClick,
  handleSkipButtonClick,
}) => {
  return (
    <StyledMobileStepper
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
