import React, { useEffect, useState } from 'react';

import FullScreenDialog from '@src/components/FullScreenDialog';

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
    const url = urlPdf;

    setPdfUrl(url ?? '');
  }, [urlPdf]);

  if (!pdfUrl) {
    return <div>Carregando PDF...</div>;
  }

  return (
    <FullScreenDialog
      open={openDialog}
      onClose={handleClose}
      maxWidth={'xl'}
      // fullScreen
      closeButtonPosition={'right'}
      title={documentName ?? ''}
      fullWidth
      style={{ zIndex: 1300 }}
    >
      <iframe src={pdfUrl} width="100%" height="700px" title="pdf" />
    </FullScreenDialog>
  );
};

export default ModalPdf;
