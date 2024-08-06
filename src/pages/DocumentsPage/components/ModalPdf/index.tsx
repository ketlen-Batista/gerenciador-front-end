import React, { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import {
  useLinkDocumentToUsers,
  useUploadDocument,
} from '@src/services/DocumentsService/queries';

import Button from '@src/components/Button';
import CircularProgress from '@src/components/CircularProgress';
import FullScreenDialog from '@src/components/FullScreenDialog';

import SelectUsersDocument from '../SelectUsersDocument';
import UploadDocument from '../UploadDocument';

interface ModalPdfProps {
  openDialog: boolean;
  handleClose: () => void;
  urlPdf: string;
  documentName: string;
}

const ModalPdf = ({
  openDialog,
  handleClose,
  urlPdf,
  documentName,
}: ModalPdfProps) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    // URL de exemplo para um PDF público
    const url = urlPdf;
    // 'https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf';
    setPdfUrl(url ?? '');
  }, [urlPdf]);

  if (!pdfUrl) {
    return <div>Carregando PDF...</div>;
  }

  return (
    <FullScreenDialog
      open={openDialog}
      onClose={handleClose}
      maxWidth={'md'}
      // fullScreen
      closeButtonPosition={'right'}
      title={documentName ?? ''}
      fullWidth
      style={{ zIndex: 1300 }}
      // extraFooterComponent={
      //   <Box display="flex" justifyContent="flex-end" width="100%">
      //     <Button
      //       onClick={handleUpload}
      //       disabled={
      //         !file || isLoading || !recipientId?.length || !typeDocument
      //       }
      //     >
      //       {isLoading ? (
      //         <CircularProgress size="small" color="primary" />
      //       ) : (
      //         'Enviar'
      //       )}
      //     </Button>
      //   </Box>
      // }
    >
      {/* <Box display="flex" flexDirection="row"> */}
      <iframe src={pdfUrl} width="100%" height="700px" title="pdf" />
      {/* </Box> */}
    </FullScreenDialog>
  );
};

export default ModalPdf;
