// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import useAuth from '@hooks/useAuth';
// // Importe o hook de autenticação
// const ProtectedRoute = () => {
//   const { isAuthenticated } = useAuth();
//   console.log({ isAuthenticated });
//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
// };
// export default ProtectedRoute;
import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@hooks/useAuth';

// Importe o hook de autenticação

const ProtectedRoute = () => {
  const { user, isLoadingStorageData } = useAuth();

  if (isLoadingStorageData) {
    return <div />;
  }

  console.log('user.id', user.id);
  return user.id ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
