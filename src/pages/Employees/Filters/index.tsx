import React from 'react';

import { Grid, IconButton, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import { AvailableRoutes } from '@src/routes/availableRoutes';
import { basicNames } from '@src/utils/constants';
import { useNavigate } from 'react-router-dom';

import Select from '@src/components/Select';
import TextInput from '@src/components/TextInput';

import { useEmployeesFilter } from '../contexts/employeesContext';

import * as S from './styles';

export const Filters = () => {
  const classes = S.useStyles();
  const navigate = useNavigate();
  const {
    search,
    setSearch,
    cargo,
    setCargo,
    setSetor,
    setContrato,
    setor,
    contrato,
    jobs,
    filteredSectors,
    filteredContracts,
  } = useEmployeesFilter();

  const handleChangeFilter = (name: string, value?: number | string | null) => {
    switch (name) {
      case 'search':
        setSearch(value);
        break;
      case 'cargo':
        setCargo(value);
        break;
      case 'setor':
        setSetor(value);
        break;
      case 'contrato':
        setContrato(value);
        break;
      default:
        break;
    }
  };

  const handleAddEmployee = () => {
    navigate(AvailableRoutes.employeesDataPage, {
      state: { employeeId: null },
    });
  };

  return (
    <S.ContainerFilters>
      <S.ContainerInput>
        <TextInput
          name="search"
          label="Buscar"
          placeholder="Buscar"
          value={search || ''}
          onChange={(e) => handleChangeFilter('search', e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Clique para buscar"
                  onClick={() => handleChangeFilter('search', search)}
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
                options={jobs}
                value={cargo}
                onChange={(e) => handleChangeFilter('cargo', e.value)}
                label={basicNames.office.singular}
                clearable
              />
            </S.FieldBox>
          </Grid>
          <Grid item xs={3}>
            <S.FieldBox>
              <Select
                options={filteredContracts}
                value={contrato}
                onChange={(e) => handleChangeFilter('contrato', e.value)}
                label={basicNames.sector.singular}
                clearable
              />
            </S.FieldBox>
          </Grid>
          <Grid item xs={3}>
            <S.FieldBox>
              <Select
                options={filteredSectors}
                value={setor}
                onChange={(e) => handleChangeFilter('setor', e.value)}
                label={basicNames.section.singular}
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
        onClick={handleAddEmployee}
      >
        Adicionar Funcionário
      </S.ButtonAdd>
    </S.ContainerFilters>
  );
};

export default Filters;
