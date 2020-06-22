import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import StyledMobileStepper from './StyledMobileStepper';

const ProgressMobileStepper = ({ evaluationCount }) => {
  return (
    <StyledMobileStepper
      variant="progress"
      steps={16}
      position="bottom"
      activeStep={evaluationCount}
      nextButton={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <span style={{ color: '#f73378' }}>
          {`${evaluationCount} \u2215 15`}
        </span>
      }
    />
  );
};
export default withStyles(null, { withTheme: true })(ProgressMobileStepper);
