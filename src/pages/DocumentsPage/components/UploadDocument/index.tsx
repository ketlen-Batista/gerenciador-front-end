import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteIcon from '@material-ui/icons/Delete';
import { Box } from '@mui/material';
import { useListTypesDocuments } from '@src/services/typesDocuments/queries';
import { colors } from '@src/styles/colors';
import { useDropzone } from 'react-dropzone';

import Select from '@src/components/Select';
import TableDataGrid from '@src/components/TableDataGrid';
import TextField from '@src/components/TextField';
import TextInput from '@src/components/TextInput';

const useStyles = makeStyles((theme) => ({
  dropzone: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    border: `2px dashed #00B4AA`,
    borderRadius: '5px',
    padding: '30px 0px',
    cursor: 'pointer',
    width: '100%',
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
  typeDocument: string | number;
  setTypeDocument: React.Dispatch<React.SetStateAction<string | number>>;
}

const UploadDocument = ({
  documentName,
  handleDocumentNameChange,
  handleFileChange,
  typeDocument,
  setTypeDocument,
}: UploadDocumentProps) => {
  const classes = useStyles();
  const [files, setFiles] = useState([]);

  const { data: listTypesDocuments, mutateAsync: getTypesDocuments } =
    useListTypesDocuments();

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

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    maxFiles: 1,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        ['.docx'],
    },
    multiple: false,
  });

  const handleDelete = (id: number) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
    handleDocumentNameChange('');
  };

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
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    getTypesDocuments({});
  }, []);

  return (
    <Box
      display="flex"
      height="400px"
      bgcolor={colors.basic.white}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      py={3}
      px={5}
      width="100%"
    >
      <Box fontSize="18px" fontWeight={500}>
        Faça upload do arquivo desejado:
      </Box>

      <TextInput
        type="text"
        placeholder="Nome do Documento"
        value={documentName}
        onChange={(event) => handleDocumentNameChange(event.target.value)}
      />

      <Select
        options={listTypesDocuments}
        value={typeDocument}
        name={
          listTypesDocuments?.find((item) => item.value === typeDocument)?.name
        }
        onChange={(e) => setTypeDocument(e.value)}
        label="Tipo de Documento"
        clearable
      />

      {/* <Box fontSize="80px">
        <DriveFolderUploadIcon color="primary" fontSize="inherit" />
      </Box> */}

      {files?.length === 0 ? (
        <div {...getRootProps({ className: classes.dropzone })}>
          <input
            {...getInputProps()}
            type="file"
            required
            accept="application/pdf"
          />
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
          />
        </Box>
      )}
    </Box>
  );
};

export default UploadDocument;
