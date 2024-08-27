import React from 'react';

import { Box } from '@mui/material';
import { useUserCheckpointsContext } from '@pages/ReportsPage/hooks/useUserCheckpointsContext';
import { colors } from '@src/styles/colors';
import { formatDate } from '@src/utils/dates';

import TableDataGrid from '@src/components/TableDataGrid';

import LocalizationModal from '../LocalizationModal';
import PhotoModal from '../PhotoModal';

const UserCheckpointsList = () => {
  const {
    userCheckpoints,
    users,
    loading,
    handleOpenModalLocalization,
    openModalLocalization,
    handleCloseModalLocalization,
    coordinates,
    openModalPhoto,
    photoId,
    handleOpenModalPhoto,
    handleCloseModalPhoto,
  } = useUserCheckpointsContext();

  console.log({ openModalLocalization });

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
    {
      field: 'localization',
      headerName: 'Localização',
      flex: 3,
      renderCell: (params) =>
        params.row.latitude &&
        params.row.longitude && (
          <div
            onClick={() =>
              handleOpenModalLocalization(
                params.row.latitude,
                params.row.longitude,
              )
            }
            style={{
              cursor: 'pointer',
              color: 'blue',
              fontWeight: '500',
            }}
          >
            Ver localização
          </div>
        ),
    },
    {
      field: 'photo_user_checkin_id',
      headerName: 'Foto',
      flex: 2,
      renderCell: (params) =>
        params.row.latitude &&
        params.row.longitude && (
          <div
            onClick={() =>
              handleOpenModalPhoto(params.row.photo_user_checkin_id)
            }
            style={{
              cursor: 'pointer',
              color: 'blue',
              fontWeight: '500',
            }}
          >
            Ver Foto
          </div>
        ),
    },
    { field: 'status', headerName: 'Status', flex: 3 },
    // { field: 'justification', headerName: 'Justificativa', flex: 3 },
  ];

  console.log({ userCheckpoints });
  return (
    <Box mt={5} bgcolor={colors.basic.white}>
      <TableDataGrid
        rows={userCheckpoints || []}
        columns={columns}
        loading={loading}
      />
      {openModalLocalization && (
        <LocalizationModal
          openDialog={openModalLocalization}
          handleClose={handleCloseModalLocalization}
          latitude={coordinates?.latitude}
          longitude={coordinates?.longitude}
        />
      )}

      {openModalPhoto && (
        <PhotoModal
          openDialog={openModalPhoto}
          handleClose={handleCloseModalPhoto}
          photoId={photoId}
        />
      )}
    </Box>
  );
};

export default UserCheckpointsList;
