import React from 'react';

import { IconButton, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import { Grid } from '@mui/material';
import { useAuth } from '@src/hooks/useAuth';
import { AvailableRoutes } from '@src/routes/availableRoutes';
import { basicNames } from '@src/utils/constants';
import { useNavigate } from 'react-router-dom';

import Select from '@src/components/Select';
import TextInput from '@src/components/TextInput';

import { useEmployeesFilter } from '../contexts/employeesContext';

import * as S from './styles';

export const FiltersMobile = () => {
  const classes = S.useStyles();
  const navigate = useNavigate();
  const { permissions } = useAuth();
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
    <Grid container spacing={1}>
      <Grid item xs={12}>
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
      </Grid>
      {/* <S.ContainerSelects> */}
      {/* <Grid container spacing={1}> */}
      <Grid item xs={12}>
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
      <Grid item xs={12}>
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
      <Grid item xs={12}>
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
      {/* </Grid>
      </S.ContainerSelects> */}
      <Grid item xs={12} mt={2}>
        <S.ButtonAdd
          variant="contained"
          color="primary"
          disableRipple
          className={classes.button}
          startIcon={<PersonAddAltRoundedIcon />}
          onClick={handleAddEmployee}
          disabled={!permissions?.['editUser']}
        >
          Adicionar Funcionário
        </S.ButtonAdd>
      </Grid>
    </Grid>
  );
};

export default FiltersMobile;
