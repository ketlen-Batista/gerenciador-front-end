//PÁGINA FUNCIONARIOS
import React from 'react';

import DefaultPage from '@templates/DefaultPage';

import Filters from './Filters';
import TableEmployees from './TableEmployees';
import { EmployeesFilterProvider } from './contexts/employeesContext';

function Employees() {
  return (
    <DefaultPage pageTitle="Funcionários">
      <EmployeesFilterProvider>
        {/* FILTROS */}
        <Filters />

        {/* TABELA */}
        <TableEmployees />
      </EmployeesFilterProvider>
    </DefaultPage>
  );
}

export default Employees;
