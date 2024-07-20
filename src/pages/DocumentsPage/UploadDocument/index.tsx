import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FileDownloadIcon from '@material-ui/icons/CloudDownload';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { Box, Grid } from '@mui/material';
import { colors } from '@src/styles/colors';
import { useDropzone } from 'react-dropzone';

import TableDataGrid from '@src/components/TableDataGrid';
import TextField from '@src/components/TextField';

const useStyles = makeStyles((theme) => ({
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

interface UploadDocumentProps {
  documentName: string;
  handleDocumentNameChange: (text: string) => void;
  handleFileChange: (files: File[]) => void;
}

const UploadDocument = ({
  documentName,
  handleDocumentNameChange,
  handleFileChange,
}: UploadDocumentProps) => {
  const classes = useStyles();
  const [files, setFiles] = useState([]);

  const handleDrop = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: Date.now(),
      name: documentName?.length ? documentName : file.name,
      date: new Date().toLocaleDateString(),
      file,
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    handleFileChange(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });

  const handleDelete = (id: number) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
    handleDocumentNameChange('');
  };

  //   useEffect(() => {
  // if(files?.file) {

  // }
  //   },[files])

  const columns = [
    { field: 'date', headerName: 'Data de upload', flex: 1 },
    { field: 'name', headerName: 'Nome', flex: 2, editable: true },
    {
      field: 'actions',
      headerName: 'Ações',
      flex: 1,
      // eslint-disable-next-line react/display-name
      renderCell: (params) => (
        <Box>
          {/* <IconButton onClick={() => handleView(params.row.file)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={() => handleDownload(params.row.file)}>
            <FileDownloadIcon />
          </IconButton> */}
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  // console.log({ files });

  return (
    <Box
      display="flex"
      height="400px"
      bgcolor={colors.basic.white}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      my={2}
      mx={2}
      width="600px"
    >
      <Box fontSize="18px" fontWeight={500}>
        Faça upload do arquivo desejado:
      </Box>

      <TextField
        type="text"
        placeholder="Nome do Documento"
        value={documentName}
        onChange={(event) => handleDocumentNameChange(event.target.value)}
      />

      {/* <Select
                options={jobs}
                value={cargo}
                name={jobs?.find((item) => item.value === cargo)?.name}
                onChange={(e) => setDocumentType(e.value)}
                label="Tipo de Documento"
                clearable
              /> */}

      {/* <Box fontSize="80px">
        <DriveFolderUploadIcon color="primary" fontSize="inherit" />
      </Box> */}

      {files.length === 0 ? (
        <div {...getRootProps({ className: classes.dropzone })}>
          <input {...getInputProps()} type="file" accept="application/pdf" />
          <CloudUploadIcon className={classes.dropzoneIcon} />
          <Typography variant="h6" color="textSecondary">
            Clique ou arraste o arquivo até aqui
          </Typography>
        </div>
      ) : (
        <Box width="100%">
          <TableDataGrid
            className={classes.dataGrid}
            rows={files}
            columns={columns}
            pageSize={5}
            editMode="cell"
            onCellEditStart={(params) => {
              handleDocumentNameChange(params.row.name);
            }}
            isCellEditable={(params) => params.field === 'name'}
            // rowsPerPageOptions={[5]}
          />
        </Box>
      )}
      {/* <TextField type="file" onChange={handleFileChange} /> */}
    </Box>
  );
};

export default UploadDocument;
