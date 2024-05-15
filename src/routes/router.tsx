import React from 'react';

import DocumentsPage from '@pages/DocumentsPage';
import EmployeeData from '@pages/EmployeeData';
import Employees from '@pages/Employees';
import HomePage from '@src/pages/HomePage';
import ReportsPage from '@src/pages/ReportsPage';
import ErrorPage from '@templates/ErrorPage';
import { Navigate, createBrowserRouter } from 'react-router-dom';

// import ErrorPage from '@/components/templates/ErrorPage';
import { AvailableRoutes } from './availableRoutes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={AvailableRoutes.home} />,
  },
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

  //404 page
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

export { router };
