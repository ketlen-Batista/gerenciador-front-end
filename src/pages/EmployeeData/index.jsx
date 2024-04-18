import React, { useState } from 'react';
import * as S from './styles';
import avatar from '../../assets/avatar1.jpg';
import TextInput from '../../components/TextInput';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import Tooltip from '@material-ui/core/Tooltip';

const data = {
  id: '9d5b884e-8d72-4f29-8e23-f06ebe2394d0',
  name: 'Cecília Silva',
  email: 'maria@gmail.com',
  phone: '(61)000000000',
  cpf: '00058205444',
  address: 'rua 2, california',
  registration: '01',
  dateOfBirth: '01-01-1990',
  office: 'Gerente',
  sector: 'Educação',
  section: 'Colégio Fátima Rodrigues',
  status: 'Ativa',
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
    data.dateOfBirth
  );
  const [cargo, setCargo] = useState(data.office);
  const [setor, setSetor] = useState(data.sector);
  const [seção, setSeção] = useState(data.section);

  return (
    <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
      {/* container header */}
      <S.ContainerHeader>
        {/* IMAGEM DO FUNCIONÁRIO */}
        <S.Image src={avatar} />

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

      {/* INPUT DO NOME */}
      <TextInput
        name="name"
        label="Nome"
        value={name}
        placeholder="Nome"
        onChange={(event) => setName(event.target.value)}
        mini
      />
      {/* INPUT DO TELEFONE */}
      <TextInput
        name="phone"
        label="Telefone"
        value={phone}
        placeholder="Telefone"
        onChange={(event) => setPhone(event.target.value)}
        mini
      />
      {/* INPUT DO EMAIL */}
      <TextInput
        name="email"
        label="Email"
        value={email}
        placeholder="Email"
        onChange={(event) => setEmail(event.target.value)}
        mini
      />
      {/* INPUT DO CPF */}
      <TextInput
        name="cpf"
        label="CPF"
        value={cpf}
        placeholder="CPF"
        onChange={(event) => setCpf(event.target.value)}
        mini
      />
      {/* INPUT DO ID */}
      <TextInput
        name="id"
        label="ID"
        value={id}
        placeholder="ID"
        onChange={(event) => setId(event.target.value)}
        mini
      />
      {/* INPUT DO ENDEREÇO */}
      <TextInput
        name="address"
        label="Endereço"
        value={endereço}
        placeholder="Endereço"
        onChange={(event) => setEndereço(event.target.value)}
        mini
      />
      {/* INPUT DO MATRÍCULA */}
      <TextInput
        name="registration"
        label="Matrícula"
        value={matrícula}
        placeholder="Matrícula"
        onChange={(event) => setMatrícula(event.target.value)}
        mini
      />
      {/* INPUT DO DATA DE NASCIMENTO */}
      <TextInput
        name="dateOfBirth"
        label="Data de Nascimento"
        value={data_de_nascimento}
        placeholder="Data de nascimento"
        onChange={(event) => setData_de_nascimento(event.target.value)}
        mini
      />
      {/* INPUT DO CARGO */}
      <TextInput
        name="office"
        label="Cargo"
        value={cargo}
        placeholder="Cargo"
        onChange={(event) => setCargo(event.target.value)}
        mini
      />
      {/* INPUT DO SETOR */}
      <TextInput
        name="sector"
        label="Setor"
        value={setor}
        placeholder="Setor"
        onChange={(event) => setSetor(event.target.value)}
        mini
      />
      {/* INPUT DO SEÇÃO */}
      <TextInput
        name="section"
        label="Seção"
        value={seção}
        placeholder="Seção"
        onChange={(event) => setSeção(event.target.value)}
        mini
      />
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
  );
}

export default EmployeeData;
