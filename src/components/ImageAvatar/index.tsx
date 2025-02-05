import React, { ReactNode } from 'react';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box } from '@mui/material';

import * as S from './styles';

type Props = {
  imageAvatar?: number[] | null; // Tipo ajustado para array de bytes
  mt?: string;
  mb?: string;
  imageSrc?: string;
  width?: string | number;
  height?: string | number;
};

const ImageAvatar = ({
  imageAvatar,
  mt,
  mb,
  imageSrc,
  width,
  height,
}: Props) => {
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
      {imageSrc && imageSrc?.length > 0 ? (
        <Box
          component="img"
          mt={mt ?? '32px'}
          mb={mb ?? '32px'}
          width={width ?? '35px'}
          height={height ?? '35px'}
          borderRadius={'50%'}
          // style={{
          //   marginTop: mt ?? '32px',
          //   marginBottom: mb ?? '32px',
          // }}
          src={imageSrc}
          // src={imageSrc}
        />
      ) : (
        <Box mt={mt ?? '32px'} mb={mb ?? '32px'} fontSize={35}>
          <AccountCircleIcon fontSize="inherit" />
        </Box>
      )}
    </div>
  );
};

export default ImageAvatar;
