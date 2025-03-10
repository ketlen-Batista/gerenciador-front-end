// import React, { useState } from 'react';
// import { Grid } from '@material-ui/core';
// import { useGetSectors } from '@src/services/sectorService/queries';
// import { basicNames } from '@src/utils/constants';
// import ModalSectors from './ModalSectors';
// import Table from './Table';
// import * as S from '../styles';
// const SectorSettings = () => {
//   const [openDialog, setOpenDialog] = useState<boolean>(false);
//   const handleCloseModal = () => {
//     setOpenDialog(false);
//   };
//   const handleOpenModal = () => {
//     setOpenDialog(true);
//   };
//   const { data: sectors, mutate: getSectors, isPending } = useGetSectors();
//   return (
//     <div>
//       <S.Container>
//         <S.ContainerTitles>
//           <S.Title>{`${basicNames.section.plural}`}</S.Title>
//           {/* <S.SubTitle>Lista de seções</S.SubTitle> */}
//         </S.ContainerTitles>
//         {/* <S.ContainerButtons>
//           <Box display="flex" flexDirection="row" justifyContent="flex-end">
//             {setores?.map((item) => (
//               <ButtonFilter key={item.value} textButton={item.name} />
//             ))}
//           </Box>
//         </S.ContainerButtons> */}
//       </S.Container>
//       <Grid container>
//         <Grid item xs={8}>
//           <Table
//             isPending={isPending}
//             sectors={sectors}
//             getSectors={getSectors}
//           />
//         </Grid>
//         <Grid item xs={4}>
//           {' '}
//           <S.ContainerButtonsAdd>
//             <S.ButtonClick
//               onClick={handleOpenModal}
//             >{`+Adicionar ${basicNames.section.singular}`}</S.ButtonClick>
//           </S.ContainerButtonsAdd>
//         </Grid>
//       </Grid>
//       {openDialog && (
//         <ModalSectors
//           openDialog={openDialog}
//           handleClose={handleCloseModal}
//           getSectors={getSectors}
//         />
//       )}
//     </div>
//   );
// };
// export default SectorSettings;
////////////////////////////////
import React, { useEffect, useState } from 'react';

import { Box, Grid } from '@mui/material';
import { useAuth } from '@src/hooks/useAuth';
import useResponsive from '@src/hooks/useResponsive';
// Importe o hook customizado
import {
  useDeleteSector,
  useGetSectors,
} from '@src/services/sectorService/queries';
import { colors } from '@src/styles/colors';
import { basicNames } from '@src/utils/constants';

import ModalConfirm from '@src/components/ModalConfirm';

import Card from './Card';
import ModalSectors from './ModalSectors';
import Table from './Table';

// Componente de Card para visualização em mobile
import * as S from '../styles';

const SectorSettings = () => {
  // const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { isMobile } = useResponsive(); // Utilize o hook customizado
  const { permissions } = useAuth();

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [sectorName, setSectorName] = useState(null);
  const [contractId, setContractId] = useState(null);
  const [linkLocation, setLinkLocation] = useState('');
  const [sectorId, setSectorId] = useState(null);

  const [email, setEmail] = useState('');
  const [daySignature, setDaySignature] = useState(null);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
  const [sectorIdToDelete, setSectorIdToDelete] = useState<number | null>(null);

  // const handleCloseModal = () => {
  //   setOpenDialog(false);
  // };

  // const handleOpenModal = () => {
  //   setOpenDialog(true);
  // };

  const {
    mutateAsync: deleteContract,
    isPending: isPendingDelete,
    isSuccess: isSuccessDelete,
  } = useDeleteSector();

  const handleCloseModal = () => {
    setOpenDialog(false);
  };

  const handleOpenModal = (
    name?: string,
    id?: number,
    idContract?: number,
    locationLink?: string,
    email?: string,
    daySignature?: number,
  ) => {
    console.log({ name });
    setOpenDialog(true);
    setSectorName(name);
    setEmail(email);
    setDaySignature(daySignature);
    setLinkLocation(locationLink);
    setSectorId(id);
    setContractId(idContract);
  };

  const handleOpenModalDelete = (id: number) => {
    setIsOpenModalDelete(true);
    setSectorIdToDelete(id);
  };

  const handleCloseModalDelete = () => {
    setIsOpenModalDelete(false);
    setSectorIdToDelete(null);
  };

  const handleDelete = () => {
    deleteContract({ id: sectorIdToDelete });
    handleCloseModalDelete();
  };

  const { data: sectors, mutate: getSectors, isPending } = useGetSectors();

  useEffect(() => {
    getSectors({});
  }, []);

  return (
    <div>
      {!isMobile ? (
        <S.Container>
          <S.ContainerTitles>
            <S.Title>{`${basicNames.section.plural}`}</S.Title>
          </S.ContainerTitles>

          <Box display="flex" justifyContent="flex-end" mb={2}>
            <S.ContainerButtonsAdd>
              <S.ButtonClick
                onClick={() => handleOpenModal()}
                disabled={!permissions?.['editUser']}
              >
                {`+Adicionar ${basicNames.section.singular}`}
              </S.ButtonClick>
            </S.ContainerButtonsAdd>
          </Box>
        </S.Container>
      ) : (
        <Grid container>
          <Grid item xs={12}>
            <S.ContainerTitles>
              <S.Title>{`${basicNames.section.plural}`}</S.Title>
            </S.ContainerTitles>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end" mb={2}>
              <S.ContainerButtonsAdd>
                <S.ButtonClick
                  onClick={() => handleOpenModal()}
                  disabled={!permissions?.['editUser']}
                >
                  {`+Adicionar ${basicNames.section.singular}`}
                </S.ButtonClick>
              </S.ContainerButtonsAdd>
            </Box>
          </Grid>
        </Grid>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          {isMobile ? (
            <Card
              sectors={sectors}
              isPending={isPending}
              onEdit={handleOpenModal}
              onDelete={handleOpenModalDelete}
            />
          ) : (
            <Table
              sectors={sectors}
              isPending={isPending}
              getSectors={getSectors}
            />
          )}
        </Grid>
      </Grid>
      {/* {openDialog && (
        <ModalSectors
          openDialog={openDialog}
          handleClose={handleCloseModal}
          getSectors={getSectors}
        />
      )} */}
      {openDialog && (
        <ModalSectors
          openDialog={openDialog}
          handleClose={handleCloseModal}
          sectorName={sectorName}
          idContract={contractId}
          linkLocation={linkLocation}
          sectorId={sectorId}
          email={email}
          daySignature={daySignature}
          getSectors={getSectors}
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
            'Essa ação não poderá ser desfeita. Deseja realmente excluir este setor?'
          }
          titleModal={'Excluir'}
        />
      )}
    </div>
  );
};

export default SectorSettings;
