import React from 'react';

import { RadioProps } from '@mui/material/Radio';

import * as S from './styles';

interface Props extends RadioProps {
  dataTestId?: string;
}

function RadioButton({ dataTestId, ...props }: Props) {
  return (
    <S.RadioButton
      {...(dataTestId && { 'data-testid': `${dataTestId}` })}
      {...props}
    />
  );
}

export default RadioButton;
