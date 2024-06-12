import React, { useState } from 'react';

import avatar from '@assets/avatar1.jpg';
import { Grid } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import { basicNames, recebidos } from '@src/utils/constants';
import DefaultPage from '@templates/DefaultPage';

import ImageAvatar from '../../components/ImageAvatar';
import SelectCustom from '../../components/SelectCustom';
import TextInput from '../../components/TextInput';
import Select from '@src/components/Select';
import { factoryEnumToOptions } from '@src/components/Select/factory';

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

const data = {
  id: '9d5b884e-8d72-4f29-8e23-f06ebe2394d0',
  name: 'Cecília Silva',
  email: 'maria@gmail.com',
  phone: '(61)000000000',
  cpf: '00058205444',
  address: 'rua 2, california',
  registration: '01',
  dateOfBirth: '01-01-1990',
  office: { name: 'auxiliar', value: 'auxiliar' },
  sector: { name: 'educacao', value: 'educacao' },
  section: { name: 'escola1', value: 'escola1' },
  status: 'Ativa',
};

const OptionEmpty = {
  value: '',
  name: '',
};
function EmployeeData() {
  const [name, setName] = useState(data.name);
  const [phone, setPhone] = useState(data.phone);
  const [email, setEmail] = useState(data.email);
  const [cpf, setCpf] = useState(data.cpf);
  const [id, setId] = useState(data.id);
  const [endereço, setEndereço] = useState(data.address);
  const [matrícula, setMatrícula] = useState(data.registration);
  const [data_de_nascimento, setData_de_nascimento] = useState(
    data.dateOfBirth,
  );
  const [office, setOffice] = useState(data.office);
  const [setor, setSetor] = useState(data.sector);
  const [seção, setSeção] = useState(data.section);

  return (
    <DefaultPage pageTitle="Dados do Funcionário">
      <div
        style={{
          display: 'flex',
          // gap: '30px',
          flexDirection: 'column',
          padding: '0px 30px',
        }}
      >
        {/* container header */}
        <S.ContainerHeader>
          {/* IMAGEM DO FUNCIONÁRIO */}
          <ImageAvatar imageAvatar={avatar} />
          {/* <S.Image src={avatar} /> */}

          {/* container icons */}
          <S.ContainerIcons>
            <Tooltip title="Relatórios" placement="top">
              <S.CircleIcon>
                <EqualizerOutlinedIcon fontSize="medium" />
              </S.CircleIcon>
            </Tooltip>

            <Tooltip title="Registro de Serviços" placement="top">
              <S.CircleIcon>
                <CameraAltOutlinedIcon fontSize="medium" />
              </S.CircleIcon>
            </Tooltip>

            <Tooltip title="Documentos" placement="top">
              <S.CircleIcon>
                <DescriptionOutlinedIcon fontSize="medium" />
              </S.CircleIcon>
            </Tooltip>

            <Tooltip title="Folha de Ponto" placement="top">
              <S.CircleIcon>
                <DateRangeOutlinedIcon fontSize="medium" />
              </S.CircleIcon>
            </Tooltip>

            <Tooltip title="Deletar" placement="top">
              <S.CircleIcon>
                <DeleteOutlineIcon fontSize="medium" />
              </S.CircleIcon>
            </Tooltip>
          </S.ContainerIcons>
        </S.ContainerHeader>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            {/* INPUT DO NOME */}
            <TextInput
              name="name"
              label="Nome"
              value={name}
              placeholder="Nome"
              onChange={(event) => setName(event.target.value)}
              mini
            />
          </Grid>
          <Grid item xs={4}>
            {/* INPUT DO TELEFONE */}
            <TextInput
              name="phone"
              label="Telefone"
              value={phone}
              placeholder="Telefone"
              onChange={(event) => setPhone(event.target.value)}
              mini
            />
          </Grid>
          <Grid item xs={4}>
            {/* INPUT DO EMAIL */}
            <TextInput
              name="email"
              label="Email"
              value={email}
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
              mini
            />
          </Grid>

          <Grid item xs={4}>
            {/* INPUT DO CPF */}
            <TextInput
              name="cpf"
              label="CPF"
              value={cpf}
              placeholder="CPF"
              onChange={(event) => setCpf(event.target.value)}
              mini
            />
          </Grid>

          <Grid item xs={4}>
            {/* INPUT DO ID */}
            <TextInput
              name="id"
              label="ID"
              value={id}
              placeholder="ID"
              onChange={(event) => setId(event.target.value)}
              mini
            />
          </Grid>

          <Grid item xs={4}>
            {/* INPUT DO MATRÍCULA */}
            <TextInput
              name="registration"
              label="Matrícula"
              value={matrícula}
              placeholder="Matrícula"
              onChange={(event) => setMatrícula(event.target.value)}
              mini
            />
          </Grid>

          <Grid item xs={4}>
            {/* INPUT DO DATA DE NASCIMENTO */}
            <TextInput
              name="dateOfBirth"
              label="Data de Nascimento"
              value={data_de_nascimento}
              placeholder="Data de nascimento"
              onChange={(event) => setData_de_nascimento(event.target.value)}
              mini
            />
          </Grid>

          <Grid item xs={4}>
            {/* INPUT DO ENDEREÇO */}
            <TextInput
              name="address"
              label="Endereço"
              value={endereço}
              placeholder="Endereço"
              onChange={(event) => setEndereço(event.target.value)}
              mini
            />
          </Grid>

          <Grid item xs={4}>
            <S.FieldBox>
              <Select
                label={basicNames.office.singular}
                options={cargos}
                value={office.value}
                name={office.name}
                onChange={setOffice}
                clearable
              />
            </S.FieldBox>
          </Grid>

          <Grid item xs={4}>
            <S.FieldBox>
              <Select
                label={basicNames.sector.singular}
                options={setores}
                value={setor.value}
                name={setor.name}
                onChange={setSetor}
                clearable
              />
            </S.FieldBox>
          </Grid>

          <Grid item xs={4}>
            <S.FieldBox>
              <Select
                label={basicNames.section.singular}
                options={seções}
                value={seção.value}
                name={seção.name}
                onChange={setSeção}
                clearable
              />
            </S.FieldBox>
          </Grid>
        </Grid>

        <S.ContainerButton>
          <S.ButtonStyle
            //   variant="contained"
            //   color="inherit"
            disableElevation
          >
            Salvar
          </S.ButtonStyle>
        </S.ContainerButton>
      </div>
    </DefaultPage>
  );
}

export default EmployeeData;
