//PÁGINA FUNCIONARIOS
import React, { useState } from 'react';
import TextInput from '../../components/TextInput';
import SelectCustom from '../../components/SelectCustom';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonAddTwoToneIcon from '@material-ui/icons/PersonAddTwoTone';
import TableEmployees from './components/TableEmployees';
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

const seção = [
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
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginBottom: '20px',
        }}
      >
        {' '}
        <S.ContainerInput>
          <TextInput
            name="search"
            label="Buscar"
            value={search}
            placeholder="Buscar"
            onChange={(e) =>
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
          <SelectCustom options={setores} defautSelected={'todos'} />
          <SelectCustom options={cargos} defautSelected={'gerente'} />
          <SelectCustom options={seção} defautSelected={'escola1'} />
        </S.ContainerSelects>
        <S.ContainerButton>
          <S.ButtonAdd
            variant="contained"
            color="primary"
            disableRipple
            className={classes.button}
            startIcon={<PersonAddTwoToneIcon />}
          >
            Adicionar Funcionário
          </S.ButtonAdd>{' '}
        </S.ContainerButton>
      </div>

      <TableEmployees />
    </>
  );
}

export default Employees;
