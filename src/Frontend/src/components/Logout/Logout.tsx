import React from 'react';
import { useAuth } from '../../AuthContext';
import { Button } from '@mui/material';

const Logout = () => {
  const { logout } = useAuth();
  // Creates logout button
  return (
    <Button onClick={logout} variant="contained">
      Logout
    </Button>
  );
};

export default Logout;
