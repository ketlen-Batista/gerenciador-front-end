import React, { useState } from 'react';

import { Box, IconButton, Tooltip } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { useDocumentsFilter } from '@pages/DocumentsPage/hooks/useDocumentsFilter';
import { useDeleteDocument } from '@src/services/DocumentsService/queries';
import { useGetDocumentById } from '@src/services/DocumentsService/queries';
import { colors } from '@src/styles/colors';
import { INIT_DATE_RANGE, formatDate } from '@src/utils/dates';
import { getPdfUrlServer } from '@src/utils/functions';

import CircularProgress from '@src/components/CircularProgress';
import ModalConfirm from '@src/components/ModalConfirm';
import PhotoModal from '@src/components/PhotoModal';

import TableDataGrid from '@components/TableDataGrid';

import ModalPdf from '../ModalPdf';

function TableDocuments() {
  const { documentsFiltered, loading, fetchDocuments, areArraysEqual } =
    useDocumentsFilter();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [documentIdToDelete, setDocumentIdToDelete] = useState<number>(null);
  const [openModalPdf, setOpenModalPdf] = useState(false);
  const [urlPdf, setUrlPdf] = useState('');
  const [documentName, setDocumentName] = useState('');
  const [photoId, setPhotoId] = useState(null);

  const { mutate: handleDeleteDocuments, isPending: isPendingDeleteDocuments } =
    useDeleteDocument();
  const { mutate: getDocumentById } = useGetDocumentById(); // Use o hook para obter o documento pelo ID
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

  const handleViewDocument = (
    documentId: number,
    nameDocument: string,
    photoId: number,
  ) => {
    setUrlPdf(getPdfUrlServer(documentId));
    setDocumentName(nameDocument);
    setOpenModalPdf(true);
    setPhotoId(photoId);
  };
  const columns = [
    {
      field: 'documentName',
      headerName: 'Nome do documento',
      flex: 5,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
    },
    {
      field: 'sentIn',
      headerName: 'Enviado em:',
      flex: 4,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
      renderCell: (params) =>
        params?.value && <div>{formatDate(params.value)}</div>,
    },
    {
      field: 'sender',
      headerName: 'Remetente',
      flex: 4,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
    },
    {
      field: 'recipient',
      headerName: 'Destinatário',
      flex: 4,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
    },
    {
      field: 'received',
      headerName: 'Enviado',
      flex: 2,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            height: '100%',
            color: 'green',
            marginLeft: '15px',
          }}
        >
          <CheckIcon color="inherit" />
        </div>
      ),
    },
    {
      field: 'visa',
      headerName: 'Visto',
      flex: 2,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
      renderCell: (params) =>
        areArraysEqual(params?.row?.recipientId, params?.row?.whoViewed) ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              height: '100%',
              color: 'green',
              marginLeft: '5px',
            }}
          >
            <CheckIcon color="inherit" />
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              height: '100%',
              color: 'red',
              marginLeft: '5px',
            }}
          >
            <CloseIcon color="inherit" />
          </div>
        ),
    },
    {
      field: 'actions',
      headerName: 'Ações',
      flex: 3,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Tooltip title="Ver" placement="top">
            <IconButton
              onClick={() =>
                (params.row?.document || params.row?.photoDocument?.id) &&
                handleViewDocument(
                  params.row.id,
                  params.row.documentName,
                  params.row.photoId,
                )
              }
            >
              <div
                style={{
                  display: 'flex',
                  color:
                    params.row?.document || params.row?.photoDocument?.id
                      ? 'var(--Primary)'
                      : colors.chip.enableBorder,
                }}
              >
                <VisibilityOutlinedIcon fontSize="medium" />
              </div>
            </IconButton>
          </Tooltip>
          <Tooltip title="Deletar" placement="top">
            <IconButton onClick={() => handleOpenModalDelete(params.row.id)}>
              <div
                style={{
                  display: 'flex',
                  color: 'var(--Danger)',
                }}
              >
                <DeleteOutlinedIcon fontSize="medium" />
              </div>
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];
  return (
    <>
      {isPendingDeleteDocuments && (
        <Box display="flex" justifyContent="center" mt={2} mb={2}>
          <CircularProgress size="medium" />
        </Box>
      )}
      <Box>
        <TableDataGrid
          rows={documentsFiltered}
          columns={columns}
          loading={loading}
          autoHeight
          pageSize={10}
        />
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
        />
      )}

      {openModalPdf && photoId && (
        <PhotoModal
          openDialog={openModalPdf}
          handleClose={() => setOpenModalPdf(false)}
          photoId={photoId}
          titleModal={documentName}
        />
      )}
    </>
  );
}
export default TableDocuments;
////////////////////////////////////////
// import React, { useState } from 'react';

// import { Box, CircularProgress, IconButton, Tooltip } from '@material-ui/core';
// import { Typography } from '@mui/material';
// import { useDocumentsFilter } from '@pages/DocumentsPage/hooks/useDocumentsFilter';
// import useResponsive from '@src/hooks/useResponsive';
// import { useDeleteDocument } from '@src/services/DocumentsService/queries';
// import { useGetDocumentById } from '@src/services/DocumentsService/queries';
// import { colors } from '@src/styles/colors';
// import { INIT_DATE_RANGE } from '@src/utils/dates';
// import { getPdfUrlServer } from '@src/utils/functions';

// import ModalConfirm from '@src/components/ModalConfirm';

// import DocumentCard from '../DocumentCard';
// import ModalPdf from '../ModalPdf';

// // Importa o componente DocumentCard

// function TableDocuments() {
//   const { isDesktop, isMobile } = useResponsive();
//   const { documentsFiltered, loading, fetchDocuments } = useDocumentsFilter();
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   const [documentIdToDelete, setDocumentIdToDelete] = useState<number>(null);
//   const [openModalPdf, setOpenModalPdf] = useState(false);
//   const [urlPdf, setUrlPdf] = useState('');
//   const [documentName, setDocumentName] = useState('');

//   const { mutate: handleDeleteDocuments, isPending: isPendingDeleteDocuments } =
//     useDeleteDocument();
//   const { mutate: getDocumentById } = useGetDocumentById();

//   const handleOpenModalDelete = (documentId: number) => {
//     setIsOpenModal(true);
//     setDocumentIdToDelete(documentId);
//   };

//   const handleCloseModalDelete = () => {
//     setIsOpenModal(false);
//     setDocumentIdToDelete(null);
//     fetchDocuments({
//       startDate: new Date(INIT_DATE_RANGE.startDate).toISOString(),
//       endDate: new Date(INIT_DATE_RANGE.endDate).toISOString(),
//     });
//   };

//   const handleDelete = async () => {
//     await handleDeleteDocuments(documentIdToDelete);
//     handleCloseModalDelete();
//   };

//   const handleViewDocument = (documentId: number, nameDocument: string) => {
//     setUrlPdf(getPdfUrlServer(documentId));
//     setDocumentName(nameDocument);
//     setOpenModalPdf(true);
//   };

//   return (
//     <>
//       {/* <Box>
//         {isDesktop && (
//           <Typography variant="h4">Você está em um desktop</Typography>
//         )}
//         {isMobile && (
//           <Typography variant="h6">
//             Você está em um dispositivo móvel
//           </Typography>
//         )}
//       </Box> */}
//       {isPendingDeleteDocuments && (
//         <Box display="flex" justifyContent="center" mt={2} mb={2}>
//           <CircularProgress size="medium" />
//         </Box>
//       )}
//       <Box>
//         {loading ? (
//           <CircularProgress />
//         ) : (
//           documentsFiltered.map((doc) => (
//             <DocumentCard
//               key={doc.id}
//               document={doc}
//               onView={(id) => handleViewDocument(id, doc.documentName)}
//               onDelete={(id) => handleOpenModalDelete(id)}
//             />
//           ))
//         )}
//       </Box>
//       {isOpenModal && (
//         <ModalConfirm
//           openDialog={isOpenModal}
//           handleClose={handleCloseModalDelete}
//           handleConfirm={handleDelete}
//           titleModal="Excluir Documento"
//           text="Tem certeza que deseja excluir este documento?"
//           textButtonConfirm="Excluir"
//           colorButtonConfirm={colors.error.dark}
//         />
//       )}
//       {openModalPdf && (
//         <ModalPdf
//           openDialog={openModalPdf}
//           handleClose={() => setOpenModalPdf(false)}
//           urlPdf={urlPdf}
//           documentName={documentName}
//         />
//       )}
//     </>
//   );
// }

// export default TableDocuments;
