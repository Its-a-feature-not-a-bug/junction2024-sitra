import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import Layout from './components/Layout/Layout';
import Conversation from './pages/Conversation';

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Layout>
          <Home />
        </Layout>
      ),
    },
    {
      path: '/login',
      element: (
        <Layout>
          <Login />
        </Layout>
      ),
    },
    {
      path: '/conversation/:conversation_id',
      element: (
        <Layout>
          <Conversation />
        </Layout>
      ),
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
