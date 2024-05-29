import React from 'react';

import MUICheckbox, { CheckboxProps } from '@mui/material/Checkbox';

import * as S from './styles';

interface Props extends CheckboxProps {
  label?: string;
  dataTestId?: string;
  position?: 'left' | 'right';
}

function Checkbox({
  label = '',
  position = 'left',
  dataTestId,
  ...props
}: Props) {
  return (
    <S.Container
      label={label}
      className={position}
      control={
        <MUICheckbox
          {...(dataTestId && { 'data-testid': `${dataTestId}` })}
          {...props}
        />
      }
    />
  );
}

export default Checkbox;
