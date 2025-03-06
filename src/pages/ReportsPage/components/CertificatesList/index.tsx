import React, { Suspense, useState } from 'react';

import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { Box, CircularProgress, Tooltip } from '@mui/material';
import useResponsive from '@src/hooks/useResponsive';
import { colors } from '@src/styles/colors';
import { formatDateDayMonthAndYear } from '@src/utils/dates';
import { getPdfUrlServer } from '@src/utils/functions';

import ModalConfirm from '@src/components/ModalConfirm';
import PhotoModal from '@src/components/PhotoModal';
import TableDataGrid from '@src/components/TableDataGrid';
import ModalPdf from '@src/pages/DocumentsPage/components/ModalPdf';

import { useCertificatesContext } from '../../hooks/useCertificatesContext';
import CertificateApproveBody from '../CertificateApproveBody';
import ModalConfirmCertificateApprove from '../ModalConfirmCertificateApprove';

const CertificatesList = () => {
  const {
    users,
    certificates,
    loading,
    updateDocument,
    openModalPhoto,
    photoId,
    handleOpenModalPhoto,
    handleCloseModalPhoto,
    employeeIdSelected,
    setEmployeeIdSelected,
    statusJustificationValue,
    setStatusJustificationValue,
    formik,
    isLoadingCertificatesGet,
  } = useCertificatesContext();

  const [openModalPdf, setOpenModalPdf] = useState(false);
  const [urlPdf, setUrlPdf] = useState('');
  const [documentName, setDocumentName] = useState('');
  const [isOpenModalApprove, setIsOpenModalApprove] = useState(false);
  const [isOpenModalDisapprove, setIsOpenModalDisapprove] = useState(false);
  const [idCertificate, setIdCertificate] = useState(null);
  const [dateInitCertificate, setDateInitCertificate] = useState('');
  const [dateEndCertificate, setDateEndCertificate] = useState('');
  const [statusJustificationName, setStatusJustificationName] = useState('');

  const { isMobile } = useResponsive();

  const handleCloseModalDisapprove = () => {
    setIsOpenModalDisapprove(false);
    setIdCertificate(null);
  };

  const handleCloseModalApprove = () => {
    setIsOpenModalApprove(false);
    setIdCertificate(null);
    setEmployeeIdSelected('');
    setDateInitCertificate('');
    setDateEndCertificate('');
    setStatusJustificationValue(null);
    setStatusJustificationName('');
  };

  const handleOpenModalDisapprove = (id: number) => {
    setIsOpenModalDisapprove(true);
    setIdCertificate(id);
  };

  // const handleOpenModalApprove = (
  //   id: number,
  //   employeeId: string,
  //   dateinit: string,
  //   dateEnd: string,
  //   statusId: number,
  //   justificationName: string,
  // ) => {
  //   setIsOpenModalApprove(true);
  //   setIdCertificate(id);
  //   setEmployeeIdSelected(employeeId);
  //   setDateInitCertificate(dateinit);
  //   setDateEndCertificate(dateEnd);
  //   setStatusJustificationValue(statusId);
  //   setStatusJustificationName(justificationName);
  // };

  const handleOpenModalApprove = React.useCallback(
    (id, employeeId, dateInit, dateEnd, statusId, justificationName) => {
      setIsOpenModalApprove(true);

      setTimeout(() => {
        setIdCertificate(id);
        setEmployeeIdSelected(employeeId);
        // setDateInitCertificate(dateInit);
        // setDateEndCertificate(dateEnd);
        setStatusJustificationValue(statusId);
        setStatusJustificationName(justificationName);
      }, 0); // Garantir que o modal abre antes de preencher os estados
    },
    [],
  );

  const handleApprove = async ({
    id,
    approve,
  }: {
    id: number;
    approve: boolean;
  }) => {
    await updateDocument({ id: id, approve: approve });
    await formik?.handleSubmit();

    setIsOpenModalDisapprove(false);
    setIsOpenModalApprove(false);
  };

  const handleViewDocument = async ({
    documentId,
    nameDocument,
  }: {
    documentId: number;
    nameDocument: string;
  }) => {
    // setUrlPdf(getPdfUrlServer(documentId));
    setDocumentName(nameDocument);
    setOpenModalPdf(true);

    if (documentId) {
      const pdfUrl = await getPdfUrlServer(documentId);
      setUrlPdf(pdfUrl);
    }
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
      field: 'status',
      headerName: 'Justificativa',
      flex: 2,
      renderCell: (params) => params?.value?.name && params?.value?.name,
    },
    {
      field: 'document',
      headerName: 'Documento',
      flex: 2,
      renderCell: (params) =>
        (params.value || params.row?.photoDocument?.id) && (
          <div
            onClick={() => {
              params?.row?.photoDocument?.id
                ? handleOpenModalPhoto(params.row.photoDocument.id)
                : handleViewDocument({
                    documentId: params.row.id,
                    nameDocument: params.row.documentName,
                  });
            }}
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
              sx={{ cursor: 'pointer' }}
              onClick={() =>
                params.row.approve === true
                  ? null
                  : handleOpenModalApprove(
                      params.row.id as number,
                      params.row.senderId as string,
                      params.row.dateStartCertificate as string,
                      params.row.dateEndCertificate as string,
                      params.row.status?.value as number,
                      params.row.status?.name as string,
                    )
              }
            >
              <AssignmentTurnedInIcon
                htmlColor={params.row.approve === true ? '#464646' : '#1E90FF'}
              />
            </Box>
          </Tooltip>
          <Tooltip title="Reprovar" placement="top">
            <Box
              display={'flex'}
              sx={{ cursor: 'pointer' }}
              onClick={() =>
                params.row.approve === false
                  ? null
                  : handleOpenModalDisapprove(params.row.id as number)
              }
            >
              <AssignmentTurnedInIcon
                htmlColor={params.row.approve === false ? '#464646' : '#FF0000'}
              />
            </Box>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box mt={5}>
      {isMobile ? (
        // Responsivo para mobile (cards)
        certificates?.map((certificate) => (
          <Box
            key={certificate.id}
            p={2}
            m={2}
            border="1px solid gray"
            borderRadius="8px"
            bgcolor={colors.basic.white}
            color="text.primary"
          >
            <div>
              <strong>Usuário:</strong>{' '}
              {users.find((user) => user.id === certificate.senderId)?.name}
            </div>
            <div>
              <strong>Período:</strong>{' '}
              {`${formatDateDayMonthAndYear(certificate.dateStartCertificate)} a ${formatDateDayMonthAndYear(certificate.dateEndCertificate)}`}
            </div>
            <div
              style={{ cursor: 'pointer', color: 'blue', fontWeight: '500' }}
              onClick={() =>
                handleViewDocument({
                  documentId: certificate.id,
                  nameDocument: certificate.documentName,
                })
              }
            >
              Ver Documento
            </div>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Tooltip title="Aprovar" placement="top">
                <Box
                  onClick={() =>
                    handleOpenModalApprove(
                      certificate?.id,
                      certificate?.senderId,
                      certificate?.dateStartCertificate,
                      certificate?.dateEndCertificate,
                      certificate?.status?.value,
                      certificate?.status?.name,
                    )
                  }
                >
                  <AssignmentTurnedInIcon htmlColor="#1E90FF" />
                </Box>
              </Tooltip>
              <Tooltip title="Reprovar" placement="top">
                <Box onClick={() => handleOpenModalDisapprove(certificate.id)}>
                  <AssignmentTurnedInIcon htmlColor="#FF0000" />
                </Box>
              </Tooltip>
            </Box>
          </Box>
        ))
      ) : (
        <Box bgcolor="white">
          <TableDataGrid
            rows={certificates || []}
            columns={columns}
            loading={isLoadingCertificatesGet}
            pageSize={8}
          />
        </Box>
      )}
      {/* Modais de aprovação e PDF */}
      {/* {isOpenModalApprove && (
        <ModalConfirmCertificateApprove
          openDialog={isOpenModalApprove}
          handleClose={handleCloseModalApprove}
          handleConfirm={() =>
            handleApprove({ id: idCertificate, approve: true })
          }
          titleModal="Aprovação"
          text="Tem certeza que deseja aprovar este atestado?"
          textButtonConfirm="Aprovar"
          colorButtonConfirm={colors.success.dark}
          body={
            <CertificateApproveBody
              employeeId={employeeIdSelected}
              dateInitCertificate={dateInitCertificate}
              dateEndCertificate={dateEndCertificate}
              statusJustificationName={statusJustificationName}
            />
          }
        />
      )} */}

      {isOpenModalApprove && (
        // <Suspense fallback={<div>Carregando...</div>}>
        <ModalConfirmCertificateApprove
          openDialog={isOpenModalApprove}
          handleClose={handleCloseModalApprove}
          handleConfirm={() =>
            handleApprove({ id: idCertificate, approve: true })
          }
          titleModal="Aprovação"
          text="Tem certeza que deseja aprovar este atestado?"
          textButtonConfirm="Aprovar"
          colorButtonConfirm={colors.success.dark}
          body={
            !!employeeIdSelected &&
            !!statusJustificationName &&
            !!idCertificate ? (
              <CertificateApproveBody
                employeeId={employeeIdSelected}
                statusJustificationName={statusJustificationName}
                idCertificate={idCertificate}
              />
            ) : (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                color={colors.basic.black}
                my={4}
              >
                <CircularProgress color="primary" size={60} />
              </Box>
            )
          }
        />
        // </Suspense>
      )}
      {isOpenModalDisapprove && (
        <ModalConfirm
          openDialog={isOpenModalDisapprove}
          handleClose={handleCloseModalDisapprove}
          handleConfirm={() =>
            handleApprove({ id: idCertificate, approve: false })
          }
          titleModal="Reprovação"
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

      {openModalPhoto && (
        <PhotoModal
          openDialog={openModalPhoto}
          handleClose={handleCloseModalPhoto}
          photoId={photoId}
          titleModal={'Foto do Documento'}
        />
      )}
    </Box>
  );
};

export default CertificatesList;
