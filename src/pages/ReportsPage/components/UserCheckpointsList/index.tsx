// import React from 'react';
// import { Box } from '@mui/material';
// import { useUserCheckpointsContext } from '@pages/ReportsPage/hooks/useUserCheckpointsContext';
// import { colors } from '@src/styles/colors';
// import { formatDate } from '@src/utils/dates';
// import PhotoModal from '../../../../components/PhotoModal';
// import TableDataGrid from '@src/components/TableDataGrid';
// import LocalizationModal from '../LocalizationModal';
// const UserCheckpointsList = () => {
//   const {
//     userCheckpoints,
//     users,
//     loading,
//     handleOpenModalLocalization,
//     openModalLocalization,
//     handleCloseModalLocalization,
//     coordinates,
//     openModalPhoto,
//     photoId,
//     handleOpenModalPhoto,
//     handleCloseModalPhoto,
//   } = useUserCheckpointsContext();
//   console.log({ openModalLocalization });
//   const columns = [
//     {
//       field: 'userId',
//       headerName: 'Usuário',
//       flex: 3,
//       renderCell: (params) => (
//         <div>{users.find((user) => user.id === params.row.userId)?.name}</div>
//       ),
//     },
//     {
//       field: 'timestamp',
//       headerName: 'Data e horário',
//       flex: 3,
//       renderCell: (params) =>
//         params?.value && <div>{formatDate(params.value)}</div>,
//     },
//     { field: 'checkpointType', headerName: 'Tipo', flex: 3 },
//     {
//       field: 'localization',
//       headerName: 'Localização',
//       flex: 3,
//       renderCell: (params) =>
//         params.row.latitude &&
//         params.row.longitude && (
//           <div
//             onClick={() =>
//               handleOpenModalLocalization(
//                 params.row.latitude,
//                 params.row.longitude,
//               )
//             }
//             style={{
//               cursor: 'pointer',
//               color: 'blue',
//               fontWeight: '500',
//             }}
//           >
//             Ver localização
//           </div>
//         ),
//     },
//     {
//       field: 'photo_user_checkin_id',
//       headerName: 'Foto',
//       flex: 2,
//       renderCell: (params) =>
//         params.row.latitude &&
//         params.row.longitude && (
//           <div
//             onClick={() =>
//               handleOpenModalPhoto(params.row.photo_user_checkin_id)
//             }
//             style={{
//               cursor: 'pointer',
//               color: 'blue',
//               fontWeight: '500',
//             }}
//           >
//             Ver Foto
//           </div>
//         ),
//     },
//     { field: 'status', headerName: 'Status', flex: 3 },
//     // { field: 'justification', headerName: 'Justificativa', flex: 3 },
//   ];
//   console.log({ userCheckpoints });
//   return (
//     <Box mt={5} bgcolor={colors.basic.white}>
//       <TableDataGrid
//         rows={userCheckpoints || []}
//         columns={columns}
//         loading={loading}
//       />
//       {openModalLocalization && (
//         <LocalizationModal
//           openDialog={openModalLocalization}
//           handleClose={handleCloseModalLocalization}
//           latitude={coordinates?.latitude}
//           longitude={coordinates?.longitude}
//         />
//       )}
//       {openModalPhoto && (
//         <PhotoModal
//           openDialog={openModalPhoto}
//           handleClose={handleCloseModalPhoto}
//           photoId={photoId}
//           titleModal={'Foto no momento do Ponto'}
//         />
//       )}
//     </Box>
//   );
// };
// export default UserCheckpointsList;
/////////////////////////////////////////////
import React from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { useUserCheckpointsContext } from '@pages/ReportsPage/hooks/useUserCheckpointsContext';
import useResponsive from '@src/hooks/useResponsive';
import { colors } from '@src/styles/colors';
import { formatDate } from '@src/utils/dates';

import PhotoModal from '../../../../components/PhotoModal';
import TableDataGrid from '@src/components/TableDataGrid';

import LocalizationModal from '../LocalizationModal';

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

  const { isDesktop } = useResponsive();

  // Colunas da Tabela (apenas para Desktop)
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
  ];

  // Renderização do Card para dispositivos mobile
  const renderCard = (checkpoint) => {
    const user = users.find((user) => user.id === checkpoint.userId)?.name;

    return (
      <Card key={checkpoint.id} sx={{ marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h6" component="div">
            Usuário: {user}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Data e horário: {formatDate(checkpoint.timestamp)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Tipo: {checkpoint.checkpointType}
          </Typography>
          {checkpoint.latitude && checkpoint.longitude && (
            <Button
              onClick={() =>
                handleOpenModalLocalization(
                  checkpoint.latitude,
                  checkpoint.longitude,
                )
              }
              sx={{ marginTop: 1 }}
            >
              Ver Localização
            </Button>
          )}
          {checkpoint.photo_user_checkin_id && (
            <Button
              onClick={() =>
                handleOpenModalPhoto(checkpoint.photo_user_checkin_id)
              }
              sx={{ marginTop: 1 }}
            >
              Ver Foto
            </Button>
          )}
          <Typography variant="body2" color="text.secondary">
            Status: {checkpoint.status}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box mt={5} bgcolor={colors.basic.white}>
      {isDesktop ? (
        // Renderiza a tabela no desktop
        <TableDataGrid
          rows={userCheckpoints || []}
          columns={columns}
          loading={loading}
          autoHeight
        />
      ) : (
        // Renderiza os cards no mobile
        <Grid container spacing={2}>
          {userCheckpoints.map((checkpoint) => (
            <Grid item xs={12} key={checkpoint.id}>
              {renderCard(checkpoint)}
            </Grid>
          ))}
        </Grid>
      )}

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
          titleModal={'Foto no momento do Ponto'}
        />
      )}
    </Box>
  );
};

export default UserCheckpointsList;
