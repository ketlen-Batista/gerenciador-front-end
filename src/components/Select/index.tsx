import React, { useEffect, useState } from 'react';

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
  heightSelect?: number | string;
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
  heightSelect,
  ...props
}: Props) {
  const [shrink, setShrink] = useState(false);

  useEffect(() => {
    if (value) {
      setShrink(true);
    }
  }, [value]);

  const customId = `select-${label}-${Math.random()}`;
  const emptyOptions = !options?.length;

  const handleOnChange = (event: SelectChangeEvent<SelectValue>) => {
    const typed = event.target.value as string;
    const formatted = typed?.length
      ? JSON.parse(typed)
      : { name: '', value: '' };
    onChange(formatted);
  };

  // const handleRenderValue = (selected: SelectValue) => {
  //   const initReturn = placeholder ?? '-';
  //   if (!selected) return initReturn;

  //   const typed = selected as string;
  //   const optionIndex = options.findIndex(({ value }) => value === typed);

  //   if (optionIndex < 0) return initReturn;
  //   return options[optionIndex].name;
  // };

  const handleRenderValue = (selected: SelectValue) => {
    const initReturn = placeholder ?? '-';
    if (!selected) return initReturn;

    const typed = selected as string;

    // Verifica se 'options' está definido e se é um array
    if (!options || !options.length) return initReturn;

    const optionIndex = options?.findIndex(({ value }) => value === typed);

    if (optionIndex < 0) return initReturn;
    return options[optionIndex].name;
  };

  return (
    <S.FormControl className="custom-select" variant="outlined" fullWidth>
      {label && (
        <InputLabel id={`${customId}-label`} shrink={shrink}>
          {label}
        </InputLabel>
      )}
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
        style={{ height: `${heightSelect ?? '45px'}`, padding: '0 8px' }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 48 * 4.5,
              width: 250,
              // marginLeft: '15px',
            },
          },
        }}
        {...props}
      >
        {clearable && !emptyOptions && value && (
          <MenuItem
            value=""
            className="select-button-item"
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '10px',
            }}
          >
            <Button
              variant="outlined"
              startIcon={<DeleteOutline className="select-button-icon" />}
            >
              {clearableLabel}
            </Button>
          </MenuItem>
        )}
        {!!emptyOptions && (
          <MenuItem
            disabled
            value=""
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {emptyLabel}
          </MenuItem>
        )}
        {!emptyOptions &&
          options.map((option, index) => (
            <MenuItem
              key={`${label}-option-${index}`}
              value={JSON.stringify(option)}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                paddingLeft: '15px',
              }}
            >
              {option.name}
            </MenuItem>
          ))}
      </S.Select>
    </S.FormControl>
  );
}

export default Select;
