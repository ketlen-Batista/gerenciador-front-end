import React from 'react';

import { FormControl, InputLabel } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import * as S from './styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    inputLabel: {
      // Adicione estilos conforme necessário
    },
    // selectEmpty: {
    //   marginTop: theme.spacing(2),
    // },
    // '&:focus': {
    //   borderRadius: 4,
    //   borderColor: '#80bdff',
    //   boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    // },
  }),
);

const SelectCustom = ({ options, defautSelected, label }) => {
  const classes = useStyles();

  const [value, setValue] = React.useState(defautSelected || '');
  const [open, setOpen] = React.useState(false);
  const [labelWidth, setLabelWidth] = React.useState(0);

  const inputLabel = React.useRef(null);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  console.log({ value });

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel ref={inputLabel} className={classes.inputLabel}>
        {label}
      </InputLabel>
      <S.CustomSelect
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={value ?? ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        labelWidth={labelWidth}
        // native
        label={label}
        // MenuProps={{
        //   PaperProps: {
        //     style: {
        //       maxHeight: 300,
        //     },
        //   },
        // }}
        // inputProps={{
        //   name: { label },
        //   id: 'outlined-age-native-simple',
        // }}
      >
        {options?.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option?.name}
          </MenuItem>
        ))}
      </S.CustomSelect>
    </FormControl>
  );
};

export default SelectCustom;
