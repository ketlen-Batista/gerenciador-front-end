import React from 'react';

import MUICircularProgress from '@mui/material/CircularProgress';

import * as S from './styles';

interface Props {
  className?: string;
  color?: 'primary' | 'secondary' | 'inherit';
  dataTestId?: string;
  size?: 'small' | 'medium' | 'large';
}

function CircularProgress({
  className,
  color = 'inherit',
  dataTestId,
  size = 'medium',
  ...props
}: Props) {
  const getSize = () => {
    if (size === 'large') return '3rem';
    if (size === 'medium') return '1.75rem';
    return '1.5rem';
  };

  return (
    <S.Container
      {...(className && { className })}
      {...(dataTestId && { 'data-testid': `${dataTestId}` })}
      {...props}
    >
      <MUICircularProgress color={color} size={getSize()} />
    </S.Container>
  );
}

export default CircularProgress;
