import React, { ReactNode } from 'react';

import MUITypography, { TypographyProps } from '@mui/material/Typography';

interface Props extends TypographyProps {
  children: ReactNode;
  dataTestId?: string;
  bold?: boolean;
}

function Typography({
  variant = 'body1',
  children,
  dataTestId,
  bold = false,
  ...props
}: Props) {
  return (
    <MUITypography
      variant={variant}
      fontWeight={bold ? '600' : 'inherit'}
      {...(dataTestId && { 'data-testid': `${dataTestId}` })}
      {...props}
    >
      {children}
    </MUITypography>
  );
}

export default Typography;
