import React from 'react';
import TableDataGrid from '/src/components/TableDataGrid';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';

function TableSettings() {
  const rows = [
    {
      id: '9d5b884e-8d72-4f29-8e23-f06ebe2394d0',
      documentName: 'Postinho 1',
      sentIn: '21/04/2024-11-20',
      sender: 'RG-GIC',
      employees: '15',
      received: '',
      visa: '',
      actions: '',
      office: 'Gerente',
      sector: 'Educação',
      section: 'Postinho 1',
      status: 'Ativa',
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
      sector: 'Saúde',
      section: 'Postinho 2',
      status: 'licença a maternidade',
      employees: '65',
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
      sector: 'TJ',
      section: ' Postinho 3',
      status: 'Ativa',
      employees: '25',
    },
  ];

  const columns = [
    {
      field: 'section',
      headerName: 'Seção',
      flex: 2,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
    },

    {
      field: 'sector',
      headerName: 'Setor',
      flex: 2,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
    },
  
    {
      field: 'employees',
      headerName: 'Quantidade de funcionários',
      flex: 2,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
    },
  
   
  ];

  return <TableDataGrid columns={columns} rows={rows} />;
};

export default TableSettings;
