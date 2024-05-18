import React, { ReactNode } from 'react';

// import { ButtonProps, TooltipProps } from '@mui/material';
import {
  ButtonProps,
  CircularProgress,
  Tooltip,
  TooltipProps,
} from '@material-ui/core';

import * as S from './styles';

export interface Props extends ButtonProps {
  children: ReactNode;
  customType?: 'default' | 'icon';
  dataTestId?: string;
  isLoading?: boolean;
  rounded?: boolean;
  tooltipProps?: Omit<TooltipProps, 'children'>;
  color?: 'default' | 'inherit' | 'primary' | 'secondary';
}

function Button({
  children,
  className,
  color = 'primary',
  customType = 'default',
  dataTestId,
  isLoading = false,
  rounded = false,
  size = 'large',
  tooltipProps,
  variant = 'contained',
  ...props
}: Props) {
  const buttonDefaultClasses = `
    ${customType}
    ${rounded ? 'rounded' : ''}
    ${isLoading ? 'loading' : ''}
    ${className ?? ''}
  `.trim();

  const getButtonComponent = () => {
    return (
      <S.Button
        size={size}
        color={'primary'}
        variant={variant}
        className={buttonDefaultClasses}
        {...(dataTestId && { 'data-testid': `${dataTestId}` })}
        {...props}
        {...(isLoading && {
          disabled: true,
          onClick: () => {},
        })}
      >
        {isLoading && <CircularProgress color="inherit" />}
        {!isLoading && children}
      </S.Button>
    );
  };

  if (tooltipProps) {
    return (
      <Tooltip {...tooltipProps}>
        {/* This span tag prevents the browser from warnings/errors about the tooltip being around a possibly disabled tag, which would be the case with the IconButton */}
        <span>{getButtonComponent()}</span>
      </Tooltip>
    );
  }

  return getButtonComponent();
}

export default Button;
