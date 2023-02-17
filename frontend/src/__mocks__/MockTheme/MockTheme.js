import React from 'react';
import {createTheme, ThemeProvider} from '@mui/material';

function MockTheme({ children }) {
  const theme = createTheme({
    typography: {
      fontFamily: ['proxima-nova', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        'sans-serif'].join(',')
    },
    palette: {
      neutral: {
        main: '#64748B',
        contrastText: '#fff',
      },
    }
  })
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default MockTheme