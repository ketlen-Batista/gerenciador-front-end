import React from 'react';

import { Box } from '@mui/material';
import { colors } from '@src/styles/colors';
import { Navigate, Outlet } from 'react-router-dom';

import CircularProgress from '@src/components/CircularProgress';

import { useAuth } from '@hooks/useAuth';

const ProtectedRoute = () => {
  const { user, isLoadingStorageData } = useAuth();

  if (isLoadingStorageData) {
    return (
      <Box
        display="flex"
        height="800px"
        width="100%"
        alignItems="center"
        justifyContent="center"
        color={colors.primary.dark}
      >
        <CircularProgress size="large" color="inherit" />
      </Box>
    );
  }

  return user.id ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
