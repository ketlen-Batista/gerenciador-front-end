import React, { useEffect, useRef, useState } from 'react';

import logo from '@assets/imagem1pdfgic.png';
import { InfoOutlined } from '@mui/icons-material';
import { Box, CircularProgress, FormControl, Grid } from '@mui/material';
import { api } from '@src/lib/axios';
import { useGetServiceRegister } from '@src/services/servicesRegisters/queries';
import { useGetUsers } from '@src/services/users/queries';
import { INIT_DATE_RANGE, timestampToISO } from '@src/utils/dates';
import { saveAs } from 'file-saver';
import { PDFDocument, rgb } from 'pdf-lib';
import { useLocation } from 'react-router-dom';

import DateFilter from '@src/components/DateFilter';
import Select from '@src/components/Select';
import Typography from '@src/components/Typography';

import * as S from './styles';

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

  const {
    data: serviceData,
    mutateAsync: getServiceRegister,
    isPending: loading,
  } = useGetServiceRegister();
  const { data: fetchedUsers, mutate: getUsers } = useGetUsers();
  const ref = useRef(null);

  // Helpers
  const handleDateFilter = (dateRange: {
    startDate: number | null;
    endDate: number | null;
  }) => {
    setSelectedDateRange(dateRange);
  };

  const generatePdfBytes = async (photoIds: number[]): Promise<Uint8Array> => {
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage([600, 400]); // A4 paisagem
    const { width, height } = page.getSize();
    const imageLogoWidth = width - 140;
    const imageLogoHeight = height - 60;
    const logoImageBytes = await fetch(logo).then((res) => res.arrayBuffer());
    const logoImage = await pdfDoc.embedPng(logoImageBytes);
    page.drawImage(logoImage, {
      x: 80,
      y: 40,
      width: imageLogoWidth,
      height: imageLogoHeight,
    });
    page.drawText('Janeiro de 2024', {
      x: width / 2 - 60,
      y: 10,
      size: 12,
      color: rgb(0, 0, 0),
    });

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
      page.drawText('Nome da empresa - fotoregistro - nome do setor', {
        x: 20,
        y: height - 30,
        size: 12,
        color: rgb(0, 0, 0),
      });
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
      color: rgb(0.5, 0, 0.5),
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
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getServiceRegister({
          startDate: selectedDateRange.startDate
            ? timestampToISO(selectedDateRange.startDate)
            : null,
          endDate: selectedDateRange.endDate
            ? timestampToISO(selectedDateRange.endDate)
            : null,
          userId: filterUserId ? (filterUserId as string) : '',
        });
      } catch (error) {
        console.error('Erro ao buscar registros de serviço:', error);
      }
    };

    if (filterUserId) {
      fetchData();
    }
  }, [selectedDateRange, filterUserId]);

  useEffect(() => {
    const generatePreview = async () => {
      try {
        if (serviceData) {
          const photoIds = serviceData.reduce((acc: number[], service: any) => {
            if (service.photo_service_before_id)
              acc.push(service.photo_service_before_id);
            if (service.photo_service_after_id)
              acc.push(service.photo_service_after_id);
            return acc;
          }, []);

          const pdfBytes = await generatePdfBytes(photoIds);
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

  // Handlers
  const handleDownload = async () => {
    try {
      if (serviceData) {
        const photoIds = serviceData.reduce((acc: number[], service: any) => {
          if (service.photo_service_before_id)
            acc.push(service.photo_service_before_id);
          if (service.photo_service_after_id)
            acc.push(service.photo_service_after_id);
          return acc;
        }, []);

        const pdfBytes = await generatePdfBytes(photoIds);
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        saveAs(blob, 'documento.pdf');
      }
    } catch (error) {
      console.error('Erro ao baixar o PDF:', error);
    }
  };

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
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4}>
          <FormControl fullWidth>
            <Select
              label="Usuário"
              options={usersCustomSelect}
              value={filterUserId}
              onChange={(e) => setFilterUserId(e.value)}
              clearable
            />
          </FormControl>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <DateFilter
            ref={ref}
            initialRange={INIT_DATE_RANGE}
            onFilter={handleDateFilter}
          />
        </Grid>
      </Grid>

      {loading ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="400px"
        >
          <CircularProgress />
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
          <iframe src={pdfUrl} title="PDF Preview" width="60%" height="560px" />
          <S.ButtonClick onClick={handleDownload}>Baixar PDF</S.ButtonClick>
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
            {!filterUserId
              ? 'É necessário selecionar um usuário'
              : 'Sem dados para exibir'}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PdfGenerator;
