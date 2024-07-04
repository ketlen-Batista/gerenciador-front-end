import React, { useState } from 'react';

import { Box, IconButton, Tooltip } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { useDeleteDocument } from '@src/services/DocumentsService/queries';
import { formatDate } from '@src/utils/dates';

import CircularProgress from '@src/components/CircularProgress';
import ModalConfirm from '@src/components/ModalConfirm';

import TableDataGrid from '@components/TableDataGrid';

import { useDocumentsFilter } from '../hooks/useDocumentsFilter';

function TableDocuments() {
  const { documentsFiltered, loading } = useDocumentsFilter();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [documentIdToDelete, setDocumentIdToDelete] = useState<number>(null);
  const { mutate: handleDeleteDocuments, isPending: isPendingDeleteDocuments } =
    useDeleteDocument();
  const handleOpenModalDelete = (documentId: number) => {
    setIsOpenModal(true);
    setDocumentIdToDelete(documentId);
  };
  const handleCloseModalDelete = () => {
    setIsOpenModal(false);
    setDocumentIdToDelete(null);
  };
  const handleDelete = () => {
    handleDeleteDocuments(documentIdToDelete);
    handleCloseModalDelete();
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
      headerName: 'Recebido?',
      flex: 2,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
      renderCell: (params) =>
        params?.value ? (
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
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              height: '100%',
              color: 'red',
              marginLeft: '15px',
            }}
          >
            <CloseIcon color="inherit" />
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
        params?.value ? (
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
            <IconButton>
              <div
                style={{
                  display: 'flex',
                  color: 'var(--Primary)',
                }}
              >
                <VisibilityOutlinedIcon fontSize="medium" />
              </div>
            </IconButton>
          </Tooltip>
          <Tooltip title="Deletar" placement="top">
            <IconButton>
              <div
                style={{
                  display: 'flex',
                  color: 'var(--Danger)',
                }}
                onClick={() => handleOpenModalDelete(params.row.id)}
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
      <ModalConfirm
        openDialog={isOpenModal}
        handleClose={handleCloseModalDelete}
        handleConfirm={handleDelete}
        titleModal="Excluir Documento"
        text="Tem certeza que deseja excluir este documento?"
        textButtonConfirm="Excluir"
      />
    </>
  );
}
export default TableDocuments;
