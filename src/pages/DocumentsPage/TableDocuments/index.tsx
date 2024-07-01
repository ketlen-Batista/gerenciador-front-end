import React, { useEffect } from 'react';

import { Box, IconButton, Tooltip } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { useDeleteDocument } from '@src/services/DocumentsService/queries';
import { formatDate } from '@src/utils/dates';

import CircularProgress from '@src/components/CircularProgress';

import TableDataGrid from '@components/TableDataGrid';

interface TableDocumentsProps {
  listDocuments: Document[];
  getListDocuments: ({}) => void;
  isPending: boolean;
}

function TableDocuments({
  listDocuments,
  getListDocuments,
  isPending,
}: TableDocumentsProps) {
  const {
    mutate: handleDeleteDocuments,
    isPending: isPendingDeleteDocuments,
    isSuccess: isSuccessDeleteDocument,
  } = useDeleteDocument();

  useEffect(() => {
    if (isSuccessDeleteDocument) {
      getListDocuments({});
    }
  }, [isSuccessDeleteDocument]);

  useEffect(() => {
    getListDocuments({});
  }, []);

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
                onClick={() => handleDeleteDocuments(params.row.id)}
              >
                <DeleteOutlinedIcon fontSize="medium" />
              </div>
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  const isLoading = isPending || isPendingDeleteDocuments;

  return isLoading ? (
    <Box
      display="flex"
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress size="large" color="primary" />
    </Box>
  ) : (
    <TableDataGrid
      columns={columns}
      rows={listDocuments || []}
      loading={isLoading}
    />
  );
}

export default TableDocuments;
