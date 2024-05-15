//PÁGINA FUNCIONARIOS
import React, { useState } from 'react';

import { Box } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import PostAddRoundedIcon from '@material-ui/icons/PostAddRounded';
import SearchIcon from '@material-ui/icons/Search';
import DefaultPage from '@templates/DefaultPage';

import TextInput from '../../components//TextInput';
import SelectCustom from '../../components/SelectCustom';

import TableDocuments from './TableDocuments';

import * as S from './styles';

const recebidos = [
  {
    name: 'Todos',
    value: 'todos',
  },
  {
    name: 'Enviados',
    value: 'enviados',
  },
  {
    name: 'Recebidos',
    value: 'recebidos',
  },
];
const setores = [
  {
    name: 'Setor',
    value: 'setor',
  },
  {
    name: 'Todos',
    value: 'todos',
  },
  {
    name: 'Saúde',
    value: 'saude',
  },
  {
    name: 'Educação',
    value: 'educacao',
  },
  {
    name: 'TJ',
    value: 'tj',
  },
];

const cargos = [
  {
    name: 'Cargo',
    value: 'cargo',
  },
  {
    name: 'Todos',
    value: 'todos',
  },
  {
    name: 'Gerente',
    value: 'gerente',
  },
  {
    name: 'Auxiliar',
    value: 'auxiliar',
  },
  {
    name: 'Encarregado',
    value: 'encarregado',
  },
  {
    name: 'Diretor',
    value: 'diretor',
  },
];

const seção = [
  {
    name: 'Seção',
    value: 'seção',
  },
  {
    name: 'Todos',
    value: 'todos',
  },
  {
    name: 'Escola 1',
    value: 'escola1',
  },
  {
    name: 'Escola 1',
    value: 'escola1',
  },
  {
    name: 'Escola 2',
    value: 'escola2',
  },
  {
    name: 'Escola 3',
    value: 'escola3',
  },
  {
    name: 'Escola 4',
    value: 'escola4',
  },
];

function DocumentsPage() {
  const classes = S.useStyles();
  const [search, setSearch] = useState('');

  const handleChangeFilter = (event: any) => {
    const { value, name } = event.target;
    setSearch(value);
  };

  return (
    <DefaultPage pageTitle="Documentos">
      <S.ContainerFilters>
        {' '}
        <S.ContainerInput>
          <TextInput
            name="search"
            label="Buscar"
            value={search}
            placeholder="Buscar"
            onChange={(e: any) =>
              handleChangeFilter({
                target: { name: 'search', value: e.target.value },
              })
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Clique para buscar"
                    onClick={handleChangeFilter}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            mini
          />
        </S.ContainerInput>
        <S.ContainerSelects>
          <Box display="flex" width="100px" mr="5px" height="45px">
            <SelectCustom options={cargos} defautSelected={'cargo'} />
          </Box>
          <SelectCustom options={setores} defautSelected={'setor'} />
          <SelectCustom options={seção} defautSelected={'seção'} />
          <SelectCustom options={recebidos} defautSelected={'enviados'} />
        </S.ContainerSelects>
        <S.ContainerButton>
          <S.ButtonAdd
            variant="contained"
            color="primary"
            disableRipple
            className={classes.button}
            startIcon={<PostAddRoundedIcon />}
            title="Enviar Documentos"
          >
            Enviar Documentos
          </S.ButtonAdd>{' '}
        </S.ContainerButton>
      </S.ContainerFilters>

      <TableDocuments />
    </DefaultPage>
  );
}

export default DocumentsPage;
