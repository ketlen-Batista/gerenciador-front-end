import React, { useState } from 'react';

import { Box, CircularProgress } from '@material-ui/core';
import { useDocumentsFilter } from '@pages/DocumentsPage/hooks/useDocumentsFilter';
import useResponsive from '@src/hooks/useResponsive';
import { useDeleteDocument } from '@src/services/DocumentsService/queries';
import { useGetDocumentById } from '@src/services/DocumentsService/queries';
import { colors } from '@src/styles/colors';
import { INIT_DATE_RANGE } from '@src/utils/dates';
import { getPdfUrlServer } from '@src/utils/functions';

import ModalConfirm from '@src/components/ModalConfirm';
import PhotoModal from '@src/components/PhotoModal';

import DocumentCard from '../DocumentCard';
import ModalPdf from '../ModalPdf';

function MobileListDocuments() {
  const { documentsFiltered, loading, fetchDocuments } = useDocumentsFilter();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [documentIdToDelete, setDocumentIdToDelete] = useState<number>(null);
  const [openModalPdf, setOpenModalPdf] = useState(false);
  const [urlPdf, setUrlPdf] = useState('');
  const [documentName, setDocumentName] = useState('');
  const [photoId, setPhotoId] = useState(null);

  const { mutate: handleDeleteDocuments, isPending: isPendingDeleteDocuments } =
    useDeleteDocument();

  const handleOpenModalDelete = (documentId: number) => {
    setIsOpenModal(true);
    setDocumentIdToDelete(documentId);
  };

  const handleCloseModalDelete = () => {
    setIsOpenModal(false);
    setDocumentIdToDelete(null);
    fetchDocuments({
      startDate: new Date(INIT_DATE_RANGE.startDate).toISOString(),
      endDate: new Date(INIT_DATE_RANGE.endDate).toISOString(),
    });
  };

  const handleDelete = async () => {
    await handleDeleteDocuments(documentIdToDelete);
    handleCloseModalDelete();
  };

  const handleViewDocument = async (
    documentId: number,
    nameDocument: string,
    photoId: number,
  ) => {
    setDocumentName(nameDocument);
    setOpenModalPdf(true);
    setPhotoId(photoId);
    if (documentId) {
      const pdfUrl = await getPdfUrlServer(documentId);
      setUrlPdf(pdfUrl);
    }
  };

  return (
    <>
      {isPendingDeleteDocuments && (
        <Box display="flex" justifyContent="center" mt={2} mb={2}>
          <CircularProgress size="medium" />
        </Box>
      )}
      <Box>
        {loading ? (
          <CircularProgress />
        ) : (
          documentsFiltered.map((doc) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onView={() =>
                handleViewDocument(doc.id, doc.documentName, doc.photoId)
              }
              onDelete={() => handleOpenModalDelete(doc.id)}
            />
          ))
        )}
      </Box>
      {isOpenModal && (
        <ModalConfirm
          openDialog={isOpenModal}
          handleClose={handleCloseModalDelete}
          handleConfirm={handleDelete}
          titleModal="Excluir Documento"
          text="Tem certeza que deseja excluir este documento?"
          textButtonConfirm="Excluir"
          colorButtonConfirm={colors.error.dark}
        />
      )}
      {openModalPdf && !photoId && (
        <ModalPdf
          openDialog={openModalPdf}
          handleClose={() => setOpenModalPdf(false)}
          urlPdf={urlPdf}
          documentName={documentName}
          fullScreen={true}
        />
      )}

      {openModalPdf && photoId && (
        <PhotoModal
          openDialog={openModalPdf}
          handleClose={() => setOpenModalPdf(false)}
          photoId={photoId}
          titleModal={documentName}
          fullScreen={true}
        />
      )}
    </>
  );
}

export default MobileListDocuments;
