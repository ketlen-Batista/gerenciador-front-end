import React, { useState } from 'react';

import { IconButton, Tooltip } from '@material-ui/core';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import useResponsive from '@src/hooks/useResponsive';
import { AvailableRoutes } from '@src/routes/availableRoutes';
import { useDeleteUser } from '@src/services/users/queries';
import { colors } from '@src/styles/colors';
import { basicNames } from '@src/utils/constants';
import { useNavigate } from 'react-router-dom';

import ModalConfirm from '@src/components/ModalConfirm';
import TableDataGrid from '@src/components/TableDataGrid';

import EmployeeCard from '../EmployeeCard';
import { useEmployeesFilter } from '../contexts/employeesContext';

function TableEmployees() {
  const navigate = useNavigate();

  const { isDesktop } = useResponsive();

  const { jobs, contracts, sectors, filteredUsers } = useEmployeesFilter();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);
  const { mutate: handleDeleteUser, isPending: isPendingDeleteUser } =
    useDeleteUser();
  const handleNavigate = (
    page: string,
    employeeId: string,
    fieldsDisabled: boolean,
  ) => {
    navigate(page || '', { state: { employeeId, fieldsDisabled } });
  };
  const handleOpenModalDelete = (userId: string) => {
    setIsOpenModal(true);
    setUserIdToDelete(userId);
  };
  const handleCloseModalDelete = () => {
    setIsOpenModal(false);
    setUserIdToDelete(null);
  };
  const handleDelete = () => {
    handleDeleteUser(userIdToDelete);
    handleCloseModalDelete();
  };
  const columns = [
    {
      field: 'name',
      headerName: 'Nome',
      flex: 3,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
    },
    {
      field: 'jobPosition_id',
      headerName: basicNames.office.singular,
      flex: 2,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
      renderCell: (params) => (
        <div>{jobs?.find((item) => item.value === params.value)?.name}</div>
      ),
    },
    {
      field: 'contracts_value',
      headerName: basicNames.sector.singular,
      flex: 2,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
      renderCell: (params) => (
        <div>
          {contracts?.find((item) => item.value === params.value)?.name}
        </div>
      ),
    },
    {
      field: 'sector_value',
      headerName: basicNames.section.singular,
      flex: 2,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
      renderCell: (params) => (
        <div>{sectors?.find((item) => item.value === params.value)?.name}</div>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 2,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
      renderCell: (params) => <div>{params.row?.status?.name}</div>,
    },
    {
      field: 'actions',
      headerName: 'Ações',
      flex: 2,
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
                handleNavigate(
                  AvailableRoutes.employeesDataPage,
                  params.row.id,
                  true,
                )
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
            <IconButton
              onClick={() =>
                handleNavigate(
                  AvailableRoutes.employeesDataPage,
                  params.row.id,
                  false,
                )
              }
            >
              <div
                style={{
                  display: 'flex',
                  color: 'var(--GrayDark200)',
                }}
              >
                <CreateOutlinedIcon fontSize="medium" />
              </div>
            </IconButton>
          </Tooltip>
          <Tooltip title="Deletar" placement="top">
            <IconButton onClick={() => handleOpenModalDelete(params.row.id)}>
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
    <>
      {' '}
      {!isDesktop ? (
        // Render Cards on mobile
        filteredUsers?.map((user) => (
          <EmployeeCard
            key={user.id}
            employee={user}
            jobs={jobs}
            contracts={contracts}
            sectors={sectors}
            onDelete={handleOpenModalDelete}
          />
        ))
      ) : (
        <TableDataGrid
          columns={columns}
          rows={filteredUsers || []}
          pageSize={7}
        />
      )}
      {isOpenModal && (
        <ModalConfirm
          openDialog={isOpenModal}
          handleClose={handleCloseModalDelete}
          handleConfirm={handleDelete}
          isLoading={isPendingDeleteUser}
          textButtonConfirm={'Excluir usuário'}
          colorButtonConfirm={colors.error.dark}
          text={
            'Essa ação não poderá ser desfeita. Deseja realmente excluir este usuário?'
          }
          titleModal={'Deletar'}
        />
      )}
    </>
  );
}
export default TableEmployees;
////////////////////////////////////////
// import React, { useState } from 'react';

// import { IconButton, Theme, Tooltip, useMediaQuery } from '@material-ui/core';
// import useResponsive from '@src/hooks/useResponsive';
// import { useDeleteUser } from '@src/services/users/queries';
// import { colors } from '@src/styles/colors';
// import { useNavigate } from 'react-router-dom';

// import ModalConfirm from '@src/components/ModalConfirm';
// import TableDataGrid from '@src/components/TableDataGrid';

// import EmployeeCard from '../EmployeeCard';
// import { useEmployeesFilter } from '../contexts/employeesContext';

// function TableEmployees() {
//   const navigate = useNavigate();
//   const { jobs, contracts, sectors, filteredUsers } = useEmployeesFilter();
//   const { isDesktop } = useResponsive();

//   const [isOpenModal, setIsOpenModal] = useState(false);
//   const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);

//   const { mutate: handleDeleteUser, isPending: isPendingDeleteUser } =
//     useDeleteUser();

//   const handleOpenModalDelete = (userId: string) => {
//     setIsOpenModal(true);
//     setUserIdToDelete(userId);
//   };

//   const handleCloseModalDelete = () => {
//     setIsOpenModal(false);
//     setUserIdToDelete(null);
//   };

//   const handleDelete = () => {
//     handleDeleteUser(userIdToDelete);
//     handleCloseModalDelete();
//   };

//   // Columns definition for DataGrid
//   const columns = [
//     { field: 'name', headerName: 'Nome', flex: 3 },
//     { field: 'jobPosition_id', headerName: 'Cargo', flex: 2 },
//     { field: 'sector_value', headerName: 'Setor', flex: 2 },
//     { field: 'contracts_value', headerName: 'Contrato', flex: 2 },
//     { field: 'status', headerName: 'Status', flex: 2 },
//     { field: 'actions', headerName: 'Ações', flex: 2 },
//   ];

//   return (
//     <>
//       {!isDesktop ? (
//         // Render Cards on mobile
//         filteredUsers?.map((user) => (
//           <EmployeeCard
//             key={user.id}
//             employee={user}
//             jobs={jobs}
//             contracts={contracts}
//             sectors={sectors}
//             onDelete={handleOpenModalDelete}
//           />
//         ))
//       ) : (
//         // Render Table on desktop
//         <TableDataGrid
//           columns={columns}
//           rows={filteredUsers || []}
//           pageSize={7}
//         />
//       )}

//       {isOpenModal && (
//         <ModalConfirm
//           openDialog={isOpenModal}
//           handleClose={handleCloseModalDelete}
//           handleConfirm={handleDelete}
//           isLoading={isPendingDeleteUser}
//           textButtonConfirm={'Excluir usuário'}
//           colorButtonConfirm={colors.error.dark}
//           text={
//             'Essa ação não poderá ser desfeita. Deseja realmente excluir este usuário?'
//           }
//           titleModal={'Deletar'}
//         />
//       )}
//     </>
//   );
// }

// export default TableEmployees;
