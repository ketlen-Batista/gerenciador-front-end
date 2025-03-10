import React, { useEffect } from 'react';

import { Button, Grid } from '@material-ui/core';
import { useAuth } from '@src/hooks/useAuth';
import { useGetContracts } from '@src/services/contractsService/queries';
import { useGetJobPositions } from '@src/services/jobPositions/queries';
import { useGetSectors } from '@src/services/sectorService/queries';
import { useGetStatus } from '@src/services/status/queries';
import { maskCpf, maskDate } from '@src/utils/mask';

import Select from '@src/components/Select';

import TextInput from '@components/TextInput';

import { useEmployeeData } from '../../contexts/EmployeeDataContext';

import * as S from './styles';

interface BasicsDataProps {
  fieldsDisabled: boolean;
}

function MobileBasicsData({ fieldsDisabled }: BasicsDataProps) {
  const { data: jobs, mutateAsync: getJobs } = useGetJobPositions();
  const { data: contracts, mutateAsync: getContracts } = useGetContracts();
  const { data: sectors, mutateAsync: getSectors } = useGetSectors();
  const { data: status, mutateAsync: getStatus } = useGetStatus();

  const { permissions } = useAuth();
  const { formik } = useEmployeeData();

  const fieldsDisabledCondicion = fieldsDisabled || !permissions?.['editUser'];

  useEffect(() => {
    getJobs({});
    getContracts({});
    getSectors({});
    getStatus({});
  }, [getJobs, getContracts, getSectors, getStatus]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextInput
          name="name"
          label="Nome"
          value={formik?.values.name}
          placeholder="Nome"
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          error={formik?.touched.name && Boolean(formik?.errors.name)}
          helperText={formik?.touched.name && formik?.errors.name}
          disabled={fieldsDisabledCondicion}
          mini
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextInput
          name="phone"
          label="Telefone"
          value={formik?.values.phone}
          placeholder="Telefone"
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          error={formik?.touched.phone && Boolean(formik?.errors.phone)}
          helperText={formik?.touched.phone && formik?.errors.phone}
          disabled={fieldsDisabledCondicion}
          mini
        />
      </Grid>
      <Grid item xs={12}>
        <TextInput
          name="email"
          label="Email"
          value={formik?.values.email}
          placeholder="Email"
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          error={formik?.touched.email && Boolean(formik?.errors.email)}
          helperText={formik?.touched.email && formik?.errors.email}
          disabled={fieldsDisabledCondicion}
          mini
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextInput
          name="cpf"
          label="CPF"
          value={maskCpf(formik?.values.cpf)}
          placeholder="CPF"
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          error={formik?.touched.cpf && Boolean(formik?.errors.cpf)}
          helperText={formik?.touched.cpf && formik?.errors.cpf}
          disabled={fieldsDisabledCondicion}
          mini
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextInput
          name="registration"
          label="Matrícula"
          value={formik?.values.registration}
          placeholder="Matrícula"
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          error={
            formik?.touched.registration && Boolean(formik?.errors.registration)
          }
          helperText={
            formik?.touched.registration && formik?.errors.registration
          }
          disabled={fieldsDisabledCondicion}
          mini
        />
      </Grid>
      <Grid item xs={12}>
        <TextInput
          name="dateOfBirth"
          label="Data de Nascimento"
          value={maskDate(formik?.values.dateOfBirth)}
          placeholder="Data de nascimento"
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          error={
            formik?.touched.dateOfBirth && Boolean(formik?.errors.dateOfBirth)
          }
          helperText={formik?.touched.dateOfBirth && formik?.errors.dateOfBirth}
          disabled={fieldsDisabledCondicion}
          mini
        />
      </Grid>
      <Grid item xs={12}>
        <TextInput
          name="cep"
          label="Cep"
          value={formik?.values.cep}
          placeholder="Cep"
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          error={formik?.touched.cep && Boolean(formik?.errors.cep)}
          helperText={formik?.touched.cep && formik?.errors.cep}
          disabled={fieldsDisabledCondicion}
          mini
        />
      </Grid>
      <Grid item xs={12}>
        <TextInput
          name="address"
          label="Endereço"
          value={formik?.values.address}
          placeholder="Endereço"
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          error={formik?.touched.address && Boolean(formik?.errors.address)}
          helperText={formik?.touched.address && formik?.errors.address}
          disabled={fieldsDisabledCondicion}
          mini
        />
      </Grid>
      <Grid item xs={12}>
        <TextInput
          name="city"
          label="Cidade"
          value={formik?.values.city}
          placeholder="Cidade"
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          error={formik?.touched.city && Boolean(formik?.errors.city)}
          helperText={formik?.touched.city && formik?.errors.city}
          disabled={fieldsDisabledCondicion}
          mini
        />
      </Grid>
      <Grid item xs={12}>
        <TextInput
          name="state"
          label="Estado"
          value={formik?.values.state}
          placeholder="Estado"
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          error={formik?.touched.state && Boolean(formik?.errors.state)}
          helperText={formik?.touched.state && formik?.errors.state}
          disabled={fieldsDisabledCondicion}
          mini
        />
      </Grid>
      <Grid item xs={12}>
        <S.FieldBox>
          <Select
            label="Status"
            options={status}
            value={formik?.values.status_value}
            onChange={(e) => formik?.setFieldValue('status_value', e.value)}
            onBlur={formik?.handleBlur}
            error={
              formik?.touched.status_value &&
              Boolean(formik?.errors.status_value)
            }
            disabled={fieldsDisabledCondicion}
            clearable
            required
          />
        </S.FieldBox>
      </Grid>
      <Grid item xs={12}>
        <S.FieldBox>
          <Select
            label="Cargo"
            options={jobs}
            value={formik?.values.jobPosition_id}
            onChange={(e) => formik?.setFieldValue('jobPosition_id', e.value)}
            onBlur={formik?.handleBlur}
            error={
              formik?.touched.jobPosition_id &&
              Boolean(formik?.errors.jobPosition_id)
            }
            disabled={fieldsDisabledCondicion}
            clearable
            required
          />
        </S.FieldBox>
      </Grid>
      <Grid item xs={12}>
        <S.FieldBox>
          <Select
            label="Contrato"
            options={contracts}
            value={formik?.values.contracts_value}
            onChange={(e) => formik?.setFieldValue('contracts_value', e.value)}
            onBlur={formik?.handleBlur}
            error={
              formik?.touched.contracts_value &&
              Boolean(formik?.errors.contracts_value)
            }
            disabled={fieldsDisabledCondicion}
            clearable
            required
          />
        </S.FieldBox>
      </Grid>
      <Grid item xs={12}>
        <S.FieldBox>
          <Select
            label="Setor"
            options={sectors}
            value={formik?.values.sector_value}
            onChange={(e) => formik?.setFieldValue('sector_value', e.value)}
            onBlur={formik?.handleBlur}
            error={
              formik?.touched.sector_value &&
              Boolean(formik?.errors.sector_value)
            }
            disabled={fieldsDisabledCondicion}
            clearable
            required
          />
        </S.FieldBox>
      </Grid>
      <Grid item xs={12}>
        <TextInput
          name="emergencyContact"
          label="Contato de Emergência"
          value={formik?.values.emergencyContact}
          placeholder="Contato de emergência"
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          error={
            formik?.touched.emergencyContact &&
            Boolean(formik?.errors.emergencyContact)
          }
          helperText={
            formik?.touched.emergencyContact && formik?.errors.emergencyContact
          }
          disabled={fieldsDisabledCondicion}
          mini
        />
      </Grid>
      <Grid item xs={12}>
        <TextInput
          name="supervisor"
          label="Supervisor do Contrato"
          value={formik?.values.supervisor}
          placeholder="Supervisor do contrato"
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          error={
            formik?.touched.supervisor && Boolean(formik?.errors.supervisor)
          }
          helperText={formik?.touched.supervisor && formik?.errors.supervisor}
          disabled={fieldsDisabledCondicion}
          mini
        />
      </Grid>
      <Grid item xs={12}>
        <TextInput
          name="guardian"
          label="Encarregado do Setor"
          value={formik?.values.guardian}
          placeholder="Encarregado do setor"
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          error={formik?.touched.guardian && Boolean(formik?.errors.guardian)}
          helperText={formik?.touched.guardian && formik?.errors.guardian}
          disabled={fieldsDisabledCondicion}
          mini
        />
      </Grid>

      <Grid item xs={12}>
        <form onSubmit={formik?.handleSubmit}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={fieldsDisabledCondicion}
            onClick={() => formik?.handleSubmit()}
            size="medium"
            fullWidth
          >
            Salvar
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}

export default MobileBasicsData;
