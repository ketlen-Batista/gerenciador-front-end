import React from 'react';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box } from '@mui/material';

type Props = {
  imageAvatar?: number[] | null; // Tipo ajustado para array de bytes
  mt?: string;
  mb?: string;
  imageSrc?: string;
  width?: string | number;
  height?: string | number;
  fontSize?: string | number;
};

const ImageAvatar = ({
  imageAvatar,
  mt,
  mb,
  imageSrc,
  width,
  height,
  fontSize = 35,
}: Props) => {
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
          src={imageSrc}
        />
      ) : (
        <Box mt={mt ?? '32px'} mb={mb ?? '32px'} fontSize={fontSize}>
          <AccountCircleIcon fontSize="inherit" />
        </Box>
      )}
    </div>
  );
};

export default ImageAvatar;
