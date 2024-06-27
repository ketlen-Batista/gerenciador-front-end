import React, { useEffect } from 'react';

import { Badge } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
// import TableDataGrid from '../../../../components/TableDataGrid';
// import { DataGrid } from '@mui/x-data-grid';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { AvailableRoutes } from '@src/routes/availableRoutes';
import { useGetJobPositions } from '@src/services/jobPositions/queries';
import { useGetUsers } from '@src/services/users/queries';
import { useNavigate } from 'react-router-dom';

import TableDataGrid from '/src/components/TableDataGrid';

function TableEmployees() {
  const navigate = useNavigate();

  const { data: rows, mutate: getUsers } = useGetUsers();
  const { data: jobs, mutate: getJobs } = useGetJobPositions();

  const handleNavigate = (page, employeeId) => {
    navigate(page || '', { state: { employeeId } });
    console.log({ employeeId });
  };
  useEffect(() => {
    getUsers({});
    getJobs({});
  }, []);

  // const rows = [
  //   {
  //     id: '10',
  //     name: 'ketlen batista pereira sodre',
  //     email: 'maria@gmail.com',
  //     phone: '(61)991112254',
  //     cpf: '00058205444',
  //     address: 'rua 2, california',
  //     registration: '01',
  //     dateOfBirth: '01-01-1990',
  //     status: 'Ativa',
  //     office: 'Gerente',
  //     sector: 'Educação',
  //     section: 'Colégio Fátima Rodrigues',
  //   },
  //   {
  //     id: 'aad0daa8-c985-4695-bd41-3100ab28002f',
  //     name: 'Solange',
  //     email: 'solange@gmail.com',
  //     phone: '(61)991112254',
  //     cpf: '00058205444',
  //     address: 'rua 3, california',
  //     registration: '02',
  //     dateOfBirth: '02-01-1990',
  //     status: 'licença a maternidade',
  //     office: 'Diretor',
  //     sector: 'Saúde',
  //     section: 'Colégio Fátima',
  //   },
  //   {
  //     id: '123',
  //     name: 'Josefa',
  //     email: 'josefa@gmail.com',
  //     phone: '(61)991112254',
  //     cpf: '00058205441',
  //     address: 'rua 5, california',
  //     registration: '03',
  //     dateOfBirth: '07-01-1980',
  //     status: 'Ativa',
  //     office: 'Auxiliar de serviços Gerais',
  //     sector: 'TJ',
  //     section: 'Colégio Fátima',
  //   },
  // ];

  const columns = [
    {
      field: 'name',
      headerName: 'Nome',
      flex: 5,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
    },

    {
      field: 'jobPosition_id',
      headerName: 'Cargo',
      flex: 6,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
      renderCell: (params) => (
        <div>
          {jobs?.find((item) => item.value === params.row.jobPosition_id)?.name}
        </div>
      ),
    },
    {
      field: 'sector',
      headerName: 'Setor',
      flex: 4,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
    },
    {
      field: 'section',
      headerName: 'Seção',
      flex: 5,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 5,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
    },

    {
      field: 'actions',
      headerName: 'Ações',
      flex: 3,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            height: '100%',
          }}
        >
          <Tooltip title="Ver" placement="top">
            <IconButton
              onClick={() =>
                handleNavigate(AvailableRoutes.employeesDataPage, params.row.id)
              }
            >
              <div
                style={{
                  display: 'flex',
                  color: 'var(--Primary)',
                }}
              >
                <VisibilityOutlinedIcon fontSize="medium" />
              </div>
            </IconButton>
          </Tooltip>
          <Tooltip title="Editar" placement="top">
            <IconButton>
              <div
                style={{
                  display: 'flex',
                  color: 'var(--GrayDark200)',
                }}
                onClick={() =>
                  handleNavigate(
                    AvailableRoutes.employeesDataPage,
                    params.row.id,
                  )
                }
              >
                <CreateOutlinedIcon fontSize="medium" />
              </div>
            </IconButton>
          </Tooltip>

          <Tooltip title="Deletar" placement="top">
            <IconButton>
              <div
                style={{
                  display: 'flex',
                  color: 'var(--Danger)',
                }}
              >
                <DeleteOutlinedIcon fontSize="medium" />
              </div>
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];
  return (
    rows?.users && (
      <>
        <TableDataGrid columns={columns} rows={rows?.users} />
      </>
    )
  );
}

export default TableEmployees;
