import React, { useCallback, useEffect, useState } from 'react';

import { Box, Grid, Tooltip } from '@mui/material';
import { useGetContracts } from '@src/services/contractsService/queries';
import {
  useCreateSector,
  useUpdateSector,
} from '@src/services/sectorService/queries';
import { UseMutateFunction } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Button from '@src/components/Button';
import CircularProgress from '@src/components/CircularProgress';
import FullScreenDialog from '@src/components/FullScreenDialog';
import Select from '@src/components/Select';
import { SelectOption } from '@src/components/Select/interfaces';
import TextField from '@src/components/TextField';

import MapComponent from '@components/MapComponent';

interface ModalSectorsProps {
  openDialog: boolean;
  handleClose: () => void;
  sectorName?: string;
  idContract?: number | string | null;
  email?: string;
  daySignature?: number | null;
  linkLocation?: string;
  sectorId?: number;
  getSectors?: UseMutateFunction<
    any,
    AxiosError<unknown, any>,
    unknown,
    unknown
  >;
}

const ModalSectors: React.FC<ModalSectorsProps> = ({
  openDialog,
  handleClose,
  sectorName,
  idContract,
  email,
  daySignature,
  linkLocation,
  sectorId,
  getSectors,
}) => {
  console.log({ linkLocation });
  const { mutateAsync: createSector, isSuccess, isPending } = useCreateSector();
  const {
    mutateAsync: updateSector,
    isSuccess: isSuccessUpdate,
    isPending: isPendingUpdate,
  } = useUpdateSector();
  const { data: contracts, mutate: getContracts } = useGetContracts();
  const [locationLink, setLocationLink] = useState<string>('');

  const optionsDaySignature: SelectOption[] = Array.from(
    { length: 30 },
    (_, index) => ({
      name: (index + 1).toString(),
      value: index + 1,
    }),
  );

  const isCompleteGoogleMapsUrl = (url: string) => {
    const completeUrlPattern =
      /https:\/\/www\.google\.com\/maps\/place\/[^@]+@(-?\d+\.\d+),(-?\d+\.\d+)/;
    const shortenedUrlPattern = /https:\/\/goo\.gl\/maps\/[^/]+/;
    if (shortenedUrlPattern.test(url)) {
      return false;
    }
    return completeUrlPattern.test(url);
  };

  const extractCoordinatesFromUrl = useCallback((url: string) => {
    if (!url) {
      return;
    }

    // Handle complete URLs
    let match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (match) {
      const lat = parseFloat(match[1]);
      const lng = parseFloat(match[2]);
      return { lat, lng };
    }

    // Handle shortened URLs
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(url)}&key=YOUR_API_KEY`;
    return fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results[0]) {
          const { lat, lng } = data.results[0].geometry.location;
          return { lat, lng };
        }
        return null;
      });
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required('Nome do setor é obrigatório'),
    contractId: Yup.string().optional(),
    email: Yup.string().optional(),
    daySignature: Yup.number().optional(),
    locationLink: Yup.string().optional(),
    // .test(
    //   'is-complete-url',
    //   'Invalid location link. Please provide a complete Google Maps link, not a shortened URL.',
    //   (value) => isCompleteGoogleMapsUrl(value ?? ''),
    // ),
  });

  const formik = useFormik({
    initialValues: {
      name: sectorName ?? '',
      contractId: idContract ?? '',
      email: email ?? '',
      daySignature: daySignature ?? null,
      locationLink: linkLocation ?? '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const coordinates = await extractCoordinatesFromUrl(values.locationLink);
      // const { lat, lng } = coordinates;

      // if (!coordinates) {
      //   formik.setFieldError(
      //     'locationLink',
      //     'Invalid location link. Please provide a valid Google Maps link.',
      //   );
      //   return;
      // }

      let lat, lng;
      if (coordinates) {
        lat = coordinates.lat;
        lng = coordinates.lng;
      }

      console.log('location', values);
      if (sectorId) {
        await updateSector({
          id: sectorId,
          name: values.name,
          linkLocation: values.locationLink,
          contracts_value: values.contractId,
          email: values.email,
          signatureDate: values.daySignature,
          latitude: lat,
          longitude: lng,
        });
      } else {
        await createSector({
          name: values.name,
          linkLocation: values.locationLink,
          contracts_value: values.contractId,
          email: values.email,
          signatureDate: values.daySignature,
          latitude: lat,
          longitude: lng,
        });
      }

      handleClose();
      getSectors && getSectors({});
    },
  });
  console.log({ formik });
  useEffect(() => {
    getContracts({});
  }, []);

  useEffect(() => {
    if (isSuccess || isSuccessUpdate) {
      handleClose();
      getSectors && getSectors({});
    }
  }, [isSuccess, isSuccessUpdate]);

  return (
    <FullScreenDialog
      open={openDialog}
      onClose={handleClose}
      maxWidth={'md'}
      closeButtonPosition={'right'}
      title={sectorId || sectorName ? 'Editar Setor' : 'Adicionar Setor'}
      fullWidth
      extraFooterComponent={
        <Box display="flex" justifyContent="flex-end" width="100%">
          <Button
            type="submit"
            onClick={() => formik?.handleSubmit()}
            disabled={isPending || isPendingUpdate}
          >
            {isPending || isPendingUpdate ? (
              <CircularProgress size="small" color="primary" />
            ) : (
              'Salvar'
            )}
          </Button>
        </Box>
      }
    >
      <form onSubmit={formik.handleSubmit}>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Nome do setor"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.errors.name && formik.errors.name}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                label="Contrato"
                options={contracts || []}
                name="contractId"
                value={formik.values.contractId}
                onChange={(e) => formik.setFieldValue('contractId', e.value)}
                error={
                  formik.touched.contractId && Boolean(formik.errors.contractId)
                }
                heightSelect={'100%'}
                fullWidth
                clearable
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Email do responsável da unidade"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.errors.email && formik.errors.email}
                fullWidth
                // required
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                label="Dia de envio do código"
                options={optionsDaySignature || []}
                name="daySignature"
                value={formik.values.daySignature}
                onChange={(e) => formik.setFieldValue('daySignature', e.value)}
                error={
                  formik.touched.daySignature &&
                  Boolean(formik.errors.daySignature)
                }
                heightSelect={'100%'}
                fullWidth
                clearable
              />
            </Grid>
            <Grid item xs={12}>
              <Tooltip title="Necessário inserir o link completo da url da localização desejada.">
                <TextField
                  label="Link da Localização"
                  name="locationLink"
                  placeholder="https://www.google.com/maps/place/..."
                  value={formik.values.locationLink}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.locationLink &&
                    Boolean(formik.errors.locationLink)
                  }
                  helperText={
                    formik.touched.locationLink && formik.errors.locationLink
                  }
                  fullWidth
                />
              </Tooltip>
            </Grid>
            {formik.values.locationLink && (
              <Grid item xs={12}>
                <MapComponent locationUrl={formik.values.locationLink} />
              </Grid>
            )}
          </Grid>
        </Box>
      </form>
    </FullScreenDialog>
  );
};

export default ModalSectors;
