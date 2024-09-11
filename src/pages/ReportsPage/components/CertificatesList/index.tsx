import React, { useState } from 'react';

import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { Box, Tooltip } from '@mui/material';
import { colors } from '@src/styles/colors';
import { formatDateDayMonthAndYear } from '@src/utils/dates';
import { getPdfUrlServer } from '@src/utils/functions';

import ModalConfirm from '@src/components/ModalConfirm';
import TableDataGrid from '@src/components/TableDataGrid';
import ModalPdf from '@src/pages/DocumentsPage/components/ModalPdf';

import { useCertificatesContext } from '../../hooks/useCertificatesContext';

const CertificatesList = () => {
  const [openModalPdf, setOpenModalPdf] = useState(false);
  const [urlPdf, setUrlPdf] = useState('');
  const [documentName, setDocumentName] = useState('');
  const [isOpenModalApprove, setIsOpenModalApprove] = useState(false);
  const [isOpenModalDisapprove, setIsOpenModalDisapprove] = useState(false);
  const [idCertificate, setIdCertificate] = useState(null);

  const handleCloseModalDisapprove = () => {
    setIsOpenModalDisapprove(false);
    setIdCertificate(null);
  };

  const handleCloseModalApprove = () => {
    setIsOpenModalApprove(false);
    setIdCertificate(null);
  };

  const handleOpenModalDisapprove = (id: number) => {
    setIsOpenModalDisapprove(true);
    setIdCertificate(id);
  };

  const handleOpenModalApprove = (id: number) => {
    setIsOpenModalApprove(true);
    setIdCertificate(id);
  };

  const { users, certificates, loading, updateDocument } =
    useCertificatesContext();

  const handleApprove = async ({
    id,
    approve,
  }: {
    id: number;
    approve: boolean;
  }) => {
    await updateDocument({
      id: id,
      approve: approve,
    });

    setIsOpenModalDisapprove(false);
    setIsOpenModalApprove(false);
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
              onClick={() => handleOpenModalApprove(params.row.id as number)}
            >
              <AssignmentTurnedInIcon htmlColor="#1E90FF" />
            </Box>
          </Tooltip>

          <Tooltip title="Reprovar" placement="top">
            <Box
              display={'flex'}
              onClick={() => handleOpenModalDisapprove(params.row.id as number)}
            >
              <AssignmentTurnedInIcon htmlColor="#FF0000" />
            </Box>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box mt={5} bgcolor={colors.basic.white}>
      <TableDataGrid
        rows={certificates || []}
        columns={columns}
        loading={loading}
        pageSize={8}
      />
      {isOpenModalApprove && (
        <ModalConfirm
          openDialog={isOpenModalApprove}
          handleClose={handleCloseModalApprove}
          handleConfirm={() =>
            handleApprove({ id: idCertificate, approve: true })
          }
          titleModal="Aprovar"
          text="Tem certeza que deseja aprovar este atestado?"
          textButtonConfirm="Aprovar"
          colorButtonConfirm={colors.success.dark}
        />
      )}

      {isOpenModalDisapprove && (
        <ModalConfirm
          openDialog={isOpenModalDisapprove}
          handleClose={handleCloseModalDisapprove}
          handleConfirm={() =>
            handleApprove({ id: idCertificate, approve: false })
          }
          titleModal="Reprovar"
          text="Tem certeza que deseja reprovar este atestado?"
          textButtonConfirm="Reprovar"
          colorButtonConfirm={colors.error.dark}
        />
      )}
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
