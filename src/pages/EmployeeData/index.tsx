import React, { useEffect, useState } from 'react';

import avatar from '@assets/avatar1.jpg';
import { Grid, Tooltip } from '@material-ui/core';
import {
  CameraAltOutlined as CameraAltOutlinedIcon,
  DateRangeOutlined as DateRangeOutlinedIcon,
  DeleteOutline as DeleteOutlineIcon,
  DescriptionOutlined as DescriptionOutlinedIcon,
  EqualizerOutlined as EqualizerOutlinedIcon,
} from '@material-ui/icons';
import { useGetContracts } from '@src/services/contractsService/queries';
import { useGetJobPositions } from '@src/services/jobPositions/queries';
import { useGetSectors } from '@src/services/sectorService/queries';
import { useGetUser } from '@src/services/users/queries';
import DefaultPage from '@templates/DefaultPage';
import { useLocation } from 'react-router-dom';

import ImageAvatar from '../../components/ImageAvatar';
import TextInput from '../../components/TextInput';
import Select from '@src/components/Select';

import * as S from './styles';

interface EmployeeDataProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  address: string;
  registration: string;
  dateOfBirth: string;
  jobPosition_id: number;
  office: string;
  status: string;
  contracts_value: number;
  sector_value: number;
}

const emptyEmployeeData = {
  id: '',
  name: '',
  email: '',
  phone: '',
  cpf: '',
  address: '',
  registration: '',
  dateOfBirth: '',
  jobPosition_id: null,
  office: '',
  status: '',
  contracts_value: null,
  sector_value: null,
};

function EmployeeData() {
  const location = useLocation();
  const { employeeId } = location.state || {};

  const {
    data: user,
    mutate: getUser,
    isPending: isLoadingUser,
  } = useGetUser();
  const { data: jobs, mutate: getJobs } = useGetJobPositions();
  const { data: contracts, mutate: getContracts } = useGetContracts();
  const { data: sectors, mutate: getSectors } = useGetSectors();

  useEffect(() => {
    if (employeeId) {
      console.log({ employeeId });
      getUser({ userId: employeeId });
    }
    getJobs({});
    getContracts({});
    getSectors({});
  }, [employeeId]);

  const [formData, setFormData] =
    useState<EmployeeDataProps>(emptyEmployeeData);

  useEffect(() => {
    // const employee = initialData.find((emp) => emp.id === employeeId);
    if (user?.user) {
      setFormData(user?.user);
    } else {
      setFormData(emptyEmployeeData);
    }
  }, [user]);

  const handleChange = (field) => (event) => {
    const value = event.target ? event.target.value : event?.value;

    setFormData({
      ...formData,
      [field]: value,
    });
  };

  return (
    <DefaultPage pageTitle="Dados do Funcionário">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '0px 30px',
        }}
      >
        <S.ContainerHeader>
          <ImageAvatar imageAvatar={avatar} />
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

        {formData && !isLoadingUser && (
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextInput
                name="name"
                label="Nome"
                value={formData.name}
                placeholder="Nome"
                onChange={handleChange('name')}
                mini
              />
            </Grid>
            <Grid item xs={4}>
              <TextInput
                name="phone"
                label="Telefone"
                value={formData.phone}
                placeholder="Telefone"
                onChange={handleChange('phone')}
                mini
              />
            </Grid>
            <Grid item xs={4}>
              <TextInput
                name="email"
                label="Email"
                value={formData.email}
                placeholder="Email"
                onChange={handleChange('email')}
                mini
              />
            </Grid>
            <Grid item xs={4}>
              <TextInput
                name="cpf"
                label="CPF"
                value={formData.cpf}
                placeholder="CPF"
                onChange={handleChange('cpf')}
                mini
              />
            </Grid>
            <Grid item xs={4}>
              <TextInput
                name="id"
                label="ID"
                value={formData.id}
                placeholder="ID"
                onChange={handleChange('id')}
                mini
              />
            </Grid>
            <Grid item xs={4}>
              <TextInput
                name="registration"
                label="Matrícula"
                value={formData.registration}
                placeholder="Matrícula"
                onChange={handleChange('registration')}
                mini
              />
            </Grid>
            <Grid item xs={4}>
              <TextInput
                name="dateOfBirth"
                label="Data de Nascimento"
                value={formData.dateOfBirth}
                placeholder="Data de nascimento"
                onChange={handleChange('dateOfBirth')}
                mini
              />
            </Grid>
            <Grid item xs={4}>
              <TextInput
                name="address"
                label="Endereço"
                value={formData.address}
                placeholder="Endereço"
                onChange={handleChange('address')}
                mini
              />
            </Grid>

            <Grid item xs={4}>
              <S.FieldBox>
                <Select
                  label="Cargo"
                  options={jobs}
                  value={formData.jobPosition_id}
                  name={
                    jobs?.find((item) => item.value === formData.jobPosition_id)
                      ?.name
                  }
                  onChange={handleChange('jobPosition_id')}
                  clearable
                />
              </S.FieldBox>
            </Grid>
            <Grid item xs={4}>
              <S.FieldBox>
                <Select
                  label="Contrato"
                  options={contracts}
                  value={formData.contracts_value}
                  name={
                    contracts?.find(
                      (item) => item.value === formData.jobPosition_id,
                    )?.name
                  }
                  onChange={handleChange('contracts_value')}
                  clearable
                />
              </S.FieldBox>
            </Grid>
            <Grid item xs={4}>
              <S.FieldBox>
                <Select
                  label="Setor"
                  options={sectors}
                  value={formData.sector_value}
                  name={
                    sectors?.find(
                      (item) => item.value === formData.sector_value,
                    )?.name
                  }
                  onChange={handleChange('sector_value')}
                  clearable
                />
              </S.FieldBox>
            </Grid>
          </Grid>
        )}

        <S.ContainerButton>
          <S.ButtonStyle disableElevation>Salvar</S.ButtonStyle>
        </S.ContainerButton>
      </div>
    </DefaultPage>
  );
}

export default EmployeeData;
