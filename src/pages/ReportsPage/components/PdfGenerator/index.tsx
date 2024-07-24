import React, { useState } from 'react';

import jsPDF from 'jspdf';

import PdfPreview from '@components/PdfPreview';

const PdfGenerator: React.FC = () => {
  const [pdfData, setPdfData] = useState<string>('');

  const generatePdf = () => {
    const doc = new jsPDF();

    doc.text('Cabeçalho', 10, 10);

    for (let i = 1; i <= 5; i++) {
      // Supondo que você tenha 5 páginas para simplificar
      if (i !== 1) doc.addPage();
      doc.text(`Conteúdo da página ${i}`, 10, 20);
      doc.text('Rodapé', 10, 280);
    }

    const pdfOutput = doc.output('datauristring');
    setPdfData(pdfOutput);
  };

  const downloadPdf = () => {
    const doc = new jsPDF();

    doc.text('Cabeçalho', 10, 10);

    for (let i = 1; i <= 5; i++) {
      // Supondo que você tenha 5 páginas para simplificar
      if (i !== 1) doc.addPage();
      doc.text(`Conteúdo da página ${i}`, 10, 20);
      doc.text('Rodapé', 10, 280);
    }

    doc.save('document.pdf');
  };

  return (
    <div>
      <button onClick={generatePdf}>Gerar PDF</button>
      <button onClick={downloadPdf}>Baixar PDF</button>
      {pdfData && <PdfPreview pdfData={pdfData} />}
    </div>
  );
};

export default PdfGenerator;
