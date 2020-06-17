import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';

const StyledMobileStepper = withStyles({
  root: {
    maxWidth: '100%',
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: '16px',
  },
  progress: {
    width: '80%',
    borderRadius: 2,
  },
})(MobileStepper);

export default StyledMobileStepper;
