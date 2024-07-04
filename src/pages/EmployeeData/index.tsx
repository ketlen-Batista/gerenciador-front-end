import React from 'react';

import DefaultPage from '@templates/DefaultPage';

import Form from '@pages/EmployeeData/components/Form';

import { EmployeeDataProvider } from './contexts/EmployeeDataContext';

function EmployeeData() {
  return (
    <DefaultPage pageTitle="Dados do Funcionário">
      <EmployeeDataProvider>
        <Form />
      </EmployeeDataProvider>
    </DefaultPage>
  );
}

export default EmployeeData;
