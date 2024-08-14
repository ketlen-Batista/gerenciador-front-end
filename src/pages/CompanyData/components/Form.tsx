import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import * as S from './styles';
import TextInput from '@components/TextInput';
import { useCompanyData } from '../contexts/CompanyDataContext';

function Form() {
  const { formik, getCompany, isLoadingCompany } = useCompanyData();

  useEffect(() => {
    getCompany();
  }, [getCompany]);

  return (
    <S.Container>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextInput
              name="name"
              label="Nome da Empresa"
              value={formik.values.name}
              placeholder="Nome da Empresa"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={6}>
            <TextInput
              name="address"
              label="Endereço"
              value={formik.values.address}
              placeholder="Endereço"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Grid>
          <Grid item xs={6}>
            <TextInput
              name="phone"
              label="Telefone"
              value={formik.values.phone}
              placeholder="Telefone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Grid>
          <Grid item xs={6}>
            <TextInput
              name="email"
              label="Email"
              value={formik.values.email}
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          {/* <Grid item xs={6}>
            <TextInput
              name="registrationNumber"
              label="Número de Registro"
              value={formik.values.registrationNumber}
              placeholder="Número de Registro"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.registrationNumber && Boolean(formik.errors.registrationNumber)}
              helperText={formik.touched.registrationNumber && formik.errors.registrationNumber}
            />
          </Grid> */}
          <Grid item xs={6}>
            <TextInput
              name="website"
              label="Website"
              value={formik.values.website}
              placeholder="Website"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.website && Boolean(formik.errors.website)}
              helperText={formik.touched.website && formik.errors.website}
            />
          </Grid>
          <Grid item xs={6}>
            <TextInput
              name="emailPassword"
              label="Senha do Email"
              type="password"
              value={formik.values.emailPassword}
              placeholder="Senha do Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.emailPassword && Boolean(formik.errors.emailPassword)}
              helperText={formik.touched.emailPassword && formik.errors.emailPassword}
            />
          </Grid>
        </Grid>
        <S.ContainerButton>
          <S.ButtonStyle type="submit" disableElevation>
            Salvar
          </S.ButtonStyle>
        </S.ContainerButton>
      </form>
    </S.Container>
  );
}

export default Form;
