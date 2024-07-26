// import React from 'react';
// import logo from '@assets/avatar1.jpg';
// import { saveAs } from 'file-saver';
// import { PDFDocument, rgb } from 'pdf-lib';
// // Imagem importada da pasta assets
// const generateAndDownloadPdf = async () => {
//   try {
//     // Cria um novo documento PDF
//     const pdfDoc = await PDFDocument.create();
//     // Adiciona a primeira página
//     let page = pdfDoc.addPage([600, 400]); // A4 paisagem
//     const { width, height } = page.getSize();
//     const imageLogoWidth = width; // Ajuste a largura da imagem para a largura da página
//     const imageLogoHeight = height - 40; // Ajuste a altura para deixar espaço para o rodapé
//     // Adiciona a imagem da logo
//     const logoImageBytes = await fetch(logo).then((res) => res.arrayBuffer());
//     const logoImage = await pdfDoc.embedJpg(logoImageBytes); // Usar embedJpg para imagens JPG
//     page.drawImage(logoImage, {
//       x: 0,
//       y: 40, // Deixa um espaço no topo para o rodapé
//       width: imageLogoWidth,
//       height: imageLogoHeight,
//     });
//     // Adiciona o rodapé
//     page.drawText('Janeiro de 2024', {
//       x: width / 2 - 60,
//       y: 10,
//       size: 12,
//       color: rgb(0, 0, 0),
//     });
//     // Simula um array com 50 imagens da logo
//     const logoImages = new Array(50).fill(logoImage);
//     // Adiciona páginas subsequentes com as imagens da logo
//     for (let i = 0; i < 10; i++) {
//       // Substitua 10 pelo número de páginas desejadas
//       page = pdfDoc.addPage([600, 400]); // A4 paisagem
//       // Cabeçalho
//       page.drawText('Nome da empresa - fotoregistro - nome do setor', {
//         x: 20,
//         y: height - 30, // Ajusta a posição do cabeçalho para não sobrepor as imagens
//         size: 12,
//         color: rgb(0, 0, 0),
//       });
//       // Corpo com 6 imagens da logo
//       const imageHeight = 140;
//       const imageWidth = 172;
//       const padding = 20;
//       const imagesPerRow = 3;
//       for (let j = 0; j < 6; j++) {
//         const logoImageToDraw = logoImages[j % logoImages.length]; // Seleciona uma imagem da logo
//         const x = padding + (j % imagesPerRow) * (imageWidth + padding);
//         const y =
//           height - 200 - Math.floor(j / imagesPerRow) * (imageHeight + padding); // Ajusta a posição para caber abaixo do cabeçalho
//         page.drawImage(logoImageToDraw, {
//           x,
//           y,
//           width: imageWidth,
//           height: imageHeight,
//         });
//       }
//       // Rodapé
//       page.drawText('Registro de limpeza', {
//         x: width / 2 - 60,
//         y: 10,
//         size: 12,
//         color: rgb(0, 0, 0),
//       });
//     }
//     const widthEndPage = width - 10;
//     // Adiciona a última página
//     page = pdfDoc.addPage([600, 400]); // A4 paisagem
//     page.drawRectangle({
//       x: 0,
//       y: height - 310,
//       width,
//       height: height / 2,
//       color: rgb(0.5, 0, 0.5), // Fundo roxo
//     });
//     page.drawText('COMPROVANTES/DOCUMENTOS GIC SERVIÇOS LTDA', {
//       x: width / 8,
//       y: height / 2 - 20,
//       size: 18, // Reduz o tamanho da fonte para se ajustar à página
//       color: rgb(1, 1, 1),
//       lineHeight: 24,
//     });
//     // Serializa o PDF
//     const pdfBytes = await pdfDoc.save();
//     // Cria um blob para o PDF
//     const blob = new Blob([pdfBytes], { type: 'application/pdf' });
//     // Usa a biblioteca file-saver para salvar o arquivo
//     saveAs(blob, 'documento.pdf');
//   } catch (error) {
//     console.error('Erro ao gerar o PDF:', error);
//   }
// };
// const DownloadButton = () => (
//   <button onClick={generateAndDownloadPdf}>Baixar PDF</button>
// );
// const PdfGenerator: React.FC = () => (
//   <div>
//     <h1>Gerar e Baixar PDF</h1>
//     <DownloadButton />
//   </div>
// );
// export default PdfGenerator;
///////////////////////////////////////////////////
import React, { useEffect, useState } from 'react';

import logo from '@assets/avatar1.jpg';
import { Box } from '@mui/material';
import { colors } from '@src/styles/colors';
import { saveAs } from 'file-saver';
import { PDFDocument, rgb } from 'pdf-lib';

import Button from '@src/components/Button';

import * as S from './styles';

// Imagem importada da pasta assets

const generatePdf = async () => {
  // Cria um novo documento PDF
  const pdfDoc = await PDFDocument.create();

  // Adiciona a primeira página
  let page = pdfDoc.addPage([600, 400]); // A4 paisagem
  const { width, height } = page.getSize();

  const imageLogoWidth = width; // Ajuste a largura da imagem para a largura da página
  const imageLogoHeight = height - 40; // Ajuste a altura para deixar espaço para o rodapé

  // Adiciona a imagem da logo
  const logoImageBytes = await fetch(logo).then((res) => res.arrayBuffer());
  const logoImage = await pdfDoc.embedJpg(logoImageBytes); // Usar embedJpg para imagens JPG
  page.drawImage(logoImage, {
    x: 0,
    y: 40, // Deixa um espaço no topo para o rodapé
    width: imageLogoWidth,
    height: imageLogoHeight,
  });

  // Adiciona o rodapé
  page.drawText('Janeiro de 2024', {
    x: width / 2 - 60,
    y: 10,
    size: 12,
    color: rgb(0, 0, 0),
  });

  // Simula um array com 50 imagens da logo
  const logoImages = new Array(50).fill(logoImage);

  // Adiciona páginas subsequentes com as imagens da logo
  for (let i = 0; i < 10; i++) {
    // Substitua 10 pelo número de páginas desejadas
    page = pdfDoc.addPage([600, 400]); // A4 paisagem

    // Cabeçalho
    page.drawText('Nome da empresa - fotoregistro - nome do setor', {
      x: 20,
      y: height - 30, // Ajusta a posição do cabeçalho para não sobrepor as imagens
      size: 12,
      color: rgb(0, 0, 0),
    });

    // Corpo com 6 imagens da logo
    const imageHeight = 140;
    const imageWidth = 172;
    const padding = 20;
    const imagesPerRow = 3;

    for (let j = 0; j < 6; j++) {
      const logoImageToDraw = logoImages[j % logoImages.length]; // Seleciona uma imagem da logo
      const x = padding + (j % imagesPerRow) * (imageWidth + padding);
      const y =
        height - 200 - Math.floor(j / imagesPerRow) * (imageHeight + padding); // Ajusta a posição para caber abaixo do cabeçalho
      page.drawImage(logoImageToDraw, {
        x,
        y,
        width: imageWidth,
        height: imageHeight,
      });
    }

    // Rodapé
    page.drawText('Registro de limpeza', {
      x: width / 2 - 60,
      y: 10,
      size: 12,
      color: rgb(0, 0, 0),
    });
  }

  const widthEndPage = width - 10;

  // Adiciona a última página
  page = pdfDoc.addPage([600, 400]); // A4 paisagem
  page.drawRectangle({
    x: 0,
    y: height - 310,
    width,
    height: height / 2,
    color: rgb(0.5, 0, 0.5), // Fundo roxo
  });
  page.drawText('COMPROVANTES/DOCUMENTOS GIC SERVIÇOS LTDA', {
    x: width / 8,
    y: height / 2 - 20,
    size: 18, // Reduz o tamanho da fonte para se ajustar à página
    color: rgb(1, 1, 1),
    lineHeight: 24,
  });

  // Serializa o PDF
  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
};

const PdfGenerator: React.FC = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const generatePreview = async () => {
      try {
        const pdfBytes = await generatePdf();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      } catch (error) {
        console.error('Erro ao gerar o PDF:', error);
      }
    };

    generatePreview();

    // Limpa o URL do PDF quando o componente for desmontado
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, []);

  const handleDownload = async () => {
    try {
      const pdfBytes = await generatePdf();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      saveAs(blob, 'documento.pdf');
    } catch (error) {
      console.error('Erro ao gerar o PDF:', error);
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
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-around"
        width="100%"
        mt={5}
      >
        {pdfUrl && (
          <iframe
            src={pdfUrl}
            width="700"
            height="550"
            title="PDF Preview"
            style={{ border: 'none' }}
          />
        )}

        <S.ButtonClick onClick={handleDownload}>Baixar PDF</S.ButtonClick>
      </Box>
    </Box>
  );
};

export default PdfGenerator;
