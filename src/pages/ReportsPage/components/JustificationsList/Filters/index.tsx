import React, { useRef } from 'react';

import { FormControl, Grid } from '@mui/material';
import { useJustificationsContext } from '@src/pages/ReportsPage/hooks/useJustificationsContext';
import { basicNames } from '@src/utils/constants';
import { INIT_DATE_RANGE } from '@src/utils/dates';

import DateFilter from '@src/components/DateFilter';
import Select from '@src/components/Select';

const Filters = () => {
  const ref = useRef(null);
  const {
    users,
    setFilterUserId,
    filterUserId,
    handleDateFilter,
    cargo,
    setCargo,
    setSetor,
    setContrato,
    setor,
    contrato,
    jobs,
    contracts,
    sectors,
  } = useJustificationsContext();

  const usersCustomSelect = users?.map((user) => {
    return {
      value: user.id,
      name: user.name,
    };
  });

  const handleChangeFilter = (name: string, value?: number | string | null) => {
    switch (name) {
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

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={2}>
        <Select
          options={contracts}
          value={contrato}
          onChange={(e) => handleChangeFilter('contrato', e.value)}
          label={basicNames.sector.singular}
          clearable
        />
      </Grid>
      <Grid item xs={2}>
        <Select
          options={sectors}
          value={setor}
          onChange={(e) => handleChangeFilter('setor', e.value)}
          label={basicNames.section.singular}
          clearable
        />
      </Grid>

      <Grid item xs={2}>
        <Select
          options={jobs}
          value={cargo}
          onChange={(e) => handleChangeFilter('cargo', e.value)}
          label={basicNames.office.singular}
          clearable
        />
      </Grid>

      <Grid item xs={3}>
        <FormControl fullWidth>
          <Select
            label="Usuário"
            options={usersCustomSelect}
            value={filterUserId}
            onChange={(e) => setFilterUserId(e.value as string)}
            clearable
          />
        </FormControl>
      </Grid>

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
