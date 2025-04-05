import React, { useEffect, useState } from 'react';

import { Card, CardContent, Grid, Typography } from '@mui/material';
import {
  useCreateUserCheckpoint,
  useGetUserCheckpointByIdCurrentDay,
} from '@src/services/CheckinsPoints/queries';
import { uploadPhoto } from '@src/services/photoServices/api';
import { colors } from '@src/styles/colors';
import DefaultPage from '@src/templates/DefaultPage';
import { useNavigate } from 'react-router-dom';

import PhotoCaptureModal from './components/CameraModal';
import ButtonCustom from '@src/components/ButtonCustom';

import { useAuth } from '@hooks/useAuth';
import { useGetUserSchedules } from '@services/schedule/queries';

const OPTIONS_TYPES_POINTS = [
  { id: 1, title: 'Entrada', color: 'green' },
  { id: 2, title: 'Pausa', color: 'blue' },
  { id: 3, title: 'Retorno', color: '#FFC107' },
  { id: 4, title: 'Saída', color: 'red' },
];

export function PointEletronic() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: checkpointsDay, mutateAsync: getListCheckPoints } =
    useGetUserCheckpointByIdCurrentDay();
  const { data: userSchedulesData, mutateAsync: getUserSchedules } =
    useGetUserSchedules();
  const { mutateAsync: createUserCheckpoint, isPending: isPendingCheckpoint } =
    useCreateUserCheckpoint();

  const [currentTime, setCurrentTime] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedPhotoType, setSelectedPhotoType] = useState('');

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      );
    };
    updateCurrentTime();
    const interval = setInterval(updateCurrentTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (user?.id) {
      getListCheckPoints(user?.id);
      getUserSchedules(user?.id);
    }
  }, [user?.id]);

  const handleOpenCamera = (photoType: string) => {
    setSelectedPhotoType(photoType);
    setOpenModal(true);
  };

  const handleCloseCamera = () => {
    getListCheckPoints(user?.id);
    setOpenModal(false);
  };

  const createPoint = (
    idPhoto: number,
    location: { latitude: number; longitude: number },
  ) => {
    // if (location) {
    createUserCheckpoint({
      photoId: idPhoto,
      userId: user?.id,
      checkpointType: selectedPhotoType as string,
      latitude: location.latitude,
      longitude: location.longitude,
      status_value:
        selectedPhotoType?.toLocaleLowerCase() === 'entrada' ||
        selectedPhotoType?.toLocaleLowerCase() === 'retorno'
          ? 1
          : 9,
    });
  };

  const handleCapture = async ({
    photo,
    location,
  }: {
    photo: string;
    location: { latitude: number; longitude: number };
  }) => {
    const responsePhoto = await fetch(photo);
    const blob = await responsePhoto.blob();

    const file = new File([blob], `photo${selectedPhotoType}.jpg`, {
      type: 'image/jpeg',
    });

    const formData = new FormData();
    formData.append('photoFile', file as any);

    const response = await uploadPhoto(formData);
    if (response.id) {
      createPoint(response?.id, location);
    }
    setOpenModal(false);
  };

  return (
    <DefaultPage pageTitle="Ponto Digital">
      <div style={{ padding: '20px' }}>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          style={{ marginTop: '20px' }}
        >
          {OPTIONS_TYPES_POINTS.map((option) => {
            const disabled = checkpointsDay?.some(
              (checkpoint) =>
                checkpoint.checkpointType.toLowerCase() ===
                option.title.toLowerCase(),
            );
            return (
              <Grid item key={option.id}>
                <Card
                  sx={{
                    backgroundColor: !!disabled ? 'lightgray' : option.color,
                    color: 'white',
                    textAlign: 'center',
                  }}
                >
                  <CardContent>
                    <Typography mb={2} fontWeight="bold">
                      {option.title}
                    </Typography>
                    <ButtonCustom
                      variant="contained"
                      color="white"
                      bgColor={disabled ? 'gray' : colors.text.primary}
                      onClick={() => handleOpenCamera(option.title)}
                      disabled={!!disabled}
                    >
                      Bater ponto
                    </ButtonCustom>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>

      {/* Modal para Capturar Foto e Localização */}
      <PhotoCaptureModal
        open={openModal}
        onClose={handleCloseCamera}
        onCapture={handleCapture}
      />
    </DefaultPage>
  );
}
