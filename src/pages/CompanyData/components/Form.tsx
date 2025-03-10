import React, { useEffect } from 'react';

import { Grid } from '@material-ui/core';
import { useAuth } from '@src/hooks/useAuth';
import useResponsive from '@src/hooks/useResponsive';

import TextInput from '@components/TextInput';

import { useCompanyData } from '../contexts/CompanyDataContext';

import * as S from './styles';

function Form() {
  const { formik, getCompany, isLoadingCompany } = useCompanyData();
  const { isDesktop } = useResponsive();
  const { permissions } = useAuth();

  useEffect(() => {
    getCompany();
  }, []);

  return (
    <S.Container>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={isDesktop ? 6 : 12}>
            <TextInput
              name="name"
              label="Nome da Empresa"
              value={formik.values.name}
              placeholder="Nome da Empresa"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              disabled={!permissions?.['editUser']}
            />
          </Grid>
          <Grid item xs={isDesktop ? 6 : 12}>
            <TextInput
              name="address"
              label="Endereço"
              value={formik.values.address}
              placeholder="Endereço"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              disabled={!permissions?.['editUser']}
            />
          </Grid>
          <Grid item xs={isDesktop ? 6 : 12}>
            <TextInput
              name="phone"
              label="Telefone"
              value={formik.values.phone}
              placeholder="Telefone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              disabled={!permissions?.['editUser']}
            />
          </Grid>
          <Grid item xs={isDesktop ? 6 : 12}>
            <TextInput
              name="email"
              label="Email"
              value={formik.values.email}
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              disabled={!permissions?.['editUser']}
            />
          </Grid>
          <Grid item xs={isDesktop ? 6 : 12}>
            <TextInput
              name="website"
              label="Website"
              value={formik.values.website}
              placeholder="Website"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.website && Boolean(formik.errors.website)}
              helperText={formik.touched.website && formik.errors.website}
              disabled={!permissions?.['editUser']}
            />
          </Grid>
        </Grid>
        <S.ContainerButton>
          <S.ButtonStyle
            type="submit"
            disableElevation
            disabled={!permissions?.['editUser']}
          >
            Salvar
          </S.ButtonStyle>
        </S.ContainerButton>
      </form>
    </S.Container>
  );
}

export default Form;
