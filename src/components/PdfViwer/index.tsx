import React, { useState, useEffect } from 'react';

const PdfViewer: React.FC = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    // URL de exemplo para um PDF público
    const url =
      'https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf';
    setPdfUrl(url);
  }, []);

  if (!pdfUrl) {
    return <div>Carregando PDF...</div>;
  }

  return <iframe src={pdfUrl} width="100%" height="750px" title="pdf" />;
};

export default PdfViewer;
