import React from 'react';

import { Button } from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';
import {
  InputLabel,
  MenuItem,
  type SelectChangeEvent,
  type SelectProps,
} from '@mui/material';

import { SelectOption, SelectValue } from './interfaces';

import * as S from './styles';

type CustomSelectProps = Omit<
  SelectProps<SelectValue>,
  'onChange' | 'value' | 'variant'
>;

interface Props extends CustomSelectProps {
  clearable?: boolean;
  clearableLabel?: string;
  emptyLabel?: string;
  label?: string;
  onChange: (selected: SelectOption) => void;
  options: SelectOption[];
  value: SelectValue;
  name?: string;
  placeholder?: string;
  heigthSelect?: number | string;
}

function Select({
  clearable = false,
  clearableLabel = 'Limpar',
  emptyLabel = 'Sem opções',
  label,
  onChange,
  options,
  placeholder,
  value,
  name,
  heigthSelect,
  ...props
}: Props) {
  const customId = `select-${label}-${Math.random()}`;
  const emptyOptions = !options?.length;

  const handleOnChange = (event) => {
    const typed = event.target?.value as string;

    const formatted = typed?.length
      ? JSON.parse(typed)
      : { name: '', value: '' };

    return onChange(formatted);
  };

  const handleRenderValue = (selected) => {
    const initReturn = placeholder ?? '-';

    if (!selected) return initReturn;

    const typed = selected as string;
    const optionIndex = options.findIndex(({ value }) => value === typed);

    if (optionIndex < 0) return initReturn;
    return options[optionIndex].name;
  };

  return (
    <S.FormControl className="custom-select">
      {label && <InputLabel id={`${customId}-label`}>{label}</InputLabel>}
      <S.Select
        displayEmpty={!!placeholder}
        id={customId}
        label={label}
        labelId={`${customId}-label`}
        multiline={false}
        multiple={false}
        onChange={handleOnChange}
        renderValue={handleRenderValue}
        value={value}
        name={name}
        variant="outlined"
        style={{ height: `${heigthSelect ?? '45px'}` }}
        {...props}
      >
        {clearable && !emptyOptions && value && (
          <MenuItem value="" className="select-button-item">
            <Button
              variant="outlined"
              startIcon={<DeleteOutline className="select-button-icon" />}
            >
              {clearableLabel}
            </Button>
          </MenuItem>
        )}
        {!!emptyOptions && (
          <MenuItem disabled value="">
            {emptyLabel}
          </MenuItem>
        )}
        {!emptyOptions &&
          options.map((option, index) => (
            <MenuItem
              key={`${label}-option-${index}`}
              value={JSON.stringify(option)}
            >
              {option.name}
            </MenuItem>
          ))}
      </S.Select>
    </S.FormControl>
  );
}

export default Select;
