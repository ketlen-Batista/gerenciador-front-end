//PÁGINA FUNCIONARIOS
import React from 'react';

import DefaultPage from '@templates/DefaultPage';

import Filters from './Filters';
import TableEmployees from './TableEmployees';

function Employees() {
  return (
    <DefaultPage pageTitle="Funcionários">
      {/* FILTROS */}
      <Filters />

      {/* TABELA */}
      <TableEmployees />
    </DefaultPage>
  );
}

export default Employees;
