import React from 'react';

import { Document, Page, pdfjs } from 'react-pdf';
import { OnDocumentLoadSuccess } from 'react-pdf/dist/cjs/shared/types';

// import { OnDocumentLoadSuccess } from 'react-pdf/dist/esm/shared/types';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PdfPreviewProps {
  pdfData: string;
}

const PdfPreview: React.FC<PdfPreviewProps> = ({ pdfData }) => {
  const [numPages, setNumPages] = React.useState<number | null>(null);

  const onDocumentLoadSuccess: OnDocumentLoadSuccess = (event) => {
    setNumPages(event.numPages);
  };

  return (
    <div>
      <Document file={pdfData} onLoadSuccess={onDocumentLoadSuccess}>
        {numPages &&
          Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
      </Document>
    </div>
  );
};

export default PdfPreview;
