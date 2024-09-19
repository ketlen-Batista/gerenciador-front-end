import React, { useEffect, useRef, useState } from 'react';

import logo from '@assets/imagem1pdfgic.png';
import { InfoOutlined } from '@mui/icons-material';
import { Box, CircularProgress, FormControl, Grid } from '@mui/material';
import useResponsive from '@src/hooks/useResponsive';
import { api } from '@src/lib/axios';
import { useGetContracts } from '@src/services/contractsService/queries';
import { useGetJobPositions } from '@src/services/jobPositions/queries';
import { useGetSectors } from '@src/services/sectorService/queries';
import { useGetServiceRegister } from '@src/services/servicesRegisters/queries';
import { useGetUsers } from '@src/services/users/queries';
import { basicNames } from '@src/utils/constants';
import { INIT_DATE_RANGE, timestampToISO } from '@src/utils/dates';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { PDFDocument, rgb } from 'pdf-lib';
import { useLocation } from 'react-router-dom';

import Button from '@src/components/Button';
import DateFilter from '@src/components/DateFilter';
import Select from '@src/components/Select';
import Typography from '@src/components/Typography';

interface User {
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

const PdfGenerator: React.FC = () => {
  const location = useLocation();
  const { userId } = location.state || {};

  const { isMobile } = useResponsive();

  // State variables
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [filterUserId, setFilterUserId] = useState<string | number>(
    userId ?? '',
  );
  const [users, setUsers] = useState<User[]>([]);
  const [selectedDateRange, setSelectedDateRange] = useState<{
    startDate: number | null;
    endDate: number | null;
  }>({
    startDate: INIT_DATE_RANGE.startDate,
    endDate: INIT_DATE_RANGE.endDate,
  });

  const [setor, setSetor] = useState<number | string | null>(null);
  const [contrato, setContrato] = useState<number | string | null>(null);

  const { data: contracts, mutateAsync: getContracts } = useGetContracts();
  const { data: sectors, mutateAsync: getSectors } = useGetSectors();
  const { data: fetchedUsers, mutateAsync: getUsers } = useGetUsers();

  const {
    data: serviceData,
    mutateAsync: getServiceRegister,
    isPending: loading,
  } = useGetServiceRegister();

  console.log({ serviceData });

  const ref = useRef(null);
  const contractName = contracts
    ?.find((el) => el.id === serviceData?.[0]?.sector?.contracts_value)
    ?.name?.toUpperCase();

  const textPage1 = `FOTOREGISTRO ${contractName ?? 'GIC SERVIÇOS LTDA'}`;

  const handleChangeFilter = (name: string, value?: number | string | null) => {
    switch (name) {
      case 'setor':
        setSetor(value);
        break;
      case 'contrato':
        setContrato(value);
        break;
      default:
        break;
    }
  };

  // Helpers
  const handleDateFilter = (dateRange: {
    startDate: number | null;
    endDate: number | null;
  }) => {
    setSelectedDateRange(dateRange);
  };

  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return format(date, "MMMM 'de' yyyy", { locale: ptBR });
  };

  const generatePdfBytes = async (photoIds: number[]): Promise<Uint8Array> => {
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage([600, 400]); // A4 paisagem
    const { width, height } = page.getSize();
    const imageLogoWidth = width - 140;
    const imageLogoHeight = height - 160;
    const logoImageBytes = await fetch(logo).then((res) => res.arrayBuffer());
    const logoImage = await pdfDoc.embedPng(logoImageBytes);
    page.drawText('GIC SERVIÇOS LTDA', {
      x: width / 3,
      y: height - 50,
      size: 22,
      color: rgb(0, 0, 0),
      lineHeight: 24,
    });
    page.drawImage(logoImage, {
      x: 80,
      y: 90,
      width: imageLogoWidth,
      height: imageLogoHeight,
    });
    page.drawRectangle({
      x: 0,
      y: height - 375,
      width,
      height: height / 6,
      color: rgb(216 / 255, 191 / 255, 216 / 255),
    });
    page.drawText(textPage1, {
      x:
        textPage1?.length <= 20
          ? width / 3
          : textPage1?.length < 40
            ? width / 5
            : width / 8,
      y: height - 350,
      size: 18,
      color: rgb(1, 1, 1),
      lineHeight: 24,
    });
    page.drawText(
      `${formatDate(serviceData?.[serviceData.length - 1]?.created_at)}`,
      {
        x: width / 2 + 180,
        y: 10,
        size: 12,
        color: rgb(0, 0, 0),
      },
    );

    const fetchImage = async (id: number) => {
      const response = await api.get(`/photos/${id}`, {
        withCredentials: true,
      });
      const photoData = response.data.photoFile.data;
      // Converte o array de números para Uint8Array
      const photoBytes = new Uint8Array(photoData);
      // Verifica o tipo de imagem
      const isPng =
        photoBytes[0] === 0x89 &&
        photoBytes[1] === 0x50 &&
        photoBytes[2] === 0x4e &&
        photoBytes[3] === 0x47;
      const photoImage = isPng
        ? await pdfDoc.embedPng(photoBytes)
        : await pdfDoc.embedJpg(photoBytes);
      return photoImage;
    };
    for (let i = 0; i < photoIds.length; i += 6) {
      page = pdfDoc.addPage([600, 400]);
      page.drawText(
        `GIC - SERVIÇOS LTDA - Fotoregistro - ${serviceData?.[0]?.sector?.name ?? ''}`,
        {
          x: 160,
          y: height - 30,
          size: 12,
          color: rgb(0, 0, 0),
        },
      );
      const imageHeight = 140;
      const imageWidth = 172;
      const padding = 20;
      const imagesPerRow = 3;
      const photosToShow = photoIds.slice(i, i + 6);
      for (let j = 0; j < photosToShow.length; j++) {
        try {
          // const photoBytes = await fetchImage(photosToShow[j]);
          const photoImage = await fetchImage(photosToShow[j]);
          const x = padding + (j % imagesPerRow) * (imageWidth + padding);
          const y =
            height -
            200 -
            Math.floor(j / imagesPerRow) * (imageHeight + padding);
          page.drawImage(photoImage, {
            x,
            y,
            width: imageWidth,
            height: imageHeight,
          });
        } catch (error) {
          console.error(
            `Erro ao carregar imagem ID: ${photosToShow[j]}`,
            error,
          );
        }
      }
      page.drawText('Registro de limpeza', {
        x: width / 2 - 60,
        y: 10,
        size: 12,
        color: rgb(0, 0, 0),
      });
    }
    page = pdfDoc.addPage([600, 400]);
    page.drawRectangle({
      x: 0,
      y: height - 310,
      width,
      height: height / 2,
      color: rgb(216 / 255, 191 / 255, 216 / 255),
    });
    page.drawText('COMPROVANTES/DOCUMENTOS GIC SERVIÇOS LTDA', {
      x: width / 8,
      y: height / 2 - 20,
      size: 18,
      color: rgb(1, 1, 1),
      lineHeight: 24,
    });
    return await pdfDoc.save();
  };

  // Effects
  useEffect(() => {
    if (fetchedUsers) setUsers(fetchedUsers.users);
  }, [fetchedUsers]);

  useEffect(() => {
    getUsers({});
    getContracts({});
    getSectors({});
  }, []);

  // useEffect(() => {
  const fetchData = async () => {
    setPdfUrl(null);
    try {
      await getServiceRegister({
        startDate: selectedDateRange.startDate
          ? timestampToISO(selectedDateRange.startDate)
          : null,
        endDate: selectedDateRange.endDate
          ? timestampToISO(selectedDateRange.endDate)
          : null,
        contractValue: contrato ? (contrato as number) : undefined,
        sectorValue: setor ? (setor as number) : undefined,
        userId: filterUserId ? (filterUserId as string) : '',
      });
    } catch (error) {
      console.error('Erro ao buscar registros de serviço:', error);
    }
  };

  // fetchData();

  // }, [selectedDateRange, filterUserId, setor, contrato]);

  useEffect(() => {
    const generatePreview = async () => {
      try {
        if (serviceData) {
          const photoIds: number[] = [];
          let currentSignatureId: number | null = null;
          let lastSignatureId: number | null = null;
          let isLastSignatureIdAdded = false;

          for (let i = 0; i < serviceData.length; i++) {
            const service = serviceData[i];

            if (service.photo_service_before_id) {
              photoIds.push(service.photo_service_before_id);
            }
            if (service.photo_service_after_id) {
              photoIds.push(service.photo_service_after_id);
            }

            // Atualiza o ID de assinatura atual
            if (service.photo_signature_id) {
              if (
                currentSignatureId === null ||
                service.photo_signature_id !== currentSignatureId
              ) {
                // Adiciona o último ID de assinatura se for necessário
                if (currentSignatureId !== null && !isLastSignatureIdAdded) {
                  photoIds.push(currentSignatureId);
                  isLastSignatureIdAdded = true; // Marca como adicionado
                }
                // Atualiza o ID de assinatura atual
                currentSignatureId = service.photo_signature_id;
                isLastSignatureIdAdded = false; // Reseta a flag para o novo ID
              }
            } else {
              // Se não há ID de assinatura, adiciona o último ID de assinatura se for necessário
              if (currentSignatureId !== null && !isLastSignatureIdAdded) {
                photoIds.push(currentSignatureId);
                isLastSignatureIdAdded = true; // Marca como adicionado
              }
              // Reseta o ID de assinatura atual
              currentSignatureId = null;
            }
          }

          // Adiciona o último ID de assinatura se necessário
          if (currentSignatureId !== null && !isLastSignatureIdAdded) {
            photoIds.push(currentSignatureId);
          }

          const pdfBytes = await generatePdfBytes(photoIds); // Chama a função com a lista de IDs
          const blob = new Blob([pdfBytes], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          setPdfUrl(url);
        }
      } catch (error) {
        console.error('Erro ao gerar o PDF:', error);
      }
    };

    generatePreview();

    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [serviceData]);

  const usersCustomSelect = users.map((user) => ({
    value: user.id,
    name: user.name,
  }));

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
    >
      <Grid
        container
        spacing={isMobile ? 1 : 2}
        alignItems="center"
        direction={isMobile ? 'column' : 'row'}
      >
        <Grid item xs={isMobile ? 12 : 3}>
          <FormControl fullWidth>
            <Select
              label="Usuário"
              options={usersCustomSelect}
              value={filterUserId}
              onChange={(e) => setFilterUserId(e.value as string)}
              clearable
            />
          </FormControl>
        </Grid>

        <Grid item xs={isMobile ? 12 : 2}>
          <Select
            options={contracts}
            value={contrato}
            onChange={(e) => handleChangeFilter('contrato', e.value)}
            label={basicNames.sector.singular}
            clearable
          />
        </Grid>

        <Grid item xs={isMobile ? 12 : 2}>
          <Select
            options={sectors}
            value={setor}
            onChange={(e) => handleChangeFilter('setor', e.value)}
            label={basicNames.section.singular}
            clearable
          />
        </Grid>

        <Grid item xs={isMobile ? 12 : 3}>
          <DateFilter
            ref={ref}
            initialRange={INIT_DATE_RANGE}
            onFilter={handleDateFilter}
          />
        </Grid>

        <Grid item xs={isMobile ? 12 : 2}>
          <Button fullWidth={isMobile} onClick={fetchData}>
            Carregar PDF
          </Button>
        </Grid>
      </Grid>

      {loading ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <CircularProgress color="success" />
        </Box>
      ) : pdfUrl ? (
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-around"
          width="100%"
          mt={4}
        >
          <iframe src={pdfUrl} title="PDF Preview" width="80%" height="560px" />
        </Box>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={1}
          height="200px"
        >
          <InfoOutlined color="warning" sx={{ height: 28, width: 28 }} />
          <Typography variant="body1" fontSize={17} color="warning.main">
            {'Sem dados para exibir'}
          </Typography>
        </Box>
      )}
    </Box>
  );

  // return (
  //   <Box
  //     display="flex"
  //     flexDirection="column"
  //     alignItems="center"
  //     justifyContent="center"
  //     width="100%"
  //   >
  //     <Grid container spacing={2} alignItems="center">
  //       <Grid item xs={3}>
  //         <FormControl fullWidth>
  //           <Select
  //             label="Usuário"
  //             options={usersCustomSelect}
  //             value={filterUserId}
  //             onChange={(e) => setFilterUserId(e.value as string)}
  //             clearable
  //           />
  //         </FormControl>
  //       </Grid>

  //       <Grid item xs={2}>
  //         <Select
  //           options={contracts}
  //           value={contrato}
  //           onChange={(e) => handleChangeFilter('contrato', e.value)}
  //           label={basicNames.sector.singular}
  //           clearable
  //         />
  //       </Grid>
  //       <Grid item xs={2}>
  //         <Select
  //           options={sectors}
  //           value={setor}
  //           onChange={(e) => handleChangeFilter('setor', e.value)}
  //           label={basicNames.section.singular}
  //           clearable
  //         />
  //       </Grid>
  //       <Grid item xs={3}>
  //         <DateFilter
  //           ref={ref}
  //           initialRange={INIT_DATE_RANGE}
  //           onFilter={handleDateFilter}
  //         />
  //       </Grid>

  //       <Grid item xs={2}>
  //         <Button onClick={fetchData}>Carregar PDF</Button>
  //       </Grid>
  //     </Grid>

  //     {loading ? (
  //       <Box
  //         display="flex"
  //         alignItems="center"
  //         justifyContent="center"
  //         height="100vh"
  //       >
  //         <CircularProgress color="success" />
  //       </Box>
  //     ) : pdfUrl ? (
  //       <Box
  //         display="flex"
  //         flexDirection="row"
  //         alignItems="center"
  //         justifyContent="space-around"
  //         width="100%"
  //         mt={4}
  //       >
  //         <iframe src={pdfUrl} title="PDF Preview" width="80%" height="560px" />
  //       </Box>
  //     ) : (
  //       <Box
  //         display="flex"
  //         alignItems="center"
  //         justifyContent="center"
  //         gap={1}
  //         height="200px"
  //       >
  //         <InfoOutlined color="warning" sx={{ height: 28, width: 28 }} />
  //         <Typography variant="body1" fontSize={17} color="warning.main">
  //           {'Sem dados para exibir'}
  //         </Typography>
  //       </Box>
  //     )}
  //   </Box>
  // );
};

export default PdfGenerator;
