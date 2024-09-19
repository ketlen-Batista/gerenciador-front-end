// import React, { useState } from 'react';
// import { Grid } from '@mui/material';
// import { useGetJobPositions } from '@src/services/jobPositions/queries';
// import ModalJob from './ModalJob';
// import Table from './Table';
// import * as S from '../styles';
// const OfficesSettings = () => {
//   const [openDialog, setOpenDialog] = useState<boolean>(false);
//   const { data: jobs, mutate: getJobs, isPending } = useGetJobPositions();
//   const handleCloseModal = () => {
//     setOpenDialog(false);
//   };
//   const handleOpenModal = () => {
//     setOpenDialog(true);
//   };
//   return (
//     <div>
//       <S.Container>
//         <S.ContainerTitles>
//           <S.Title>Cargos</S.Title>
//           {/* <S.SubTitle>Lista de cargos</S.SubTitle> */}
//         </S.ContainerTitles>
//       </S.Container>
//       <Grid container spacing={4} display="flex" justifyContent="space-between">
//         <Grid item xs={5}>
//           <Table jobs={jobs} getJobs={getJobs} isPending={isPending} />
//         </Grid>
//         <Grid item xs={4}>
//           {' '}
//           <S.ContainerButtonsAdd>
//             <S.ButtonClick onClick={handleOpenModal}>
//               +Adicionar Cargo
//             </S.ButtonClick>
//           </S.ContainerButtonsAdd>
//         </Grid>
//       </Grid>
//       {openDialog && (
//         <ModalJob
//           openDialog={openDialog}
//           handleClose={handleCloseModal}
//           getJobs={getJobs}
//         />
//       )}
//     </div>
//   );
// };
// export default OfficesSettings;
import React, { useEffect, useState } from 'react';

import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import useResponsive from '@src/hooks/useResponsive';
import {
  useDeleteJobPosition,
  useGetJobPositions,
} from '@src/services/jobPositions/queries';
import { colors } from '@src/styles/colors';

import ModalConfirm from '@src/components/ModalConfirm';

import JobCard from './JobCard';
import ModalJob from './ModalJob';
import Table from './Table';

import * as S from '../styles';

const OfficesSettings = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { data: jobs, mutate: getJobs, isPending } = useGetJobPositions();
  const { isMobile } = useResponsive();

  const { mutateAsync: handleDeleteJob, isPending: isPendingDelete } =
    useDeleteJobPosition();

  // const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
  const [jobName, setJobName] = useState(null);
  const [jobId, setJobId] = useState(null);

  // const handleCloseModal = () => {
  //   setOpenDialog(false);
  // };

  // const handleOpenModal = () => {
  //   setOpenDialog(true);
  // };

  const handleCloseModal = () => {
    setOpenDialog(false);
    setJobId(null);
    getJobs({});
  };

  const handleOpenModal = (name?: string, id?: number) => {
    setOpenDialog(true);
    setJobName(name);
    setJobId(id);
  };

  const handleOpenModalDelete = (id: number) => {
    setIsOpenModalDelete(true);
    setJobId(id);
  };

  const handleCloseModalDelete = () => {
    setIsOpenModalDelete(false);
    setJobId(null);
    getJobs({});
  };

  const handleDelete = async () => {
    await handleDeleteJob({ id: jobId });
    handleCloseModalDelete();
  };

  useEffect(() => {
    getJobs({});
  }, []);

  // Helper function to render job cards
  const renderJobCards = () => (
    <Box display="flex" flexDirection="column" gap={2}>
      {jobs?.map((job) => (
        <JobCard
          job={job}
          onEdit={handleOpenModal}
          onDelete={handleOpenModalDelete}
        />
      ))}
    </Box>
  );

  return (
    <div>
      <S.Container>
        <S.ContainerTitles>
          <S.Title>Cargos</S.Title>
        </S.ContainerTitles>

        {!isMobile && (
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <S.ContainerButtonsAdd>
              <S.ButtonClick onClick={() => handleOpenModal()}>
                +Adicionar Cargo
              </S.ButtonClick>
            </S.ContainerButtonsAdd>
          </Box>
        )}
      </S.Container>

      <Grid
        container
        spacing={isMobile ? 2 : 4}
        direction={isMobile ? 'column' : 'row'}
        display="flex"
        justifyContent="space-between"
      >
        {isMobile && (
          <Grid item xs={12} mt={isMobile ? 2 : 0}>
            <S.ContainerButtonsAdd>
              <S.ButtonClick onClick={() => handleOpenModal()}>
                +Adicionar Cargo
              </S.ButtonClick>
            </S.ContainerButtonsAdd>
          </Grid>
        )}

        <Grid item xs={12}>
          {isMobile ? (
            renderJobCards()
          ) : (
            <Table
              jobs={jobs}
              getJobs={getJobs}
              isPending={isPending}
              handleOpenModal={handleOpenModal}
              handleOpenModalDelete={handleOpenModalDelete}
            />
          )}
        </Grid>
      </Grid>

      {openDialog && (
        <ModalJob
          openDialog={openDialog}
          handleClose={handleCloseModal}
          getJobs={getJobs}
        />
      )}

      {openDialog && (
        <ModalJob
          openDialog={openDialog}
          handleClose={handleCloseModal}
          jobName={jobName}
          jobId={jobId}
          getJobs={getJobs}
        />
      )}
      {isOpenModalDelete && (
        <ModalConfirm
          openDialog={isOpenModalDelete}
          handleClose={handleCloseModalDelete}
          handleConfirm={handleDelete}
          isLoading={isPendingDelete}
          textButtonConfirm={'Excluir'}
          colorButtonConfirm={colors.error.dark}
          text={
            'Essa ação não poderá ser desfeita. Deseja realmente excluir este cargo?'
          }
          titleModal={'Excluir'}
        />
      )}
    </div>
  );
};

export default OfficesSettings;
