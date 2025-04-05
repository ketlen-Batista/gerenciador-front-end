import React, { useEffect, useRef, useState } from 'react';

import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import Webcam from 'react-webcam';

const CameraModal = ({ open, onClose, onCapture }) => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState(null);

  // Limpar estados quando o modal é aberto
  useEffect(() => {
    if (open) {
      setCapturedImage(null);
      setLocation(null);
      setLocationError(null);
      setIsLoadingLocation(false);
    }
  }, [open]);

  const handleCapture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) {
      alert(
        'Não foi possível capturar a imagem. Verifique se a câmera está funcionando.',
      );
      return;
    }

    setCapturedImage(imageSrc);
    setIsLoadingLocation(true);
    setLocationError(null);
    setLocation(null); // Garantir que o estado de localização esteja limpo antes de tentar novamente

    if (!navigator.geolocation) {
      setLocationError('Geolocalização não é suportada pelo seu navegador.');
      setIsLoadingLocation(false);
      return;
    }

    // Tentativa de obter a localização
    const geoSuccess = (position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
      });
      setLocationError(null);
      setIsLoadingLocation(false);
    };

    const geoError = (error) => {
      console.error('Erro ao obter localização:', error);
      setLocation(null);

      // Mensagens de erro mais descritivas baseadas no código de erro
      let errorMsg = '';
      switch (error.code) {
        case 1: // PERMISSION_DENIED
          errorMsg =
            'Permissão de localização negada. Por favor, permita o acesso à sua localização.';
          break;
        case 2: // POSITION_UNAVAILABLE
          errorMsg = 'Informação de localização indisponível no momento.';
          break;
        case 3: // TIMEOUT
          errorMsg = 'Tempo esgotado ao tentar obter localização.';
          break;
        default:
          errorMsg = `Erro desconhecido: ${error.message}`;
      }

      setLocationError(errorMsg);
      setIsLoadingLocation(false);
    };

    const geoOptions = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    };

    // Verificamos as permissões primeiro
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((permissionStatus) => {
          if (permissionStatus.state === 'denied') {
            // Se já está negado, nem tentamos
            setLocationError(
              'Permissão de localização está bloqueada. Por favor, habilite nas configurações do seu navegador.',
            );
            setIsLoadingLocation(false);
          } else {
            // Se está granted ou prompt, tentamos obter a localização
            navigator.geolocation.getCurrentPosition(
              geoSuccess,
              geoError,
              geoOptions,
            );

            // Configurar listener para mudanças de permissão
            permissionStatus.onchange = function () {
              if (this.state === 'granted' && isLoadingLocation) {
                navigator.geolocation.getCurrentPosition(
                  geoSuccess,
                  geoError,
                  geoOptions,
                );
              }
            };
          }
        })
        .catch((err) => {
          console.error('Erro ao verificar permissões:', err);
          // Fallback: tentar diretamente
          navigator.geolocation.getCurrentPosition(
            geoSuccess,
            geoError,
            geoOptions,
          );
        });
    } else {
      // Se o navegador não suporta a API de permissions, tenta diretamente
      navigator.geolocation.getCurrentPosition(
        geoSuccess,
        geoError,
        geoOptions,
      );
    }
  };

  const handleConfirm = async () => {
    if (capturedImage && location) {
      await onCapture({
        photo: capturedImage,
        location: location,
      });
      onClose();
    } else if (capturedImage && !location && !isLoadingLocation) {
      if (
        window.confirm(
          'Não foi possível obter sua localização. Deseja continuar sem ela?',
        )
      ) {
        onCapture({ image: capturedImage, location: null });
        onClose();
      }
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setLocation(null);
    setLocationError(null);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Capturar Foto</DialogTitle>
      <DialogContent>
        {!capturedImage ? (
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="100%"
            videoConstraints={{
              facingMode: 'environment', // Usar câmera traseira em dispositivos móveis
            }}
          />
        ) : (
          <>
            <img src={capturedImage} alt="Captura" style={{ width: '100%' }} />

            {isLoadingLocation && (
              <div style={{ textAlign: 'center', margin: '10px 0' }}>
                <CircularProgress size={24} />
                <Typography variant="body2" style={{ marginTop: 5 }}>
                  Obtendo localização...
                </Typography>
              </div>
            )}

            {location && !locationError && !isLoadingLocation && (
              <Typography
                variant="body2"
                color="primary"
                style={{ margin: '10px 0' }}
              >
                Localização obtida com sucesso!
              </Typography>
            )}

            {locationError && (
              <Typography
                variant="body2"
                color="error"
                style={{ margin: '10px 0' }}
              >
                {locationError}
              </Typography>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        {!capturedImage ? (
          <>
            <Button onClick={onClose} color="error">
              Cancelar
            </Button>
            <Button onClick={handleCapture} variant="contained" color="primary">
              Capturar
            </Button>
          </>
        ) : (
          <>
            <Button onClick={handleRetake} color="secondary">
              Nova Foto
            </Button>
            <Button
              onClick={handleConfirm}
              variant="contained"
              color="primary"
              disabled={isLoadingLocation}
            >
              Bater Ponto
              {!location && !locationError && isLoadingLocation ? '...' : ''}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CameraModal;
