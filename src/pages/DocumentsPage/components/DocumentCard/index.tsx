import React from 'react';

import { Card, CardContent, IconButton, Typography } from '@material-ui/core';
import { DeleteOutlined, VisibilityOutlined } from '@material-ui/icons';
import { formatDate } from '@src/utils/dates';

function DocumentCard({ document, onView, onDelete }) {
  return (
    <Card variant="outlined" style={{ marginBottom: '1rem' }}>
      <CardContent>
        <Typography variant="h6">{document.documentName}</Typography>
        <Typography color="textSecondary">
          Enviado em: {formatDate(document.sentIn)}
        </Typography>
        <Typography color="textSecondary">
          Remetente: {document.sender}
        </Typography>
        <Typography color="textSecondary">
          Destinatário: {document.recipient}
        </Typography>
        <Typography color="textSecondary">
          Recebido: {document.received ? 'Sim' : 'Não'}
        </Typography>
        <Typography color="textSecondary">
          Visto: {document.visa ? 'Sim' : 'Não'}
        </Typography>
        <div
          style={{
            marginTop: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <IconButton onClick={() => onView(document.id)}>
            <VisibilityOutlined color="primary" />
          </IconButton>
          <IconButton onClick={() => onDelete(document.id)}>
            <DeleteOutlined color="secondary" />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
}

export default DocumentCard;
