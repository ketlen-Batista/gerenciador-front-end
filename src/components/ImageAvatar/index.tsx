import React from 'react';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box } from '@mui/material';

import * as S from './styles';

type Props = {
  imageAvatar?: number[] | null; // Tipo ajustado para array de bytes
  mt?: string;
  mb?: string;
};

const ImageAvatar = ({ imageAvatar, mt, mb }: Props) => {
  // Função para converter bytes em URL válida para exibição
  const getImageUrl = () => {
    if (imageAvatar && imageAvatar?.length > 0) {
      const blob = new Blob([new Uint8Array(imageAvatar)], {
        type: 'image/jpeg',
      });
      return URL.createObjectURL(blob);
    }
    return '';
  };

  return (
    <div>
      {imageAvatar && imageAvatar?.length > 0 ? (
        <S.Image
          style={{
            marginTop: mt ?? '32px',
            marginBottom: mb ?? '32px',
          }}
          src={getImageUrl()}
        />
      ) : (
        <Box mt={mt ?? '32px'} mb={mb ?? '32px'} fontSize={120}>
          <AccountCircleIcon fontSize="inherit" />
        </Box>
      )}
    </div>
  );
};

export default ImageAvatar;
