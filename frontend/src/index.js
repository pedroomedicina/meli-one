import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {RouterProvider} from "react-router-dom";
import {router} from "./settings/Router";
import {createTheme, ThemeProvider} from '@mui/material';
import WithPurchasesProvider from "./contexts/PurchasesProvider";


const theme = createTheme({
  typography: {
    fontFamily: ['proxima-nova', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      'sans-serif'].join(',')
  },
  palette: {
    neutral: {
      main: '#00000',
      contrastText: '#fff',
    },
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <WithPurchasesProvider>
        <RouterProvider router={router}/>
      </WithPurchasesProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
