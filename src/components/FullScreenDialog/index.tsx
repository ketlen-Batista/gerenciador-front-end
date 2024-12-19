import React, { ReactElement, ReactNode, Ref, forwardRef } from 'react';

import CloseIcon from '@mui/icons-material/CancelOutlined';
import MUIDialog, { DialogProps } from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

import Button from '@src/components/ButtonCustom';

import CircularProgress from '@components/CircularProgress';
import Typography from '@components/Typography';

import * as S from './styles';

interface Props extends DialogProps {
  children: ReactNode;
  dataTestId?: string;
  closeButtonPosition?: 'left' | 'right';
  extraFooterComponent?: ReactNode;
  extraHeaderComponent?: ReactNode;
  hideToolbar?: boolean;
  isLoading?: boolean;
  onClose: () => void;
  open: boolean;
  subTitle?: string;
  title?: string;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FullScreenDialog({
  children,
  dataTestId,
  closeButtonPosition = 'left',
  extraFooterComponent,
  extraHeaderComponent,
  hideToolbar = false,
  isLoading = false,
  onClose,
  open,
  subTitle,
  title,
  ...props
}: Props) {
  const getCloseButton = () => {
    return (
      <Button
        customType="icon"
        variant="text"
        color="inherit"
        onClick={onClose}
        className="close-dialog"
        rounded
      >
        <CloseIcon />
      </Button>
    );
  };

  return (
    <MUIDialog
      // fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      {...(dataTestId && { 'data-testid': `${dataTestId}` })}
      {...props}
    >
      {!hideToolbar && (
        <S.Toolbar className="header">
          {closeButtonPosition === 'left' && getCloseButton()}
          <div className="toolbar-box">
            <div className="title-box">
              {title && (
                <Typography variant="h6" component="b" className="title">
                  {title}
                </Typography>
              )}
              {subTitle && (
                <Typography variant="body2" component="span">
                  {subTitle}
                </Typography>
              )}
            </div>
            {extraHeaderComponent && <div>{extraHeaderComponent}</div>}
            {closeButtonPosition === 'right' && getCloseButton()}
          </div>
        </S.Toolbar>
      )}
      <S.ContentBox>
        {isLoading && (
          <div className="loading-box">
            <CircularProgress size="large" color="primary" />
          </div>
        )}
        {!isLoading && children}
      </S.ContentBox>
      {extraFooterComponent && (
        <S.Toolbar className="footer">{extraFooterComponent}</S.Toolbar>
      )}
    </MUIDialog>
  );
}

export default FullScreenDialog;
