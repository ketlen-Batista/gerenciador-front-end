import React, { useEffect } from 'react';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { AvailableRoutes } from '@src/routes/availableRoutes';
import { useGetJobPositions } from '@src/services/jobPositions/queries';
import { useGetUsers } from '@src/services/users/queries';
import { basicNames } from '@src/utils/constants';
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
      headerName: basicNames.office.singular,
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
      headerName: basicNames.sector.singular,
      flex: 4,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
    },
    {
      field: 'section',
      headerName: basicNames.section.singular,
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
