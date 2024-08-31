import React, { useEffect, useState } from 'react';

import PostAddRoundedIcon from '@material-ui/icons/PostAddRounded';
import { Box, Grid } from '@mui/material';
import { DocumentsFilterProvider } from '@pages/DocumentsPage/contexts/DocumentsFilterContext';
import useResponsive from '@src/hooks/useResponsive';
import DefaultPage from '@templates/DefaultPage';

import Filters from './components/Filters';
import MobileListDocuments from './components/MobileListDocuments';
import ModalAddDocument from './components/ModalAddDocument';
import TableDocuments from './components/TableDocuments';

import { useDocumentsFilter } from './hooks/useDocumentsFilter';

import * as S from './styles';

function DocumentsList() {
  const classes = S.useStyles();
  const { isDesktop } = useResponsive();

  const { handleCloseModalAdd, handleOpenModalAdd, openDialogAdd } =
    useDocumentsFilter();

  return (
    <Box mt={2}>
      <Filters />

      {isDesktop ? (
        <>
          <S.ContainerButtonAndTitle>
            <S.SubTitle>Lista de Documentos</S.SubTitle>
            <S.ContainerButton>
              <S.ButtonAdd
                variant="contained"
                color="primary"
                disableRipple
                className={classes.button}
                startIcon={<PostAddRoundedIcon />}
                title="Enviar Documentos"
                onClick={handleOpenModalAdd}
              >
                Enviar Documentos
              </S.ButtonAdd>
            </S.ContainerButton>
          </S.ContainerButtonAndTitle>

          <TableDocuments />
        </>
      ) : (
        <Box
          gap={3}
          mt={3}
          mb={1}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Box>
            <S.ButtonAdd
              variant="contained"
              color="primary"
              disableRipple
              className={classes.button}
              startIcon={<PostAddRoundedIcon />}
              title="Enviar Documentos"
              onClick={handleOpenModalAdd}
            >
              Enviar Documento
            </S.ButtonAdd>
          </Box>
          <Box>
            <S.SubTitle>Lista de Documentos</S.SubTitle>
          </Box>

          <MobileListDocuments />
        </Box>
      )}

      {!!openDialogAdd && (
        <ModalAddDocument
          openDialog={openDialogAdd}
          handleClose={handleCloseModalAdd}
        />
      )}
    </Box>
  );
}

export default DocumentsList;
