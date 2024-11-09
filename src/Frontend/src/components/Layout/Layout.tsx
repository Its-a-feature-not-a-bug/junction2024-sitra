import { Box } from '@mui/material';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Box sx={{ minWidth: '100vw', minHeight: '100vh' }}>
      <Header />
      <main>
        <Outlet />
      </main>
    </Box>
  );
};

export default Layout;
