import React, { useState } from 'react';

import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { Box, Tooltip } from '@mui/material';
import { colors } from '@src/styles/colors';

import ModalConfirm from '@src/components/ModalConfirm';
import TableDataGrid from '@src/components/TableDataGrid';

import { useJustificationsContext } from '../../hooks/useJustificationsContext';

import Filters from './Filters';

const JustificationsList = () => {
  const [isOpenModalApprove, setIsOpenModalApprove] = useState(false);
  const [isOpenModalDisapprove, setIsOpenModalDisapprove] = useState(false);
  const [idCertificate, setIdCertificate] = useState(null);

  const handleCloseModalDisapprove = () => {
    setIsOpenModalDisapprove(false);
    setIdCertificate(null);
  };

  const handleCloseModalApprove = () => {
    setIsOpenModalApprove(false);
    setIdCertificate(null);
  };

  const handleOpenModalDisapprove = (id: number) => {
    setIsOpenModalDisapprove(true);
    setIdCertificate(id);
  };

  const handleOpenModalApprove = (id: number) => {
    setIsOpenModalApprove(true);
    setIdCertificate(id);
  };
  const {
    users,
    fetchJustifications,
    justifications,
    loading,
    updateJustifications,
  } = useJustificationsContext();

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

    setIsOpenModalDisapprove(false);
    setIsOpenModalApprove(false);
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
    { field: 'justificationMessage', headerName: 'Justificativa', flex: 3 },
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
              onClick={() => handleOpenModalApprove(params.row.id as number)}
            >
              <AssignmentTurnedInIcon htmlColor="#1E90FF" />
            </Box>
          </Tooltip>

          <Tooltip title="Reprovar" placement="top">
            <Box
              display={'flex'}
              onClick={() => handleOpenModalDisapprove(params.row.id as number)}
            >
              <AssignmentTurnedInIcon htmlColor="#FF0000" />
            </Box>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Filters />
      <Box mt={5} bgcolor={colors.basic.white}>
        <TableDataGrid
          rows={justifications || []}
          columns={columns}
          loading={loading}
          pageSize={8}
        />
      </Box>
      {isOpenModalApprove && (
        <ModalConfirm
          openDialog={isOpenModalApprove}
          handleClose={handleCloseModalApprove}
          handleConfirm={() =>
            handleApprove({ id: idCertificate, approve: true })
          }
          titleModal="Aprovar"
          text="Tem certeza que deseja aprovar esta justificativa?"
          textButtonConfirm="Aprovar"
          colorButtonConfirm={colors.success.dark}
        />
      )}

      {isOpenModalDisapprove && (
        <ModalConfirm
          openDialog={isOpenModalDisapprove}
          handleClose={handleCloseModalDisapprove}
          handleConfirm={() =>
            handleApprove({ id: idCertificate, approve: false })
          }
          titleModal="Reprovar"
          text="Tem certeza que deseja reprovar esta justificativa?"
          textButtonConfirm="Reprovar"
          colorButtonConfirm={colors.error.dark}
        />
      )}
    </>
  );
};

export default JustificationsList;
