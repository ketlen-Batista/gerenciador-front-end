import React from 'react';
import TableDataGrid from '/src/components/TableDataGrid';
// import TableDataGrid from '../../../../components/TableDataGrid';
// import { DataGrid } from '@mui/x-data-grid';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Tooltip from '@material-ui/core/Tooltip';

function TableSettings() {
  const rows = [
    {
      id: '9d5b884e-8d72-4f29-8e23-f06ebe2394d0',
      name: 'ketlen batista pereira sodre',
      email: 'maria@gmail.com',
      phone: '(61)991112254',
      cpf: '00058205444',
      andress: 'rua 2, california',
      registration: '01',
      dateOfBirth: '01-01-1990',
      office: 'Gerente',
      sector: 'Postinho 1',
      section: 'Educação',
      status: 'Ativa',
      employees: '3',
    },
    {
      id: 'aad0daa8-c985-4695-bd41-3100ab28002f',
      name: 'Solange',
      email: 'solange@gmail.com',
      phone: '(61)991112254',
      cpf: '00058205444',
      andress: 'rua 3, california',
      registration: '02',
      dateOfBirth: '02-01-1990',
      office: 'Diretor',
      sector: 'Postinho 2',
      section: 'Saúde',
      status: 'licença a maternidade',
      employees: '2',
    },
    {
      id: 'a13fa6e6-1e0b-4801-b233-db3726a00eb5',
      name: 'Josefa',
      email: 'josefa@gmail.com',
      phone: '(61)991112254',
      cpf: '00058205441',
      andress: 'rua 5, california',
      registration: '03',
      dateOfBirth: '07-01-1980',
      office: 'Auxiliar de serviços Gerais',
      sector: 'Postinho 3',
      section: 'TJ',
      status: 'Ativa',
      employees: '1',
    },
  ];

  const columns = [
    {
      field: 'sector',
      headerName: 'Setor',
      flex: 1,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
    },
    {
      field: 'section',
      headerName: 'Seção',
      flex: 1,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
    },
    {
      field: 'employees',
      headerName: ' Qtd de funcionários',
      flex: 1,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
    },
  ];

  return (
    <>
      <TableDataGrid columns={columns} rows={rows} />
    </>
  );
}

export default TableSettings;
