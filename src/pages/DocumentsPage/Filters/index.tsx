import React, { useRef, useState } from 'react';

import { Grid, IconButton, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { cargos, recebidos, setores, seções } from '@src/utils/constants';
import { INIT_DATE_RANGE } from '@src/utils/dates';

import DateFilter, { type DateFilterHandles } from '@src/components/DateFilter';
import { DateRange } from '@src/components/DateFilter/interfaces';
import Select from '@src/components/Select';
import TextInput from '@src/components/TextInput';

import * as S from '../styles';

// import { Container } from './styles';
const OptionEmpty = {
  value: '',
  name: '',
};

export const Filters = () => {
  const ref = useRef<DateFilterHandles>(null);

  const [search, setSearch] = useState('');
  const [cargo, setCargo] = useState(OptionEmpty);
  const [setor, setSetor] = useState(OptionEmpty);
  const [recebido, setRecebido] = useState(OptionEmpty);
  const [seção, setSeção] = useState(OptionEmpty);

  //   const [payloadFilter, setPayloadFilter] =
  //   useState<GetEvaluationsFilter>(initPayloadFilter);

  const handleChangeFilter = (event: any) => {
    const { value, name } = event.target;
    setSearch(value);
  };

  const handleCloseFilter = () => ref?.current?.closeFilter();

  const handleOnFilter = (value: DateRange) => {
    const formattedDateRange = {
      startDate: value?.startDate ?? INIT_DATE_RANGE.startDate,
      endDate: value?.endDate ?? INIT_DATE_RANGE.endDate,
    };

    // setPayloadFilter((oldValues) => ({
    //   ...oldValues,
    //   startDate: formattedDateRange.startDate,
    //   endDate: formattedDateRange.endDate,
    // }));

    handleCloseFilter();
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
                label="Cargo"
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
                label="Setor"
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
                label="Seção"
                options={seções}
                value={seção?.value}
                name={seção.name}
                onChange={setSeção}
                clearable
              />
            </S.FieldBox>
          </Grid>
          <Grid item xs={3}>
            <S.FieldBox>
              <Select
                label="Status Documento"
                options={recebidos}
                value={recebido?.value}
                name={recebido.name}
                onChange={setRecebido}
                clearable
              />
            </S.FieldBox>
          </Grid>
        </Grid>
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
