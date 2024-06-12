import React, { useState } from 'react';

import { Box, Grid, IconButton, InputAdornment } from '@material-ui/core';
import PersonAddTwoToneIcon from '@material-ui/icons/PersonAddTwoTone';
import PostAddRoundedIcon from '@material-ui/icons/PostAddRounded';
import SearchIcon from '@material-ui/icons/Search';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import {
  basicNames,
  cargos,
  recebidos,
  setores,
  seções,
} from '@src/utils/constants';

import Select from '@src/components/Select';
import SelectCustom from '@src/components/SelectCustom';
import TextInput from '@src/components/TextInput';

import * as S from './styles';

// import { Container } from './styles';
const OptionEmpty = {
  value: '',
  name: '',
};

export const Filters = () => {
  const classes = S.useStyles();
  const [search, setSearch] = useState('');
  const [cargo, setCargo] = useState(OptionEmpty);
  const [setor, setSetor] = useState(OptionEmpty);
  const [recebido, setRecebido] = useState(OptionEmpty);
  const [seção, setSeção] = useState(OptionEmpty);

  const handleChangeFilter = (event: any) => {
    const { value, name } = event.target;
    setSearch(value);
  };

  return (
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
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <S.FieldBox>
              <Select
                label={basicNames.office.singular}
                options={cargos}
                value={cargo?.value}
                name={cargo.name}
                onChange={setCargo}
                clearable
              />
            </S.FieldBox>
          </Grid>

          <Grid item xs={3}>
            <S.FieldBox>
              <Select
                label={basicNames.sector.singular}
                options={setores}
                value={setor?.value}
                name={setor.name}
                onChange={setSetor}
                clearable
              />
            </S.FieldBox>
          </Grid>

          <Grid item xs={3}>
            <S.FieldBox>
              <Select
                label={basicNames.section.singular}
                options={seções}
                value={seção?.value}
                name={seção.name}
                onChange={setSeção}
                clearable
              />
            </S.FieldBox>
          </Grid>
        </Grid>
      </S.ContainerSelects>
      <S.ButtonAdd
        variant="contained"
        color="primary"
        disableRipple
        className={classes.button}
        startIcon={<PersonAddAltRoundedIcon />}
      >
        Adicionar Funcionário
      </S.ButtonAdd>
    </S.ContainerFilters>
  );
};

export default Filters;
