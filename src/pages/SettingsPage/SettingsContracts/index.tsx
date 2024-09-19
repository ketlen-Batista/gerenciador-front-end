// import React, { useState } from 'react';
// import { Grid } from '@material-ui/core';
// import { useGetContracts } from '@src/services/contractsService/queries';
// import { basicNames, setores } from '@src/utils/constants';
// import ModalContracts from './ModalContracts';
// import Table from './Table';
// import * as S from '../styles';
// const SettingsContracts = () => {
//   const [openDialog, setOpenDialog] = useState<boolean>(false);
//   const handleCloseModal = () => {
//     setOpenDialog(false);
//   };
//   const handleOpenModal = () => {
//     setOpenDialog(true);
//   };
//   const {
//     data: contracts,
//     mutate: getContracts,
//     isPending,
//   } = useGetContracts();
//   return (
//     <div>
//       <S.Container>
//         <S.ContainerTitles>
//           <S.Title>{`${basicNames.sector.plural}`}</S.Title>
//           {/* <S.SubTitle>Lista de seções</S.SubTitle> */}
//         </S.ContainerTitles>
//       </S.Container>
//       <Grid container>
//         <Grid item xs={8}>
//           <Table
//             contracts={contracts}
//             getContracts={getContracts}
//             isPending={isPending}
//           />
//         </Grid>
//         <Grid item xs={4}>
//           {' '}
//           <S.ContainerButtonsAdd>
//             <S.ButtonClick
//               onClick={handleOpenModal}
//             >{`+Adicionar ${basicNames.sector.singular}`}</S.ButtonClick>
//           </S.ContainerButtonsAdd>
//         </Grid>
//       </Grid>
//       {openDialog && (
//         <ModalContracts
//           openDialog={openDialog}
//           handleClose={handleCloseModal}
//           getContracts={getContracts}
//         />
//       )}
//     </div>
//   );
// };
// export default SettingsContracts;
/////////////////////
import React, { useState } from 'react';

import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Box, Grid } from '@mui/material';
import {
  useDeleteContract,
  useGetContracts,
} from '@src/services/contractsService/queries';
import { colors } from '@src/styles/colors';
import { basicNames } from '@src/utils/constants';

import ModalConfirm from '@src/components/ModalConfirm';

import Cards from './Cards';
import ModalContracts from './ModalContracts';
import Table from './Table';

// componente novo para renderizar os cards
import * as S from '../styles';

const SettingsContracts = () => {
  // const [openDialog, setOpenDialog] = useState<boolean>(false);

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [contractName, setContractName] = useState(null);
  const [contractStatus, setContractStatus] = useState(null);
  const [contractValidity, setContractValidity] = useState(null);
  const [contractId, setContractId] = useState(null);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
  const [contractIdToDelete, setContractIdToDelete] = useState<number | null>(
    null,
  );

  // const handleCloseModal = () => {
  //   setOpenDialog(false);
  // };

  // const handleOpenModal = () => {
  //   setOpenDialog(true);
  // };

  const {
    data: contracts,
    mutate: getContracts,
    isPending,
  } = useGetContracts();

  const {
    mutateAsync: deleteContract,
    isPending: isPendingDelete,
    isSuccess: isSuccessDelete,
  } = useDeleteContract();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Verifica se é mobile

  const handleCloseModal = () => {
    setOpenDialog(false);
  };

  const handleOpenModal = (
    name?: string,
    id?: number,
    status?: string,
    validity?: boolean,
  ) => {
    setOpenDialog(true);
    setContractName(name);
    setContractId(id);
    setContractStatus(status);
    setContractValidity(validity);
  };

  const handleOpenModalDelete = (id: number) => {
    setIsOpenModalDelete(true);
    setContractIdToDelete(id);
  };

  const handleCloseModalDelete = () => {
    setIsOpenModalDelete(false);
    setContractIdToDelete(null);
  };

  const handleDelete = async () => {
    await deleteContract({ id: contractIdToDelete });
    handleCloseModalDelete();
  };

  return (
    <div>
      <S.Container>
        <S.ContainerTitles>
          <S.Title>{`${basicNames.sector.plural}`}</S.Title>
        </S.ContainerTitles>
        {!isMobile && (
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <S.ContainerButtonsAdd>
              <S.ButtonClick
                onClick={() => handleOpenModal()}
              >{`+Adicionar ${basicNames.sector.singular}`}</S.ButtonClick>
            </S.ContainerButtonsAdd>
          </Box>
        )}
      </S.Container>
      <Grid container>
        {isMobile && (
          <Grid item xs={12} sm={4} mb={3}>
            <S.ContainerButtonsAdd>
              <S.ButtonClick
                onClick={() => handleOpenModal()}
              >{`+Adicionar ${basicNames.sector.singular}`}</S.ButtonClick>
            </S.ContainerButtonsAdd>
          </Grid>
        )}

        <Grid item xs={12}>
          {isMobile ? (
            <Cards
              contracts={contracts}
              handleOpenModal={handleOpenModal}
              handleOpenModalDelete={handleOpenModalDelete}
            />
          ) : (
            <Table
              contracts={contracts}
              getContracts={getContracts}
              isPending={isPending}
            />
          )}
        </Grid>
      </Grid>

      {openDialog && (
        <ModalContracts
          openDialog={openDialog}
          handleClose={handleCloseModal}
          contractName={contractName}
          contractId={contractId}
          getContracts={getContracts}
          contractStatus={contractStatus}
          contractValidity={contractValidity}
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
            'Essa ação não poderá ser desfeita. Deseja realmente excluir este contrato?'
          }
          titleModal={'Excluir'}
        />
      )}
    </div>
  );
};

export default SettingsContracts;
