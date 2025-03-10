//PÁGINA FUNCIONARIOS
import React from 'react';

import { Box } from '@mui/material';
import useResponsive from '@src/hooks/useResponsive';
import DefaultPage from '@templates/DefaultPage';

import Filters from './Filters';
import FiltersMobile from './FiltersMobile';
import TableEmployees from './TableEmployees';
import { EmployeesFilterProvider } from './contexts/employeesContext';

function Employees() {
  const { isDesktop } = useResponsive();

  return (
    <DefaultPage pageTitle="Funcionários">
      <EmployeesFilterProvider>
        {/* FILTROS */}
        {isDesktop ? (
          <Filters />
        ) : (
          <Box mb={4} mt={2}>
            <FiltersMobile />
          </Box>
        )}

        {/* TABELA */}
        <TableEmployees />
      </EmployeesFilterProvider>
    </DefaultPage>
  );
}

export default Employees;
