import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import * as S from './styles';

const SelectCustom = ({ options, defautSelected }) => {
  const [value, setValue] = React.useState(defautSelected);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <S.CustomSelect
      open={open}
      onClose={handleClose}
      onOpen={handleOpen}
      value={value}
      onChange={handleChange}
      variant="outlined"
      fullWidth
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.name}
        </MenuItem>
      ))}
    </S.CustomSelect>
  );
};

export default SelectCustom;
