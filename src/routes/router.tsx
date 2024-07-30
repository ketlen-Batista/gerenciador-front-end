// import React from 'react';
// import DocumentsPage from '@pages/DocumentsPage';
// import EmployeeData from '@pages/EmployeeData';
// import Employees from '@pages/Employees';
// import HomePage from '@src/pages/HomePage';
// import ReportsPage from '@src/pages/ReportsPage';
// import SettingsPage from '@src/pages/SettingsPage';
// import ErrorPage from '@templates/ErrorPage';
// import { Navigate, createBrowserRouter } from 'react-router-dom';
// // import ErrorPage from '@/components/templates/ErrorPage';
// import { AvailableRoutes } from './availableRoutes';
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Navigate to={AvailableRoutes.home} />,
//   },
//   {
//     path: AvailableRoutes.home,
//     element: <HomePage />,
//   },
//   {
//     path: AvailableRoutes.documentsPage,
//     element: <DocumentsPage />,
//   },
//   {
//     path: AvailableRoutes.employeesDataPage,
//     element: <EmployeeData />,
//   },
//   {
//     path: AvailableRoutes.employeesPage,
//     element: <Employees />,
//   },
//   {
//     path: AvailableRoutes.reportsPage,
//     element: <ReportsPage />,
//   },
//   {
//     path: AvailableRoutes.settingsPage,
//     element: <SettingsPage />,
//   },
//   //404 page
//   {
//     path: '*',
//     element: <ErrorPage />,
//   },
// ]);
// export { router };
import React from 'react';

import DocumentsPage from '@pages/DocumentsPage';
import EmployeeData from '@pages/EmployeeData';
import Employees from '@pages/Employees';
import HomePage from '@src/pages/HomePage';
import ProfilePage from '@src/pages/ProfilePage';
import ReportsPage from '@src/pages/ReportsPage';
import SettingsPage from '@src/pages/SettingsPage';
import SignIn from '@src/pages/SignIn';
import ErrorPage from '@templates/ErrorPage';
import { Navigate, createBrowserRouter } from 'react-router-dom';

// Supondo que você tenha uma página de login
import ProtectedRoute from './ProtectedRoute';
// O caminho correto para o componente
import { AvailableRoutes } from './availableRoutes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={AvailableRoutes.home} replace />,
  },
  {
    path: AvailableRoutes.home,
    element: <ProtectedRoute />, // Envolva suas rotas protegidas com o ProtectedRoute
    children: [
      {
        path: AvailableRoutes.home,
        element: <HomePage />,
      },
      {
        path: AvailableRoutes.documentsPage,
        element: <DocumentsPage />,
      },
      {
        path: AvailableRoutes.employeesDataPage,
        element: <EmployeeData />,
      },
      {
        path: AvailableRoutes.employeesPage,
        element: <Employees />,
      },
      {
        path: AvailableRoutes.reportsPage,
        element: <ReportsPage />,
      },
      {
        path: AvailableRoutes.settingsPage,
        element: <SettingsPage />,
      },
      {
        path: AvailableRoutes.profilePage,
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: '/login',
    element: <SignIn />,
  },
  //404 page
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

export { router };
