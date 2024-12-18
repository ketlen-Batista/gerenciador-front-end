import React from 'react';

import { Box, Switch } from '@material-ui/core';
// import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import { Autocomplete, FormControlLabel, Grid, TextField } from '@mui/material';
import BoxMui from '@mui/material/Box';
import { colors } from '@src/styles/colors';

import Typography from '@src/components/Typography';

interface Options {
  label?: string;
  value?: string;
}

type propTypes = {
  label: string;
  dayOfWeek: string;
  value?: any;
  active?: boolean;
  options?: Options[] | [];
  onClick?: () => void;
  onChange?: (dayOfWeek: string, key: string, value: any) => void;
  titleTooltip?: string;
  EntryTime?: string;
  PauseTime?: string;
  ReturnTime?: string;
  ExitTime?: string;
  statusJustificationName?: string;
};

const SwitchWithHoursSelectComponent = ({
  label,
  dayOfWeek,
  options = [],
  active,
  onClick,
  onChange,
  titleTooltip = '',
  EntryTime,
  PauseTime,
  ReturnTime,
  ExitTime,
  statusJustificationName = '',
}: propTypes) => {
  const handleSliceByOptions = (
    prevValue: string | undefined,
    options: Options[],
  ) => {
    const newOption = options.findIndex((item) => item.value === prevValue);
    if (newOption === -1) {
      return options;
    }
    return options.slice(newOption + 1, options.length);
  };

  return (
    <Box component="div" display="flex">
      <Grid container mt={3}>
        <Grid item xs={6}>
          <Tooltip title={titleTooltip}>
            <BoxMui
              fontSize={{
                xs: '14px',
                md: '16px',
              }}
              fontWeight={'bold'}
            >
              {label}
            </BoxMui>
          </Tooltip>
        </Grid>

        <Grid item xs={6} display={'flex'} justifyContent={'flex-end'}>
          {statusJustificationName?.length ? (
            <BoxMui
              component="div"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius={4}
              bgcolor={colors.primary.main}
              color={colors.basic.white}
              fontWeight={600}
              fontSize={'12px'}
              p={1}
              sx={{
                opacity: 0.9,
              }}
            >
              {statusJustificationName ?? ''}
            </BoxMui>
          ) : (
            <FormControlLabel
              control={
                <Switch checked={active} onChange={onClick} color="primary" />
              }
              label={active ? 'Trabalho' : 'Folga'}
            />
          )}
        </Grid>
        {/* </Box> */}
      </Grid>
      <Box component="div" display="flex" style={{ gap: '16px' }}>
        <Box
          component="div"
          display="flex"
          alignItems="center"
          style={{ gap: '12px' }}
        >
          <Box component="span">Entrada</Box>
          <Box>
            <Autocomplete
              disablePortal
              renderInput={(params) => (
                <TextField {...params} label={active ? 'Horário' : 'Folga'} />
              )}
              value={EntryTime ? { value: EntryTime, label: EntryTime } : null}
              options={options}
              onChange={(e, newValue) => {
                onChange?.(dayOfWeek, 'EntryTime', newValue?.value);
              }}
              disabled={!active}
              disableClearable
            />
          </Box>
        </Box>
        <Box
          component="div"
          display="flex"
          alignItems="center"
          style={{ gap: '15px' }}
        >
          <Box component="span" pb={5}>
            Pausa
          </Box>
          <Autocomplete
            disablePortal
            renderInput={(params) => (
              <TextField {...params} label={active ? 'Horário' : 'Folga'} />
            )}
            options={handleSliceByOptions(EntryTime, options)}
            value={PauseTime ? { value: PauseTime, label: PauseTime } : null}
            onChange={(e, newValue) => {
              onChange?.(dayOfWeek, 'PauseTime', newValue?.value);
            }}
            disabled={!active}
            disableClearable
          />
        </Box>
        <Box
          component="div"
          display="flex"
          alignItems="center"
          style={{ gap: '12px' }}
        >
          <Box component="span">Retorno</Box>
          <Autocomplete
            disablePortal
            renderInput={(params) => (
              <TextField {...params} label={active ? 'Horário' : 'Folga'} />
            )}
            options={handleSliceByOptions(PauseTime, options)}
            value={ReturnTime ? { value: ReturnTime, label: ReturnTime } : null}
            onChange={(e, newValue) => {
              onChange?.(dayOfWeek, 'ReturnTime', newValue?.value);
            }}
            disabled={!active}
            disableClearable
          />
        </Box>
        <Box
          component="div"
          display="flex"
          alignItems="center"
          style={{ gap: '12px' }}
        >
          <Box component="span">Saída</Box>
          <Autocomplete
            disablePortal
            renderInput={(params) => (
              <TextField {...params} label={active ? 'Horário' : 'Folga'} />
            )}
            options={handleSliceByOptions(ReturnTime, options)}
            value={ExitTime ? { value: ExitTime, label: ExitTime } : null}
            onChange={(e, newValue) => {
              onChange?.(dayOfWeek, 'ExitTime', newValue?.value);
            }}
            disabled={!active}
            disableClearable
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SwitchWithHoursSelectComponent;
