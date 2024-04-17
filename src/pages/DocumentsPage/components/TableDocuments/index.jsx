import React from 'react';
import TableDataGrid from '/src/components/TableDataGrid';
// import TableDataGrid from '../../../../components/TableDataGrid';
// import { DataGrid } from '@mui/x-data-grid';

function TableEmployees() {
  const rows = [
    {
      id: '9d5b884e-8d72-4f29-8e23-f06ebe2394d0',
      documentName: 'documento1.pdf',
      sentIn: '21/04/2024-11-20',
      sender: 'RG-GIC',
      recipient: 'Fulana da Silva',
      received: '',
      visa: '',
      actions: '',
      office: 'Gerente',
      sector: 'Educação',
      section: 'Colégio Fátima Rodrigues',
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
      section: 'Colégio Fátima',
      status: 'licença a maternidade',
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
      section: 'Colégio Fátima',
      status: 'Ativa',
    },
  ];

  const columns = [
    {
      field: 'documentName',
      headerName: 'Nome do documento',
      flex: 5,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
    },

    {
      field: 'sentIn',
      headerName: 'Enviado em:',
      flex: 4,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
    },
    {
      field: 'sender',
      headerName: 'Remetente',
      flex: 4,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
    },
    {
      field: 'recipient',
      headerName: 'Destinatário',
      flex: 4,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
    },
    {
      field: 'received',
      headerName: 'Recebido?',
      flex: 4,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
    },
    {
      field: 'visa',
      headerName: 'Visto',
      flex: 3,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
    },

    {
      field: 'actions',
      headerName: 'Ações',
      flex: 3,
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

export default TableEmployees;