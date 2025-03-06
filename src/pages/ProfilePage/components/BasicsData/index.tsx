import React, { useEffect } from 'react';

import { Grid } from '@material-ui/core';
import { useGetContracts } from '@src/services/contractsService/queries';
import { useGetJobPositions } from '@src/services/jobPositions/queries';
import { useGetSectors } from '@src/services/sectorService/queries';
import { useGetStatus } from '@src/services/status/queries';
import { maskCpf, maskDate } from '@src/utils/mask';

import Select from '@src/components/Select';

import TextInput from '@components/TextInput';

import { useProfilePage } from '../../contexts/ProfilePageContext';

import * as S from './styles';

interface BasicsDataProps {
  user: any;
}

function BasicsData({ user }) {
  const { data: jobs, mutate: getJobs } = useGetJobPositions();
  const { data: contracts, mutate: getContracts } = useGetContracts();
  const { data: sectors, mutate: getSectors } = useGetSectors();
  const { data: status, mutate: getStatus } = useGetStatus();

  const { formik } = useProfilePage();

  useEffect(() => {
    getJobs({});
    getContracts({});
    getSectors({});
    getStatus({});
  }, []);

  return (
    // <form onSubmit={formik.handleSubmit}>
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <TextInput
          name="name"
          label="Nome"
          value={formik.values.name}
          placeholder="Nome"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          mini
        />
      </Grid>
      <Grid item xs={4}>
        <TextInput
          name="phone"
          label="Telefone"
          value={formik.values.phone}
          placeholder="Telefone"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
          mini
        />
      </Grid>
      <Grid item xs={4}>
        <TextInput
          name="email"
          label="Email"
          value={formik.values.email}
          placeholder="Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          mini
        />
      </Grid>
      <Grid item xs={4}>
        <TextInput
          name="cpf"
          label="CPF"
          value={maskCpf(formik.values.cpf)}
          placeholder="CPF"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.cpf && Boolean(formik.errors.cpf)}
          helperText={formik.touched.cpf && formik.errors.cpf}
          mini
        />
      </Grid>

      <Grid item xs={4}>
        <TextInput
          name="registration"
          label="Matrícula"
          value={formik.values.registration}
          placeholder="Matrícula"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.registration && Boolean(formik.errors.registration)
          }
          helperText={formik.touched.registration && formik.errors.registration}
          mini
        />
      </Grid>
      <Grid item xs={4}>
        <TextInput
          name="dateOfBirth"
          label="Data de Nascimento"
          value={maskDate(formik.values.dateOfBirth)}
          placeholder="Data de nascimento"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)
          }
          helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
          mini
        />
      </Grid>
      <Grid item xs={8}>
        <TextInput
          name="address"
          label="Endereço"
          value={formik.values.address}
          placeholder="Endereço"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
          mini
        />
      </Grid>
      <Grid item xs={4}>
        <S.FieldBox>
          <Select
            label="Cargo"
            options={jobs}
            value={formik.values.jobPosition_id}
            name={
              jobs?.find((item) => item.value === formik.values.jobPosition_id)
                ?.name
            }
            onChange={(e) => formik.setFieldValue('jobPosition_id', e.value)}
            onBlur={formik.handleBlur}
            error={
              formik.touched.jobPosition_id &&
              Boolean(formik.errors.jobPosition_id)
            }
            //   helperText={formik.touched.jobPosition_id && formik.errors.jobPosition_id}
            clearable
          />
        </S.FieldBox>
      </Grid>
      <Grid item xs={4}>
        <S.FieldBox>
          <Select
            label="Contrato"
            options={contracts}
            value={formik.values.contracts_value}
            name={
              contracts?.find(
                (item) => item.value === formik.values.contracts_value,
              )?.name
            }
            onChange={(e) => formik.setFieldValue('contracts_value', e.value)}
            onBlur={formik.handleBlur}
            error={
              formik.touched.contracts_value &&
              Boolean(formik.errors.contracts_value)
            }
            //   helperText={formik.touched.contracts_value && formik.errors.contracts_value}
            clearable
          />
        </S.FieldBox>
      </Grid>
      <Grid item xs={4}>
        <S.FieldBox>
          <Select
            label="Setor"
            // placeholder="Setor"
            options={sectors}
            value={formik.values.sector_value}
            name={
              sectors?.find((item) => item.value === formik.values.sector_value)
                ?.name
            }
            onChange={(e) => formik.setFieldValue('sector_value', e.value)}
            onBlur={formik.handleBlur}
            error={
              formik.touched.sector_value && Boolean(formik.errors.sector_value)
            }
            //   helperText={formik.touched.sector_value && formik.errors.sector_value}
            clearable
          />
        </S.FieldBox>
      </Grid>
    </Grid>
    // </form>
  );
}

export default BasicsData;
