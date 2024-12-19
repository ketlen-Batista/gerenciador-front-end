import React, { ReactNode } from 'react';

// import { ButtonProps, TooltipProps } from '@mui/material';
import {
  Button,
  ButtonProps,
  CircularProgress,
  Tooltip,
  TooltipProps,
} from '@material-ui/core';
import { Box } from '@mui/material';
import { colors } from '@src/styles/colors';

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  customType?: 'default' | 'icon';
  isLoading?: boolean;
  rounded?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'contained' | 'outlined' | 'text';
  tooltipProps?: Omit<TooltipProps, 'children'>;
  color?: string;
  bgColor?: string;
  p?: string;
  fontWeight?: string;
  onClick?: () => void;
}

function ButtonCustom({
  children,
  color = `${colors.basic.white}`,
  bgColor = `${colors.primary.main}`,
  customType = 'default',
  isLoading = false,
  rounded = false,
  size = 'large',
  tooltipProps,
  variant = 'contained',
  p = '8px',
  fontWeight = 'bold',
  onClick,
  ...props
}: Props) {
  const getButtonComponent = () => {
    return (
      <Box
        component={Button}
        bgcolor={
          variant != 'contained' ? 'transparent' : `${bgColor} !important`
        }
        fontWeight={`${fontWeight} !important`}
        p={`${p} !important`}
        size={size}
        color={
          variant != 'contained' && !color
            ? colors.basic.black
            : `${color} !important`
        }
        variant={variant}
        onClick={onClick}
        {...(isLoading && {
          disabled: true,
          onClick: () => {},
        })}
        {...props}
      >
        {isLoading && <CircularProgress color="inherit" />}
        {!isLoading && children}
      </Box>
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

export default ButtonCustom;
