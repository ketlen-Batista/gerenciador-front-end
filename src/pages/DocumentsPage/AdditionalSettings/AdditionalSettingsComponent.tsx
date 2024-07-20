import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FileDownloadIcon from '@material-ui/icons/CloudDownload';
import DeleteIcon from '@material-ui/icons/Delete';
import { Box, Typography } from '@material-ui/core';

import * as S from './styles';

const useStyles = makeStyles(theme => ({
  dropzone: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    border: `2px dashed #00B4AA`,
    borderRadius: '5px',
    padding: '30px',
    cursor: 'pointer',
    width: 'auto',
  },
  dropzoneIcon: {
    fontSize: '48px',
    color: '#00B4AA',
    marginRight: '10px',
  },
  dataGrid: {
    marginTop: theme.spacing(2),
    height: 400,
  },
}));

interface FileData {
  id: number;
  name: string;
  date: string;
  file: File;
}

const AdditionalSettingsComponents = () => {
  const classes = useStyles();
  const [files, setFiles] = useState<FileData[]>([]);

  const handleDrop = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      id: Date.now(),
      name: file.name,
      date: new Date().toLocaleDateString(),
      file,
    }));
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });

  const handleView = (file: File) => {
    const url = URL.createObjectURL(file);
    window.open(url);
  };

  const handleDownload = (file: File) => {
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', file.name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = (id: number) => {
    setFiles(prevFiles => prevFiles.filter(file => file.id !== id));
  };

  const columns: GridColDef[] = [
    { field: 'date', headerName: 'Data de upload', width: 200 },
    { field: 'name', headerName: 'Nome', width: 300 },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 150,
      // eslint-disable-next-line react/display-name
      renderCell: params => (
        <Box>
          <IconButton onClick={() => handleView(params.row.file)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={() => handleDownload(params.row.file)}>
            <FileDownloadIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box my={2} mx={5}>
      <S.Title>Configurações adicionais</S.Title>
      <S.ContainerUpload>
        <S.Subtitle>Upload de regulamento</S.Subtitle>
        <S.Text>Adicione o PDF do regulamento do evento aqui</S.Text>
        {files.length === 0 ? (
          <div {...getRootProps({ className: classes.dropzone })}>
            <input {...getInputProps()} type="file" accept="application/pdf" />
            <CloudUploadIcon className={classes.dropzoneIcon} />
            <Typography variant="h6" color="textSecondary">
              Clique ou arraste o arquivo até aqui
            </Typography>
          </div>
        ) : (
          <DataGrid
            className={classes.dataGrid}
            rows={files}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        )}
      </S.ContainerUpload>
    </Box>
  );
};

export default AdditionalSettingsComponents;
