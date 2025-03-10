// import React, { useState } from 'react';
// import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
// import { Box, Tooltip } from '@mui/material';
// import { colors } from '@src/styles/colors';
// import ModalConfirm from '@src/components/ModalConfirm';
// import TableDataGrid from '@src/components/TableDataGrid';
// import { useJustificationsContext } from '../../hooks/useJustificationsContext';
// import Filters from './Filters';
// const JustificationsList = () => {
//   const [isOpenModalApprove, setIsOpenModalApprove] = useState(false);
//   const [isOpenModalDisapprove, setIsOpenModalDisapprove] = useState(false);
//   const [idCertificate, setIdCertificate] = useState(null);
//   const handleCloseModalDisapprove = () => {
//     setIsOpenModalDisapprove(false);
//     setIdCertificate(null);
//   };
//   const handleCloseModalApprove = () => {
//     setIsOpenModalApprove(false);
//     setIdCertificate(null);
//   };
//   const handleOpenModalDisapprove = (id: number) => {
//     setIsOpenModalDisapprove(true);
//     setIdCertificate(id);
//   };
//   const handleOpenModalApprove = (id: number) => {
//     setIsOpenModalApprove(true);
//     setIdCertificate(id);
//   };
//   const {
//     users,
//     fetchJustifications,
//     justifications,
//     loading,
//     updateJustifications,
//   } = useJustificationsContext();
//   const handleApprove = async ({
//     id,
//     approve,
//   }: {
//     id: number;
//     approve: boolean;
//   }) => {
//     await updateJustifications({
//       id: id.toString(),
//       approve: approve,
//     });
//     setIsOpenModalDisapprove(false);
//     setIsOpenModalApprove(false);
//   };
//   const columns = [
//     {
//       field: 'userId',
//       headerName: 'Usuário',
//       flex: 2,
//       renderCell: (params) => (
//         <div>{users.find((user) => user.id === params.row.userId)?.name}</div>
//       ),
//     },
//     {
//       field: 'dateJustification',
//       headerName: 'Data',
//       flex: 1,
//       renderCell: (params) => params?.value && <div>{params.value}</div>,
//     },
//     { field: 'pointType', headerName: 'Tipo de ponto', flex: 1 },
//     { field: 'justificationMessage', headerName: 'Justificativa', flex: 3 },
//     {
//       field: 'approve',
//       headerName: 'Status',
//       flex: 1,
//       renderCell: (params) => (
//         <Box
//           display={'flex'}
//           alignItems={'center'}
//           justifyContent={'start'}
//           height={'100%'}
//           width={'100%'}
//         >
//           <Box
//             bgcolor={
//               params.value == true
//                 ? 'green'
//                 : params.value == false
//                   ? 'red'
//                   : 'yellow'
//             }
//             color={
//               params.value == true
//                 ? 'white'
//                 : params.value == false
//                   ? 'white'
//                   : 'black'
//             }
//             fontWeight={500}
//             p={1}
//             width={'fit-content'}
//             height={'2rem'}
//             display={'flex'}
//             alignItems={'center'}
//             justifyContent={'center'}
//             borderRadius={'15px'}
//           >
//             {params.value == true
//               ? 'Aprovada'
//               : params.value == false
//                 ? 'Reprovada'
//                 : 'Pendente'}
//           </Box>
//         </Box>
//       ),
//     },
//     {
//       field: 'actions',
//       headerName: '',
//       flex: 1,
//       renderCell: (params) => (
//         <Box
//           display={'flex'}
//           alignItems={'center'}
//           justifyContent={'start'}
//           height={'100%'}
//           width={'100%'}
//         >
//           <Tooltip title="Aprovar" placement="top">
//             <Box
//               display={'flex'}
//               mr={5}
//               onClick={() => handleOpenModalApprove(params.row.id as number)}
//             >
//               <AssignmentTurnedInIcon htmlColor="#1E90FF" />
//             </Box>
//           </Tooltip>
//           <Tooltip title="Reprovar" placement="top">
//             <Box
//               display={'flex'}
//               onClick={() => handleOpenModalDisapprove(params.row.id as number)}
//             >
//               <AssignmentTurnedInIcon htmlColor="#FF0000" />
//             </Box>
//           </Tooltip>
//         </Box>
//       ),
//     },
//   ];
//   return (
//     <>
//       <Filters />
//       <Box mt={5} bgcolor={colors.basic.white}>
//         <TableDataGrid
//           rows={justifications || []}
//           columns={columns}
//           loading={loading}
//           pageSize={8}
//         />
//       </Box>
//       {isOpenModalApprove && (
//         <ModalConfirm
//           openDialog={isOpenModalApprove}
//           handleClose={handleCloseModalApprove}
//           handleConfirm={() =>
//             handleApprove({ id: idCertificate, approve: true })
//           }
//           titleModal="Aprovar"
//           text="Tem certeza que deseja aprovar esta justificativa?"
//           textButtonConfirm="Aprovar"
//           colorButtonConfirm={colors.success.dark}
//         />
//       )}
//       {isOpenModalDisapprove && (
//         <ModalConfirm
//           openDialog={isOpenModalDisapprove}
//           handleClose={handleCloseModalDisapprove}
//           handleConfirm={() =>
//             handleApprove({ id: idCertificate, approve: false })
//           }
//           titleModal="Reprovar"
//           text="Tem certeza que deseja reprovar esta justificativa?"
//           textButtonConfirm="Reprovar"
//           colorButtonConfirm={colors.error.dark}
//         />
//       )}
//     </>
//   );
// };
// export default JustificationsList;
//////////////////////////////////////////////////
import React, { useState } from 'react';

import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material';
import useResponsive from '@src/hooks/useResponsive';
import { colors } from '@src/styles/colors';

import ModalConfirm from '@src/components/ModalConfirm';
import TableDataGrid from '@src/components/TableDataGrid';

import { useJustificationsContext } from '../../hooks/useJustificationsContext';

import Filters from './Filters';

// type JustificationProps = {
//   // id: number;
//   // userId: number;
//   // justification: string;
//   // pointType: string;
//   // justificationMessage: string;
//   // approve: boolean | null;
//   // dateJustification?: string;
//   // user?: { id: number; name: string };
//   id: number;
//   userId: number;
//   pointType: string;
//   justificationMessage: string;
//   approve: boolean | null;
//   justification: string;

// };

const JustificationsList = () => {
  const [isOpenModalApprove, setIsOpenModalApprove] = useState(false);
  const [isOpenModalDisapprove, setIsOpenModalDisapprove] = useState(false);
  const [idCertificate, setIdCertificate] = useState(null);

  const { isDesktop } = useResponsive(); // Hook to detect if it's a desktop screen

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

  const {
    users,
    fetchJustifications,
    justifications,
    loading,
    updateJustifications,
  } = useJustificationsContext();

  const handleApprove = async ({
    id,
    approve,
  }: {
    id: number;
    approve: boolean;
  }) => {
    await updateJustifications({
      id: id.toString(),
      approve: approve,
    });

    setIsOpenModalDisapprove(false);
    setIsOpenModalApprove(false);
  };

  const columns = [
    {
      field: 'userId',
      headerName: 'Usuário',
      flex: 2,
      renderCell: (params) => (
        <div>{users.find((user) => user.id === params.row.userId)?.name}</div>
      ),
    },
    {
      field: 'dateJustification',
      headerName: 'Data',
      flex: 1,
      renderCell: (params) => params?.value && <div>{params.value}</div>,
    },
    { field: 'pointType', headerName: 'Tipo de ponto', flex: 1 },
    { field: 'justificationMessage', headerName: 'Justificativa', flex: 3 },
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
              params.value === true
                ? 'green'
                : params.value === false
                  ? 'red'
                  : 'yellow'
            }
            color={
              params.value === true
                ? 'white'
                : params.value === false
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
            {params.value === true
              ? 'Aprovada'
              : params.value === false
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
    <>
      <Filters />
      <Box mt={5} bgcolor={colors.basic.white}>
        {isDesktop ? (
          <TableDataGrid
            rows={justifications || []}
            columns={columns}
            loading={loading}
            pageSize={8}
          />
        ) : (
          <Grid container spacing={2}>
            {justifications?.map((justification: any) => (
              <Grid item xs={12} key={justification.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">
                      {
                        users.find((user) => user.id === justification.userId)
                          ?.name
                      }
                    </Typography>
                    <Typography color="textSecondary">
                      Data: {justification.dateJustification}
                    </Typography>
                    <Typography>
                      Tipo de ponto: {justification.pointType}
                    </Typography>
                    <Typography>
                      Justificativa: {justification.justificationMessage}
                    </Typography>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mt={2}
                    >
                      <Box
                        bgcolor={
                          justification.approve === true
                            ? 'green'
                            : justification.approve === false
                              ? 'red'
                              : 'yellow'
                        }
                        color={
                          justification.approve === true
                            ? 'white'
                            : justification.approve === false
                              ? 'white'
                              : 'black'
                        }
                        p={1}
                        borderRadius="15px"
                      >
                        {justification.approve === true
                          ? 'Aprovada'
                          : justification.approve === false
                            ? 'Reprovada'
                            : 'Pendente'}
                      </Box>
                      <Box display="flex">
                        <Tooltip title="Aprovar" placement="top">
                          <Box
                            display="flex"
                            onClick={() =>
                              handleOpenModalApprove(justification.id)
                            }
                            mr={2}
                          >
                            <AssignmentTurnedInIcon htmlColor="#1E90FF" />
                          </Box>
                        </Tooltip>

                        <Tooltip title="Reprovar" placement="top">
                          <Box
                            display="flex"
                            onClick={() =>
                              handleOpenModalDisapprove(justification.id)
                            }
                          >
                            <AssignmentTurnedInIcon htmlColor="#FF0000" />
                          </Box>
                        </Tooltip>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      {isOpenModalApprove && (
        <ModalConfirm
          openDialog={isOpenModalApprove}
          handleClose={handleCloseModalApprove}
          handleConfirm={() =>
            handleApprove({ id: idCertificate, approve: true })
          }
          titleModal="Aprovar"
          text="Tem certeza que deseja aprovar esta justificativa?"
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
          text="Tem certeza que deseja reprovar esta justificativa?"
          textButtonConfirm="Reprovar"
          colorButtonConfirm={colors.error.dark}
        />
      )}
    </>
  );
};

export default JustificationsList;
