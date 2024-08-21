import React, { useEffect, useState } from 'react';

import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { Box, Tooltip } from '@mui/material';
import { useUserCheckpointsContext } from '@pages/ReportsPage/hooks/useUserCheckpointsContext';
import { useListDocuments } from '@src/services/DocumentsService/queries';
import {
  useGetJustificationsList,
  useUpdateJustification,
} from '@src/services/Justifications/queries';
import { useUpdateDocument } from '@src/services/typesDocuments/queries';
import { colors } from '@src/styles/colors';
import { formatDate, formatDateDayMonthAndYear } from '@src/utils/dates';
import { getPdfUrlServer } from '@src/utils/functions';

import TableDataGrid from '@src/components/TableDataGrid';
import ModalPdf from '@src/pages/DocumentsPage/components/ModalPdf';

const CertificatesList = () => {
  const { users } = useUserCheckpointsContext();
  const [openModalPdf, setOpenModalPdf] = useState(false);
  const [urlPdf, setUrlPdf] = useState('');
  const [documentName, setDocumentName] = useState('');

  const {
    data: documentsList,
    mutateAsync: getDocumentsList,
    isPending: IsLoadingDocumentList,
  } = useListDocuments();

  const TYPE_DOCUMENT_CERTIFICATES = [4, 5];

  const { mutateAsync: updateJustifications, isPending: loadingUpdate } =
    useUpdateDocument();

  const handleApprove = async ({
    id,
    approve,
  }: {
    id: number;
    approve: boolean;
  }) => {
    await updateJustifications({
      id: id,
      approve: approve,
    });

    getDocumentsList({});
  };

  const handleViewDocument = ({
    documentId,
    nameDocument,
  }: {
    documentId: number;
    nameDocument: string;
  }) => {
    setUrlPdf(getPdfUrlServer(documentId));
    setDocumentName(nameDocument);
    setOpenModalPdf(true);
  };

  const columns = [
    {
      field: 'senderId',
      headerName: 'Usuário',
      flex: 2,
      renderCell: (params) => (
        <div>{users.find((user) => user.id === params.row.senderId)?.name}</div>
      ),
    },
    {
      field: 'dateStartCertificate',
      headerName: 'Período',
      flex: 2,
      renderCell: (params) =>
        params?.value && (
          <div>{`${formatDateDayMonthAndYear(params.row.dateStartCertificate)} a ${formatDateDayMonthAndYear(params.row.dateEndCertificate)}`}</div>
        ),
    },
    // { field: 'pointType', headerName: 'Tipo de ponto', flex: 1 },
    {
      field: 'documentName',
      headerName: 'Documento',
      flex: 2,
      renderCell: (params) =>
        params.value && (
          <div
            onClick={() =>
              handleViewDocument({
                documentId: params.row.id,
                nameDocument: params.row.documentName,
              })
            }
            style={{
              cursor: 'pointer',
              color: 'blue',
              fontWeight: '500',
            }}
          >
            Ver Documento
          </div>
        ),
    },
    {
      field: 'approve',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => (
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'start'}
          height={'100%'}
          width={'100%'}
        >
          <Box
            bgcolor={
              params.value == true
                ? 'green'
                : params.value == false
                  ? 'red'
                  : 'yellow'
            }
            color={
              params.value == true
                ? 'white'
                : params.value == false
                  ? 'white'
                  : 'black'
            }
            fontWeight={500}
            p={1}
            width={'fit-content'}
            height={'2rem'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            borderRadius={'15px'}
          >
            {params.value == true
              ? 'Aprovada'
              : params.value == false
                ? 'Reprovada'
                : 'Pendente'}
          </Box>
        </Box>
      ),
    },
    {
      field: 'actions',
      headerName: '',
      flex: 1,
      renderCell: (params) => (
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'start'}
          height={'100%'}
          width={'100%'}
        >
          <Tooltip title="Aprovar" placement="top">
            <Box
              display={'flex'}
              mr={5}
              onClick={() =>
                handleApprove({ id: params.row.id, approve: true })
              }
            >
              <AssignmentTurnedInIcon htmlColor="#1E90FF" />
            </Box>
          </Tooltip>

          <Tooltip title="Reprovar" placement="top">
            <Box
              display={'flex'}
              onClick={() =>
                handleApprove({ id: params.row.id, approve: false })
              }
            >
              <AssignmentTurnedInIcon htmlColor="#FF0000" />
            </Box>
          </Tooltip>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    getDocumentsList({
      typeDocumentValue: TYPE_DOCUMENT_CERTIFICATES,
    });
  }, []);

  return (
    <Box mt={5} bgcolor={colors.basic.white}>
      <TableDataGrid
        rows={documentsList || []}
        columns={columns}
        loading={IsLoadingDocumentList}
        pageSize={8}
      />
      {openModalPdf && (
        <ModalPdf
          openDialog={openModalPdf}
          handleClose={() => setOpenModalPdf(false)}
          urlPdf={urlPdf}
          documentName={documentName}
        />
      )}
    </Box>
  );
};

export default CertificatesList;
