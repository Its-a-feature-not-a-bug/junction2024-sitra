import { Box } from '@mui/material';
import Header from '../Header/Header';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box sx={{ minWidth: '100vw', minHeight: '100vh' }}>
      <Header />
      <main>{children}</main>
    </Box>
  );
};

export default Layout;
