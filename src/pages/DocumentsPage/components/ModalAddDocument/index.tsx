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
  const GIC_ID = 'e22776ae-c251-4fb4-923b-1ccd1bfac99c';

  const [file, setFile] = useState<File | null>(null);
  const [documentName, setDocumentName] = useState('');

  const [recipientId, setRecipientId] = useState<string[]>([]);
  const [typeDocument, setTypeDocument] = useState<string | number>('');
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

  console.log({ file });

  const handleFileChange = (files: File[]) => {
    if (files && files?.length > 0) {
      setFile(files[0]);
    }
  };

  const handleDocumentNameChange = (text: string) => {
    setDocumentName(text);
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
        typeDocumentValue: typeDocument as number,
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
            disabled={
              !file || isLoading || !recipientId?.length || !typeDocument
            }
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
      <Box display="flex" flexDirection="row">
        <SelectUsersDocument
          recipientId={recipientId}
          setRecipientId={setRecipientId}
        />
        <hr />
        <UploadDocument
          documentName={documentName}
          handleDocumentNameChange={handleDocumentNameChange}
          handleFileChange={handleFileChange}
          typeDocument={typeDocument}
          setTypeDocument={setTypeDocument}
        />
      </Box>
    </FullScreenDialog>
  );
};

export default ModalAddDocument;
