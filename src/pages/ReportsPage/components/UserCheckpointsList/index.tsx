import React from 'react';

import { Box } from '@mui/material';
import { useUserCheckpointsContext } from '@pages/ReportsPage/hooks/useUserCheckpointsContext';
import { formatDate } from '@src/utils/dates';

import TableDataGrid from '@src/components/TableDataGrid';

const UserCheckpointsList = () => {
  const { userCheckpoints, users, loading } = useUserCheckpointsContext();

  const columns = [
    {
      field: 'userId',
      headerName: 'Usuário',
      flex: 3,
      renderCell: (params) => (
        <div>{users.find((user) => user.id === params.row.userId)?.name}</div>
      ),
    },
    {
      field: 'timestamp',
      headerName: 'Data e horário',
      flex: 3,
      renderCell: (params) =>
        params?.value && <div>{formatDate(params.value)}</div>,
    },
    { field: 'checkpointType', headerName: 'Tipo', flex: 3 },
    { field: 'status', headerName: 'Status', flex: 3 },
    { field: 'justification', headerName: 'Justificativa', flex: 3 },
  ];

  return (
    <Box height="400px" mt={5}>
      <TableDataGrid
        rows={userCheckpoints || []}
        columns={columns}
        loading={loading}
      />
    </Box>
  );
};

export default UserCheckpointsList;
