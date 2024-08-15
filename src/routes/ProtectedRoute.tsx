// import React from 'react';
// import { Box } from '@mui/material';
// import { colors } from '@src/styles/colors';
// import { Navigate, Outlet } from 'react-router-dom';
// import CircularProgress from '@src/components/CircularProgress';
// import { useAuth } from '@hooks/useAuth';
// const ProtectedRoute = () => {
//   const { user, isLoadingStorageData } = useAuth();
//   if (isLoadingStorageData) {
//     return (
//       <Box
//         display="flex"
//         height="800px"
//         width="100%"
//         alignItems="center"
//         justifyContent="center"
//         color={colors.primary.dark}
//       >
//         <CircularProgress size="large" color="inherit" />
//       </Box>
//     );
//   }
//   return user.id ? <Outlet /> : <Navigate to="/login" />;
// };
// export default ProtectedRoute;
////////////////////////////////////////////////////
import React from 'react';

import { Box } from '@mui/material';
import { colors } from '@src/styles/colors';
import { Navigate, Outlet } from 'react-router-dom';

import CircularProgress from '@src/components/CircularProgress';

import { useAuth } from '@hooks/useAuth';

type ProtectedRouteProps = {
  requiredPermission?: string; // Permissão necessária para acessar a rota
  redirectPath?: string; // Caminho para redirecionar se não tiver permissão
  children: React.ReactNode; // Adicione a propriedade children aqui
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredPermission,
  redirectPath = '/error',
  children,
}) => {
  const { user, permissions, isLoadingStorageData } = useAuth();

  if (isLoadingStorageData) {
    return (
      <Box
        display="flex"
        height="800px"
        width="100%"
        alignItems="center"
        justifyContent="center"
        color={colors.primary.dark} // Certifique-se de que colors.primary.dark está definido
      >
        <CircularProgress size="large" color="inherit" />
      </Box>
    );
  }

  // Se o usuário não está autenticado, redirecione para a página de login
  if (!user.id) {
    return <Navigate to="/login" />;
  }

  if (permissions && !permissions['desktop']) {
    return <Navigate to="/login" />;
  }

  // Verifique se o usuário tem a permissão necessária
  if (permissions && !permissions[requiredPermission]) {
    return <Navigate to={redirectPath} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
