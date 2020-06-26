import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';

const StyledMobileStepper = withStyles((theme) => ({
  root: {
    maxWidth: '100%',
    flexGrow: 1,
    padding: '16px',
    fontSize: '0.75rem',
    backgroundColor: 'inherit',
  },
  progress: {
    width: '80%',
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
}))(MobileStepper);

export default StyledMobileStepper;
