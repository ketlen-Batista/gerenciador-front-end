import React, { useEffect, useState } from 'react';

import PostAddRoundedIcon from '@material-ui/icons/PostAddRounded';
import { useListDocuments } from '@src/services/DocumentsService/queries';
import DefaultPage from '@templates/DefaultPage';

import Filters from './Filters';
import ModalAddDocument from './ModalAddDocument';
import TableDocuments from './TableDocuments';

import * as S from './styles';

function DocumentsPage() {
  const classes = S.useStyles();

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    search: '',
    recebido: null,
  });

  const {
    data: listDocuments,
    mutate: getListDocuments,
    isPending,
  } = useListDocuments();

  const handleCloseModal = () => {
    setOpenDialog(false);
    getListDocuments({});
  };

  const handleOpenModal = () => {
    setOpenDialog(true);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  let filteredDocuments = listDocuments?.filter((document) => {
    let matches = true;
    const { search, recebido } = filters;

    if (
      search &&
      !document.documentName.toLowerCase().includes(search.toLowerCase())
    ) {
      matches = false;
    }

    // if (recebido && document.received !== recebido) {
    //   matches = false;
    // }

    return matches;
  });

  useEffect(() => {
    getListDocuments({});
  }, []);

  return (
    <DefaultPage pageTitle="Documentos">
      <Filters onFilterChange={handleFilterChange} />
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
            onClick={handleOpenModal}
          >
            Enviar Documentos
          </S.ButtonAdd>
        </S.ContainerButton>
      </S.ContainerButtonAndTitle>

      {/* TABELA */}
      <TableDocuments
        listDocuments={filteredDocuments}
        getListDocuments={getListDocuments}
        isPending={isPending}
      />
      <ModalAddDocument
        openDialog={openDialog}
        handleClose={handleCloseModal}
      />
    </DefaultPage>
  );
}

export default DocumentsPage;
