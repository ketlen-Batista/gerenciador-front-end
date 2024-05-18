import { IconButton } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

import TableDataGrid from '@components/TableDataGrid';

function TableEmployees() {
  const rows = [
    {
      id: '9d5b884e-8d72-4f29-8e23-f06ebe2394d0',
      documentName: 'documento1.pdf',
      sentIn: '21/04/2024-11-20',
      sender: 'GIC',
      recipient: 'Fulana da Silva',
      received: true,
      visa: true,
      actions: '',
      office: 'Gerente',
      sector: 'Educação',
      section: 'Colégio Fátima Rodrigues',
      status: 'Ativa',
    },
    {
      id: '9d5b884e-8d72-4f29-8e23-f06ebe2394h5',
      documentName: 'documento2.pdf',
      sentIn: '21/04/2024-11-20',
      sender: 'GIC',
      recipient: 'Ciclano da Silva',
      received: true,
      visa: true,
      actions: '',
      office: 'Gerente',
      sector: 'Educação',
      section: 'Colégio Fátima Rodrigues',
      status: 'Ativa',
    },
    {
      id: '9d5b884e-8d72-4f29-8e23-f06ebe2394f4',
      documentName: 'documento3.pdf',
      sentIn: '21/04/2024-11-20',
      sender: 'GIC',
      recipient: 'Fulana de Sousa',
      received: true,
      visa: false,
      actions: '',
      office: 'Gerente',
      sector: 'Educação',
      section: 'Colégio Fátima Rodrigues',
      status: 'Ativa',
    },
  ];

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
      renderCell: () => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
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
          <Tooltip title="Editar" placement="top">
            <IconButton>
              <div
                style={{
                  display: 'flex',
                  color: 'var(--GrayDark200)',
                }}
              >
                <CreateOutlinedIcon fontSize="medium" />
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
              >
                <DeleteOutlinedIcon fontSize="medium" />
              </div>
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  return <TableDataGrid columns={columns} rows={rows} />;
}

export default TableEmployees;
