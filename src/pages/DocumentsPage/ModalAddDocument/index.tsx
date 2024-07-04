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

interface ModalAddDocumentProps {
  openDialog: boolean;
  handleClose: () => void;
}

const ModalAddDocument = ({
  openDialog,
  handleClose,
}: ModalAddDocumentProps) => {
  const GIC_ID = '8112e4ba-fee1-489f-b1c3-f1b7e691a114';

  const [file, setFile] = useState(null);
  const [documentName, setDocumentName] = useState('');

  const [recipientId, setRecipientId] = useState<string[]>([]);
  const [senderId, setSenderId] = useState(GIC_ID);

  const {
    mutate: uploadDocument,
    isPending: isPendingUploadDocument,
    isSuccess,
    data: responseUpload,
  } = useUploadDocument();
  const {
    mutate: linkDocumentToUsers,
    isPending: isPendingLinkDocumentToUsers,
    isSuccess: isSuccessLinkDocumentToUsers,
  } = useLinkDocumentToUsers();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDocumentNameChange = (event) => {
    setDocumentName(event.target.value);
  };

  useEffect(() => {
    if (!documentName) {
      setDocumentName(file?.name);
    }
  }, [file]);

  const isLoading = isPendingLinkDocumentToUsers || isPendingUploadDocument;

  useEffect(() => {
    if (responseUpload && isSuccess) {
      linkDocumentToUsers({
        documentId: responseUpload.id,
        documentName,
        senderId,
        recipientId,
      });
    }
  }, [responseUpload]);

  useEffect(() => {
    if (isSuccessLinkDocumentToUsers) {
      handleClose();
      setFile(null);
      setDocumentName('');
      setRecipientId([]);
    }
  }, [isSuccessLinkDocumentToUsers]);

  const handleUpload = () => {
    try {
      if (file) {
        uploadDocument({ file, documentName });
      } else {
        console.error('Arquivo ou nome do documento não fornecido');
      }
    } catch {
      console.error('Erro ao fazer upload do arquivo');
    }
  };

  return (
    <FullScreenDialog
      open={openDialog}
      onClose={handleClose}
      maxWidth={'lg'}
      closeButtonPosition={'right'}
      title="Enviar Documento"
      fullWidth
      extraFooterComponent={
        <Box display="flex" justifyContent="flex-end" width="100%">
          <Button
            onClick={handleUpload}
            disabled={!file || isLoading || !recipientId.length}
          >
            {isLoading ? (
              <CircularProgress size="small" color="primary" />
            ) : (
              'Enviar'
            )}
          </Button>
        </Box>
      }
    >
      <Box display="flex" flexDirection="row" justifyContent="space-around">
        <SelectUsersDocument
          recipientId={recipientId}
          setRecipientId={setRecipientId}
        />
        <hr />
        <UploadDocument
          documentName={documentName}
          handleDocumentNameChange={handleDocumentNameChange}
          handleFileChange={handleFileChange}
        />
      </Box>
    </FullScreenDialog>
  );
};

export default ModalAddDocument;
