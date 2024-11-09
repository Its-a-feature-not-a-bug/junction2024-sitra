import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import Layout from './components/Layout/Layout';

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '',
          element: <Home />,
        },
        {
          path: 'login',
          element: <Login />,
        },
      ],
    },
  ]);

  const theme = createTheme({
    typography: {
      fontFamily: 'Roboto,Arial,sans-serif',
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
