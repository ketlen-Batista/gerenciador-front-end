import React, { useEffect } from 'react';

import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { Box, Tooltip } from '@mui/material';
import { useUserCheckpointsContext } from '@pages/ReportsPage/hooks/useUserCheckpointsContext';
import {
  useGetJustificationsList,
  useUpdateJustification,
} from '@src/services/Justifications/queries';
import { colors } from '@src/styles/colors';

import TableDataGrid from '@src/components/TableDataGrid';

const JustificationsList = () => {
  const { users } = useUserCheckpointsContext();

  const {
    mutateAsync: getJustifications,
    data: justificationsList,
    isPending: loading,
  } = useGetJustificationsList();

  const { mutateAsync: updateJustifications, isPending: loadingUpdate } =
    useUpdateJustification();

  const handleApprove = async ({
    id,
    approve,
  }: {
    id: number;
    approve: boolean;
  }) => {
    await updateJustifications({
      id: id.toString(),
      approve: approve,
    });

    getJustifications({});
  };

  const columns = [
    {
      field: 'userId',
      headerName: 'Usuário',
      flex: 2,
      renderCell: (params) => (
        <div>{users.find((user) => user.id === params.row.userId)?.name}</div>
      ),
    },
    {
      field: 'dateJustification',
      headerName: 'Data',
      flex: 1,
      renderCell: (params) => params?.value && <div>{params.value}</div>,
    },
    { field: 'pointType', headerName: 'Tipo de ponto', flex: 1 },
    { field: 'justificationMessage', headerName: 'justificativa', flex: 3 },
    {
      field: 'approve',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => (
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'start'}
          height={'100%'}
          width={'100%'}
        >
          <Box
            bgcolor={
              params.value == true
                ? 'green'
                : params.value == false
                  ? 'red'
                  : 'yellow'
            }
            color={
              params.value == true
                ? 'white'
                : params.value == false
                  ? 'white'
                  : 'black'
            }
            fontWeight={500}
            p={1}
            width={'fit-content'}
            height={'2rem'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            borderRadius={'15px'}
          >
            {params.value == true
              ? 'Aprovada'
              : params.value == false
                ? 'Reprovada'
                : 'Pendente'}
          </Box>
        </Box>
      ),
    },
    {
      field: 'actions',
      headerName: '',
      flex: 1,
      renderCell: (params) => (
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'start'}
          height={'100%'}
          width={'100%'}
        >
          <Tooltip title="Aprovar" placement="top">
            <Box
              display={'flex'}
              mr={5}
              onClick={() =>
                handleApprove({ id: params.row.id, approve: true })
              }
            >
              <AssignmentTurnedInIcon htmlColor="#1E90FF" />
            </Box>
          </Tooltip>

          <Tooltip title="Reprovar" placement="top">
            <Box
              display={'flex'}
              onClick={() =>
                handleApprove({ id: params.row.id, approve: false })
              }
            >
              <AssignmentTurnedInIcon htmlColor="#FF0000" />
            </Box>
          </Tooltip>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    getJustifications({});
  }, []);

  return (
    <Box mt={5} bgcolor={colors.basic.white}>
      <TableDataGrid
        rows={justificationsList || []}
        columns={columns}
        loading={loading}
        pageSize={8}
      />
    </Box>
  );
};

export default JustificationsList;
