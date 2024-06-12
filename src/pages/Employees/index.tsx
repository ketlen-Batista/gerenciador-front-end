//PÁGINA FUNCIONARIOS
import React, { useState } from 'react';

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonAddTwoToneIcon from '@material-ui/icons/PersonAddTwoTone';
import SearchIcon from '@material-ui/icons/Search';
import DefaultPage from '@templates/DefaultPage';

import SelectCustom from '@components/SelectCustom';
import TextInput from '@components/TextInput';

import Filters from './Filters';
import TableEmployees from './TableEmployees';

import * as S from './styles';

const setores = [
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

const seções = [
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

function Employees() {
  const classes = S.useStyles();
  const [search, setSearch] = useState('');

  const handleChangeFilter = (event) => {
    const { value, name } = event.target;
    setSearch(value);
  };

  return (
    <DefaultPage pageTitle="Funcionários">
      {/* FILTROS */}
      <Filters />

      {/* TABELA */}
      <TableEmployees />
    </DefaultPage>
  );
}

export default Employees;
