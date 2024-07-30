import React, { useEffect, useState } from 'react';

import logo from '@assets/avatar1.jpg';
import { Box, CircularProgress } from '@mui/material';
import { api } from '@src/lib/axios';
import { useGetServiceRegister } from '@src/services/servicesRegisters/queries';
import { saveAs } from 'file-saver';
import { PDFDocument, rgb } from 'pdf-lib';

import * as S from './styles';

const generatePdfBytes = async (photoIds: number[]): Promise<Uint8Array> => {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([600, 400]); // A4 paisagem
  const { width, height } = page.getSize();

  const imageLogoWidth = width;
  const imageLogoHeight = height - 40;

  const logoImageBytes = await fetch(logo).then((res) => res.arrayBuffer());
  const logoImage = await pdfDoc.embedJpg(logoImageBytes);
  page.drawImage(logoImage, {
    x: 0,
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

  // const fetchImage = async (id: number) => {
  //   const response = await api.get(`/photos/serve/${id}`, {
  //     responseType: 'arraybuffer',
  //     withCredentials: true,
  //   });
  //   return response.data;
  // };

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
          height - 200 - Math.floor(j / imagesPerRow) * (imageHeight + padding);
        page.drawImage(photoImage, {
          x,
          y,
          width: imageWidth,
          height: imageHeight,
        });
      } catch (error) {
        console.error(`Erro ao carregar imagem ID: ${photosToShow[j]}`, error);
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

const PdfGenerator: React.FC = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const { data: serviceData, mutateAsync: getServiceRegister } =
    useGetServiceRegister(); // Obtendo dados de serviços

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
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [serviceData]);

  useEffect(() => {
    getServiceRegister({});
  }, []);

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

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
    >
      <h1>PDF - Registro de serviço</h1>
      {pdfUrl ? (
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-around"
          width="100%"
          mt={5}
        >
          <iframe
            src={pdfUrl}
            width="700"
            height="550"
            title="PDF Preview"
            style={{ border: 'none' }}
          />
          <S.ButtonClick onClick={handleDownload}>Baixar PDF</S.ButtonClick>
        </Box>
      ) : (
        <CircularProgress size={'medium'} color="success" />
      )}
    </Box>
  );
};

export default PdfGenerator;
