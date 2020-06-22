import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
  palette: {
    // type: 'dark',
    primary: {
      main: '#ff146a',
      light: '#f73378',
    },
    secondary: {
      main: '#ffc400',
      light: '#ffcf33',
    },
  },
  typography: {
    fontFamily: 'inherit',
  },
  overrides: {
    MuiFormLabel: {
      root: {
        '&$focused': {
          color: '#303030',
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
          borderBottom: '1px solid #303030',
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
        color: '#ffd740',
      },
      label: {
        overflow: 'hidden', // no-scroll-bar
      },
      sizeLarge: {
        fontSize: '2.5rem',
      },
    },
    MuiButton: {
      contained: {
        boxShadow: '0 5px 20px rgba(245, 0, 87, 0.3)',
        '&:hover': {
          boxShadow: 'none',
        },
      },
      // outlinedPrimary: {
      //   border: '1px solid #ff146a',
      // },
      sizeLarge: {
        // width: '100%',
        height: 48,
        padding: '0 30px',
        fontSize: '1rem',
        // fontWeight: 700,
      },
    },
  },
});

export default theme;
