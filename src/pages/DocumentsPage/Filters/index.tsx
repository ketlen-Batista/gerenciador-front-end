import React, { useRef } from 'react';

import { IconButton, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Box, FormControl, Grid } from '@mui/material';
import { INIT_DATE_RANGE } from '@src/utils/dates';

import DateFilter from '@src/components/DateFilter';
import Select from '@src/components/Select';
import TextInput from '@src/components/TextInput';

import { useDocumentsFilter } from '../hooks/useDocumentsFilter';

import * as S from '../styles';

const Filters = () => {
  const ref = useRef(null);
  const {
    search,
    setFilterUserId,
    filterUserId,
    users,
    handleDateFilter,
    handleChangeSearch,
  } = useDocumentsFilter();

  const usersCustomSelect = users
    ? users.map((user) => ({
        value: user.id,
        name: user.name,
      }))
    : [];

  return (
    <Grid container spacing={2} alignItems="center" mt={2}>
      <Grid item xs={4}>
        <S.ContainerInput>
          <TextInput
            name="search"
            label="Buscar"
            value={search}
            placeholder="Buscar"
            onChange={handleChangeSearch}
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
      </Grid>

      <Grid item xs={4}>
        <FormControl fullWidth>
          <Select
            label="Usuário"
            options={usersCustomSelect}
            value={typeof filterUserId !== 'undefined' ? filterUserId : ''}
            onChange={(e) => setFilterUserId(e.value)}
            clearable
          />
        </FormControl>
      </Grid>
      <Grid item xs={1} />
      <Grid item xs={3}>
        <DateFilter
          ref={ref}
          initialRange={INIT_DATE_RANGE}
          onFilter={handleDateFilter}
        />
      </Grid>
    </Grid>
  );
};

export default Filters;
