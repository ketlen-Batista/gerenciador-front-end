import React from 'react';

import DocumentsPage from '@pages/DocumentsPage';
import EmployeeData from '@pages/EmployeeData';
import Employees from '@pages/Employees';
import ChangePassword from '@src/pages/ChangePassword';
import CompanyData from '@src/pages/CompanyData';
import ForgotPassword from '@src/pages/ForgotPassword';
import HomePage from '@src/pages/HomePage';
import { PointEletronic } from '@src/pages/PointEletronic';
import ProfilePage from '@src/pages/ProfilePage';
import ReportsPage from '@src/pages/ReportsPage';
import SettingsPage from '@src/pages/SettingsPage';
import SignIn from '@src/pages/SignIn';
import ErrorPage from '@templates/ErrorPage';
import { Navigate, createBrowserRouter } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import { AvailableRoutes } from './availableRoutes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={AvailableRoutes.home} replace />,
  },
  {
    path: AvailableRoutes.home,
    element: (
      <ProtectedRoute requiredPermission="home">
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: AvailableRoutes.pointCheckin,
    element: <PointEletronic />,
  },
  {
    path: AvailableRoutes.documentsPage,
    element: (
      <ProtectedRoute requiredPermission="documentsPage">
        <DocumentsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: AvailableRoutes.employeesDataPage,
    element: (
      <ProtectedRoute requiredPermission="pageEmployess">
        <EmployeeData />
      </ProtectedRoute>
    ),
  },
  {
    path: AvailableRoutes.employeesPage,
    element: (
      <ProtectedRoute requiredPermission="pageEmployess">
        <Employees />
      </ProtectedRoute>
    ),
  },
  {
    path: AvailableRoutes.reportsPage,
    element: (
      <ProtectedRoute requiredPermission="reports">
        <ReportsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: AvailableRoutes.settingsPage,
    element: (
      <ProtectedRoute requiredPermission="configs">
        <SettingsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: AvailableRoutes.profilePage,
    element: (
      // <ProtectedRoute requiredPermission="view_profile">
      <ProfilePage />
      // </ProtectedRoute>
    ),
  },
  {
    path: AvailableRoutes.company,
    element: (
      <ProtectedRoute requiredPermission="company">
        <CompanyData />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: <SignIn />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
  // {
  //   path: AvailableRoutes.error404,
  //   element: (
  //     // <ProtectedRoute>
  //     <ErrorPage />
  //     // </ProtectedRoute>
  //   ),
  // },
  {
    path: '/recuperar-senha',
    element: <ForgotPassword />,
  },
  {
    path: '/redefinir-senha',
    element: <ChangePassword />,
  },
]);

export { router };
