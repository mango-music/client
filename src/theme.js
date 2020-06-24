import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { PlayCircleFilledWhiteRounded } from '@material-ui/icons';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#ffb347',
      // light: '#ffcd38',
    },
    secondary: {
      main: '#2196f3',
    },
  },
  typography: {
    fontFamily: 'inherit',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
  },
  overrides: {
    MuiContainer: {
      root: {
        paddingTop: '44px',
        scrollPaddingTop: '44px',
        backgroundColor: '#303030',
        height: '100vh',
      },
    },
    MuiFormLabel: {
      root: {
        '&$focused': {
          color: 'inherit',
        },
      },
      focused: {},
    },
    MuiInputBase: {
      root: {
        fontSize: '1.125rem', // 20px (16px)
      },
    },
    MuiInput: {
      underline: {
        '&:after': {
          borderBottom: '2px solid #fff',
        },
      },
    },
    MuiInputAdornment: {
      root: {
        height: 'auto',
      },
    },
    MuiBottomNavigationAction: {
      root: {
        color: 'rgba(0, 0, 0, 0.38)',
      },
      label: {
        '&$selected': {
          fontSize: '0.75rem', // 12px (16px)
        },
      },
    },
    MuiRating: {
      root: {
        color: '#ffc107', // '#ffd740',
      },
      label: {
        overflow: 'hidden', // no-scroll-bar
      },
      sizeLarge: {
        fontSize: '2.5rem',
      },
    },
    MuiButton: {
      containedPrimary: {
        // background: 'linear-gradient(to right, #FF5F6D 0%, #FFC371 100%)',
        // background: 'linear-gradient(to right, #ffb347 0%, #ffcc33 100%)',
        // background: 'linear-gradient(90deg, #F7971E 0%, #FFD200 100%)',
        // background:
        //   'linear-gradient(135deg, rgba(255,23,68,1) 50%, rgba(255,152,0,1) 100%)',
        // background: '#ff9800',
        // 'linear-gradient(135deg, rgba(255,23,68,1) 0%, rgba(255,154,21,1) 100%)',
        color: '#fff',
        // boxShadow: '0 5px 20px rgba(255, 193, 7, 0.3)',
        // '&:hover': {
        //   boxShadow: 'none',
        // },
      },
      textSizeLarge: {},
      containedSizeLarge: {
        // fontSize: '1.125rem',
        fontWeight: 700,
      },
      sizeLarge: {
        width: '100%',
        height: 48,
        padding: '0 30px',
      },
    },
  },
});

export default theme;
