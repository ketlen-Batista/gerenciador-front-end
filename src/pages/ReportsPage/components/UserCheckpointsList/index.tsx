import React, { ReactNode } from 'react';

import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import FreeBreakfastOutlinedIcon from '@mui/icons-material/FreeBreakfastOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
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

import HoursSummaryTable from '../HoursSummaryTable';
import LocalizationModal from '../LocalizationModal';
import UserHoursDashboard from '../UserHoursDashboard';

export type OptionProps = {
  id: number;
  title: string;
  bgColor?: string;
  icon?: ReactNode;
};

export const OPTIONS_TYPES_POINTS: OptionProps[] = [
  {
    id: 1,
    title: 'Entrada',
    bgColor: '#00B37E',
    icon: <ExitToAppOutlinedIcon />,
  },

  {
    id: 2,
    title: 'Pausa',
    bgColor: '#0000FF',
    icon: <EmojiFoodBeverageIcon />,
  },

  {
    id: 3,
    title: 'Retorno',
    bgColor: '#FFA500',
    icon: <FreeBreakfastOutlinedIcon />,
  },

  {
    id: 4,
    title: 'Saída',
    bgColor: '#FF0000',
    icon: <LogoutOutlinedIcon />,
  },
];

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
        <Box fontWeight="bold">
          {users.find((user) => user.id === params.row.userId)?.name}
        </Box>
      ),
    },
    {
      field: 'timestamp',
      headerName: 'Data e horário',
      flex: 3,
      renderCell: (params) =>
        params?.value && <div>{formatDate(params.value)}</div>,
    },
    {
      field: 'checkpointType',
      headerName: 'Tipo',
      flex: 2,
      renderCell: (params) => {
        const option = OPTIONS_TYPES_POINTS.find(
          (item) => item.title.toLowerCase() === params.value?.toLowerCase(),
        );

        // Retorna o Box com as propriedades correspondentes, ou um valor padrão
        return option ? (
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              color={option?.bgColor}
            >
              {option?.icon}
            </Box>
            <Box color={option?.bgColor} fontWeight="bold" ml={1}>
              {option?.title}
            </Box>
          </Box>
        ) : (
          <Box color="gray" fontWeight="normal">
            {params.value}
          </Box>
        );
      },
    },
    {
      field: 'localization',
      headerName: 'Localização',
      flex: 3,
      renderCell: (params) =>
        params.row.latitude && params.row.longitude ? (
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
        ) : (
          <Box> -------------------- </Box>
        ),
    },
    {
      field: 'photo_user_checkin_id',
      headerName: 'Foto',
      flex: 3,
      renderCell: (params) =>
        params.row.latitude && params.row.longitude ? (
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
        ) : (
          <Box> ----------- </Box>
        ),
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 3,
      renderCell: (params) =>
        params?.row?.status?.value && (
          <Box display="flex" justifyContent="flex-start" alignItems="center">
            <Box
              component="div"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius={4}
              bgcolor={colors.statusColors[params?.row?.status?.value ?? 8]}
              color={colors.basic.white}
              fontWeight={'bold'}
              fontSize={'14px'}
              px={1}
              sx={{
                opacity: 0.9,
              }}
            >
              {params?.row?.status?.name ?? ''}
            </Box>
          </Box>
        ),
    },
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
          // rows={userCheckpoints || []}
          rows={[...(userCheckpoints || [])].reverse()}
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
