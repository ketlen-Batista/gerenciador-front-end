import React from 'react';

import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { Box } from '@mui/material';
import { colors } from '@src/styles/colors';

import TextField from '@src/components/TextField';

interface UploadDocumentProps {
  documentName: string;
  handleDocumentNameChange: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadDocument = ({
  documentName,
  handleDocumentNameChange,
  handleFileChange,
}: UploadDocumentProps) => {
  return (
    <Box
      display="flex"
      height="400px"
      bgcolor={colors.basic.white}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      my={2}
    >
      <Box fontSize="18px" fontWeight={500}>
        Faça upload do arquivo desejado:
      </Box>

      <TextField
        type="text"
        placeholder="Nome do Documento"
        value={documentName}
        onChange={handleDocumentNameChange}
      />

      <Box fontSize="80px">
        <DriveFolderUploadIcon color="primary" fontSize="inherit" />
      </Box>

      <TextField type="file" onChange={handleFileChange} />
    </Box>
  );
};

export default UploadDocument;
