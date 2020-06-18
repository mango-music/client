import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import App from './App';

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
      containedPrimary: {
        boxShadow: '0 5px 20px rgba(245, 0, 87, 0.3)',
        '&:hover': {
          boxShadow: 'none',
        },
      },
      textSecondary: {
        // color: '#ffd600',
      },
      sizeLarge: {
        width: '100%',
        borderRadius: 3,
        border: 0,
        height: 48,
        padding: '0 30px',
      },
    },
  },
});

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  );
};

export default Root;
