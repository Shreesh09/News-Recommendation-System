import React from 'react';
import LoginPage from './LoginPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NewsDashboard from './NewsDashboard';

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


function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <NewsDashboard />
      </ThemeProvider>
    </div>
  );
}

export default App;
