import React from 'react'
import ReactDOM from 'react-dom/client'
import "./index.css"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './ErrorPage.jsx';
import LoginPage from './LoginPage.jsx';
import RegistrationPage from './RegistrationPage.jsx';
import NewsDashboard from './NewsDashboard.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { recommendationLoader, historyLoader, searchLoader } from './news_loaders.jsx';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Replace with your desired primary color
    },
    secondary: {
      main: '#FFFFFF', // Replace with your desired secondary color
    },
    text: {
      primary: '#000000',
      secondary: '#626C6F',
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/login",
    element: <LoginPage/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/register",
    element: <RegistrationPage/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/dashboard/:page",
    element: <NewsDashboard/>,
    errorElement: <ErrorPage/>,
    loader: recommendationLoader,
  },
  {
    path: "/history/:page",
    element: <NewsDashboard/>,
    errorElement: <ErrorPage/>,
    loader: historyLoader,
  },
  {
    path: "/search/:search/:page",
    element: <NewsDashboard/>,
    errorElement: <ErrorPage/>,
    loader: searchLoader,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
