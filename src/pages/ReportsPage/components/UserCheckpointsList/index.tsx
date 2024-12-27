import React, { ReactNode, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Grid, Pagination, Tooltip } from '@mui/material';
import { useUserCheckpointsContext } from '@pages/ReportsPage/hooks/useUserCheckpointsContext';
import useResponsive from '@src/hooks/useResponsive';
import { useDeleteUserCheckpoint } from '@src/services/CheckinsPoints/queries';
import { colors } from '@src/styles/colors';
import { OPTIONS_TYPES_POINTS } from '@src/utils/constants';
import { formatDate } from '@src/utils/dates';

import PhotoModal from '../../../../components/PhotoModal';
import ModalConfirm from '@src/components/ModalConfirm';
import TableDataGrid from '@src/components/TableDataGrid';

import { CardCheckPoint } from '../CardCheckPoint';
import LocalizationModal from '../LocalizationModal';

export type OptionProps = {
  id: number;
  title: string;
  bgColor?: string;
  icon?: ReactNode;
};

const ITEMS_PER_PAGE = 4;

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
    isLoadingUserCheckpoints,
    handleGetUserCheckpoints,
  } = useUserCheckpointsContext();

  const { isDesktop } = useResponsive();
  const { mutateAsync: deletePoint, isPending: isLoadingDeletPoint } =
    useDeleteUserCheckpoint();

  const [isOpenModalDeletePoint, setIsOpenModalDeletePoint] = useState(false);
  const [checkpointIdToDelete, setCheckpointIdToDelete] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
  };

  const paginatedCheckpoints = userCheckpoints?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleOpenModalDeletePoint = (checkpointId: number) => {
    setIsOpenModalDeletePoint(true);
    setCheckpointIdToDelete(checkpointId);
  };

  const handleCloseModalDeletePoint = () => {
    setIsOpenModalDeletePoint(false);
    setCheckpointIdToDelete(null);
    handleGetUserCheckpoints();
  };

  const handleDeletePoint = async () => {
    await deletePoint(checkpointIdToDelete);
    handleCloseModalDeletePoint();
  };

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
          <Box
            display="flex"
            justifyContent="start"
            alignItems="center"
            height="100%"
          >
            <Box
              component="div"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius={4}
              bgcolor={
                colors.statusColors[params?.row?.status?.value ?? 20] ??
                colors.statusColors[20]
              }
              color={'#FFF'}
              fontWeight={'bold'}
              fontSize={'14px'}
              px={1}
              height={'40px'}
              minWidth={'100px'}
            >
              {params?.row?.status?.name ?? ''}
            </Box>
          </Box>
        ),
    },
    {
      field: 'id',
      headerName: '',
      flex: 1.3,
      renderCell: (params) =>
        params?.value && (
          <Tooltip title="Excluir Ponto" arrow>
            <Box
              onClick={() => handleOpenModalDeletePoint(params.value)}
              sx={{ cursor: 'pointer' }}
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <DeleteIcon />
            </Box>
          </Tooltip>
        ),
    },
  ];

  // Renderização do Card para dispositivos mobile

  return (
    <Box
      mt={5}
      // bgcolor={colors.basic.white}
    >
      {isDesktop ? (
        // Renderiza a tabela no desktop
        <Box bgcolor={colors.basic.white}>
          <TableDataGrid
            rows={userCheckpoints || []}
            columns={columns}
            loading={isLoadingUserCheckpoints}
            // pageSizeOptions={[4, 8, 16]}
            pagination
            pageSize={4}
          />
        </Box>
      ) : (
        // Renderiza os cards no mobile
        //   <Grid container spacing={2}>
        //     {userCheckpoints?.map((checkpoint) =>
        //       checkpoint?.id ? (
        //         <Grid item xs={12} key={checkpoint?.id}>
        //           <CardCheckPoint
        //             checkpointObject={checkpoint}
        //             handleOpenModalLocalization={handleOpenModalLocalization}
        //             handleOpenModalPhoto={handleOpenModalPhoto}
        //           />
        //         </Grid>
        //       ) : null,
        //     )}
        //   </Grid>
        // )}

        <>
          <Grid container spacing={2}>
            {paginatedCheckpoints?.map((checkpoint) =>
              checkpoint?.id ? (
                <Grid item xs={12} key={checkpoint?.id}>
                  <CardCheckPoint
                    checkpointObject={checkpoint}
                    handleOpenModalLocalization={handleOpenModalLocalization}
                    handleOpenModalPhoto={handleOpenModalPhoto}
                  />
                </Grid>
              ) : null,
            )}
          </Grid>

          {userCheckpoints && userCheckpoints.length > ITEMS_PER_PAGE && (
            <Box display="flex" justifyContent="center" mt={2} mx={1}>
              <Pagination
                count={Math.ceil(userCheckpoints.length / ITEMS_PER_PAGE)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                siblingCount={0}
              />
            </Box>
          )}
        </>
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

      {isOpenModalDeletePoint && (
        <ModalConfirm
          openDialog={isOpenModalDeletePoint}
          handleClose={handleCloseModalDeletePoint}
          handleConfirm={handleDeletePoint}
          titleModal="Excluir Ponto"
          text="Tem certeza que deseja excluir este ponto?"
          textButtonConfirm="Excluir"
          colorButtonConfirm={colors.error.dark}
          isLoading={isLoadingDeletPoint}
        />
      )}
    </Box>
  );
};

export default UserCheckpointsList;
