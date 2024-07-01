import React, { useEffect, useRef, useState } from 'react';

import { Grid, IconButton, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useGetContracts } from '@src/services/contractsService/queries';
import { useGetJobPositions } from '@src/services/jobPositions/queries';
import { useGetSectors } from '@src/services/sectorService/queries';
import { basicNames, recebidos } from '@src/utils/constants';
import { INIT_DATE_RANGE } from '@src/utils/dates';

import DateFilter, { type DateFilterHandles } from '@src/components/DateFilter';
import { DateRange } from '@src/components/DateFilter/interfaces';
import Select from '@src/components/Select';
import TextInput from '@src/components/TextInput';

import * as S from '../styles';

const OptionEmpty = {
  value: '',
  name: '',
};

const Filters = ({ onFilterChange }) => {
  const ref = useRef<DateFilterHandles>(null);

  const [search, setSearch] = useState('');
  const [recebido, setRecebido] = useState(null);

  useEffect(() => {
    onFilterChange({ search, recebido });
  }, [search, recebido]);

  const handleChangeFilter = (event) => {
    setSearch(event.target.value);
  };

  const handleCloseFilter = () => ref?.current?.closeFilter();

  const handleOnFilter = (value: DateRange) => {
    const formattedDateRange = {
      startDate: value?.startDate ?? INIT_DATE_RANGE.startDate,
      endDate: value?.endDate ?? INIT_DATE_RANGE.endDate,
    };

    handleCloseFilter();
  };

  useEffect(() => {
    setRecebido(null);
    setSearch('');
  }, []);

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
                <IconButton aria-label="Clique para buscar">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          mini
        />
      </S.ContainerInput>
      <S.ContainerSelects>
        {/* <Grid container spacing={1}>
          <Grid item xs={3}>
            <S.FieldBox>
              <Select
                label="Status Documento"
                options={recebidos}
                value={recebido}
                name={recebidos.find((item) => item.value === recebido)?.name}
                onChange={(e) => setRecebido(e.value)}
                clearable
              />
            </S.FieldBox>
          </Grid>
        </Grid> */}
      </S.ContainerSelects>
      <S.DateFilterContainer>
        <DateFilter
          ref={ref}
          onFilter={handleOnFilter}
          initialRange={INIT_DATE_RANGE}
        />
      </S.DateFilterContainer>
    </S.ContainerFilters>
  );
};

export default Filters;
