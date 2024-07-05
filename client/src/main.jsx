import React from 'react'
import ReactDOM from 'react-dom/client'
import "./styles/index.css"
import {
  createHashRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './ErrorPage.jsx';
import LoginPage from './auth_pages/LoginPage.jsx';
import RegistrationPage from './auth_pages/RegistrationPage.jsx';
import NewsDashboard from './home_pages/NewsDashboard.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { recommendationLoader, historyLoader, searchLoader } from './loaders/news_loaders.jsx';
import { Home } from './home_pages/Home.jsx';
import { loginAction, registrationAction } from './actions/auth_actions.jsx';
import App from './App.jsx';


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

const redirectToDashboard = () => {return redirect('/home/dashboard/1')}
const redirectToLogin = () => {return redirect('/login')}

const router = createHashRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "",
        loader: redirectToLogin
      },
      {
        path: "/login",
        element: <LoginPage/>,
        errorElement: <ErrorPage/>,
        action: loginAction,
      },
      {
        path: "/register",
        element: <RegistrationPage/>,
        errorElement: <ErrorPage/>,
        action: registrationAction,
      },
      
    ]
  },
  {
    path: "/home",
    element: <Home/>,
    children: [
      {
        path:"",
        loader: redirectToDashboard,
      },
      {
        path: "/home/dashboard/:page",
        element: <NewsDashboard/>,
        errorElement: <ErrorPage/>,
        loader: recommendationLoader,
      },
      {
        path: "/home/history/:page",
        element: <NewsDashboard/>,
        errorElement: <ErrorPage/>,
        loader: historyLoader,
      },
      {
        path: "/home/search/:search/:page",
        element: <NewsDashboard/>,
        errorElement: <ErrorPage/>,
        loader: searchLoader,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
