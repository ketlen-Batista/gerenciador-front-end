// import React, { useState } from 'react';
// import { Grid } from '@mui/material';
// import { useGetStatus } from '@src/services/status/queries';
// import ModalStatus from './ModalStatus';
// import Table from './Table';
// import * as S from '../styles';
// const Status = () => {
//   const [openDialog, setOpenDialog] = useState<boolean>(false);
//   const { data: status, mutate: getStatuss, isPending } = useGetStatus();
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
//           <S.Title>Status</S.Title>
//         </S.ContainerTitles>
//       </S.Container>
//       <Grid container spacing={4} display="flex" justifyContent="space-between">
//         <Grid item xs={5}>
//           <Table
//             status={status}
//             getStatuss={getStatuss}
//             isPending={isPending}
//           />
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
//         <ModalStatus
//           openDialog={openDialog}
//           handleClose={handleCloseModal}
//           getStatuss={getStatuss}
//         />
//       )}
//     </div>
//   );
// };
// export default Status;
import React, { useState } from 'react';

import { Box, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '@src/hooks/useAuth';
import { useGetStatus } from '@src/services/status/queries';

import ModalStatus from './ModalStatus';
import Table from './Table';

import * as S from '../styles';

const Status = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { data: status, mutate: getStatuss, isPending } = useGetStatus();
  const { permissions } = useAuth();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Verifica se é mobile

  const handleCloseModal = () => {
    setOpenDialog(false);
  };

  const handleOpenModal = () => {
    setOpenDialog(true);
  };

  return (
    <div>
      <S.Container>
        <S.ContainerTitles>
          <S.Title>Status</S.Title>
        </S.ContainerTitles>

        {!isMobile && (
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <S.ContainerButtonsAdd>
              <S.ButtonClick
                onClick={handleOpenModal}
                disabled={!permissions?.['editUser']}
              >
                +Adicionar Cargo
              </S.ButtonClick>
            </S.ContainerButtonsAdd>
          </Box>
        )}
      </S.Container>

      <Grid container>
        {isMobile && (
          <Grid item xs={12} mb={3}>
            <S.ContainerButtonsAdd>
              <S.ButtonClick
                onClick={handleOpenModal}
                disabled={!permissions?.['editUser']}
              >
                +Adicionar Cargo
              </S.ButtonClick>
            </S.ContainerButtonsAdd>
          </Grid>
        )}

        <Grid item xs={12}>
          <Table
            status={status}
            getStatuss={getStatuss}
            isPending={isPending}
          />
        </Grid>
      </Grid>

      {openDialog && (
        <ModalStatus
          openDialog={openDialog}
          handleClose={handleCloseModal}
          getStatuss={getStatuss}
        />
      )}
    </div>
  );
};

export default Status;
