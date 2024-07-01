import React, { useEffect, useState } from 'react';

import { Grid, IconButton, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
// import { useNavigate } from 'react-router-dom';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
// import { AvailableRoutes } from '@src/routes/availableRoutes';
import { useGetContracts } from '@src/services/contractsService/queries';
import { useGetJobPositions } from '@src/services/jobPositions/queries';
import { useGetSectors } from '@src/services/sectorService/queries';
import { basicNames } from '@src/utils/constants';

import Select from '@src/components/Select';
import TextInput from '@src/components/TextInput';

import * as S from './styles';

export const Filters = () => {
  const classes = S.useStyles();
  const [search, setSearch] = useState('');
  const [cargo, setCargo] = useState(null);
  const [setor, setSetor] = useState(null);
  const [contrato, setContrato] = useState(null);

  const { data: jobs, mutate: getJobs } = useGetJobPositions();
  const { data: contracts, mutate: getContracts } = useGetContracts();
  const { data: sectors, mutate: getSectors } = useGetSectors();

  useEffect(() => {
    getJobs({});
    getContracts({});
    getSectors({});
  }, []);

  const handleChangeFilter = ({ target: { name, value } }) => {
    if (name === 'search') {
      setSearch(value);
    }
  };

  return (
    <S.ContainerFilters>
      <S.ContainerInput>
        <TextInput
          name="search"
          label="Buscar"
          value={search}
          placeholder="Buscar"
          onChange={handleChangeFilter}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Clique para buscar"
                  onClick={() =>
                    handleChangeFilter({
                      target: { name: 'search', value: search },
                    })
                  }
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
                name={jobs?.find((item) => item.value === cargo)?.name}
                onChange={(e) => setCargo(e.value)}
                label={basicNames.office.singular}
                clearable
              />
            </S.FieldBox>
          </Grid>
          <Grid item xs={3}>
            <S.FieldBox>
              <Select
                options={contracts}
                value={contrato}
                name={contracts?.find((item) => item.value === setor)?.name}
                onChange={(e) => setContrato(e.value)}
                label={basicNames.sector.singular}
                clearable
              />
            </S.FieldBox>
          </Grid>
          <Grid item xs={3}>
            <S.FieldBox>
              <Select
                options={sectors}
                value={setor}
                name={sectors?.find((item) => item.value === setor)?.name}
                onChange={(e) => setSetor(e.value)}
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
      >
        Adicionar Funcionário
      </S.ButtonAdd>
    </S.ContainerFilters>
  );
};

export default Filters;
