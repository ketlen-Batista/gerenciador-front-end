import React from 'react';

import { TextField } from '@material-ui/core';

import { useStyles } from './styles';

const TextInput = ({ variant = 'filled', InputProps, ...props }: any) => {
  const classes = useStyles();
  return (
    <TextField
      fullWidth
      variant={variant}
      {...props}
      InputProps={{
        classes: {
          root: classes.styledInput,
          disabled: classes.disabled,
          input: props.mini ? classes.miniInput : null,
        },
        ...InputProps,
      }}
      InputLabelProps={{
        shrink: (['date', 'time'].includes(props?.type)
          ? true
          : props?.value || false) as boolean,
        classes: {
          root: classes.cssLabel,
        },
      }}
    />
  );
};

export default TextInput;
