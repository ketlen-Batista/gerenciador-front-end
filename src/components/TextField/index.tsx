import React, { forwardRef, useEffect } from 'react';

import { TextFieldProps } from '@mui/material/TextField';

import { GenericRef } from '@utils/interfaces';

import * as S from './styles';

export type Props = {
  dataTestId?: string;
  debounceTimeout?: number;
  disableSelection?: boolean;
  onDebounceEnd?: (value: unknown) => void;
  onPressEnter?: (value: unknown) => void;
} & TextFieldProps;

function ForwardedTextField(
  {
    variant = 'outlined',
    dataTestId,
    debounceTimeout = 0,
    disableSelection = false,
    onDebounceEnd,
    onPressEnter,
    value,
    ...props
  }: Props,
  forwardedRef: GenericRef<HTMLDivElement>,
) {
  useEffect(() => {
    if (!onDebounceEnd) return;

    const timeoutDebounce = setTimeout(() => {
      onDebounceEnd(value);
    }, debounceTimeout);

    return () => clearTimeout(timeoutDebounce);
  }, [value, debounceTimeout]);

  return (
    <S.TextField
      ref={forwardedRef}
      value={value}
      variant={variant}
      data-disable-selection={disableSelection}
      size="small"
      {...(onPressEnter && {
        onKeyDown: (event) => {
          if (event.key === 'Enter') {
            const target = event.target as HTMLInputElement;
            onPressEnter(target.value);
            event.preventDefault();
          }
        },
      })}
      {...(dataTestId && { 'data-testid': `${dataTestId}` })}
      {...props}
    />
  );
}

const TextField = forwardRef(ForwardedTextField);

export default TextField;
