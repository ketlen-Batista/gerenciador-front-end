import React, {
  ChangeEvent,
  MouseEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { CalendarToday, KeyboardArrowDown } from '@mui/icons-material';
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  RadioGroup,
} from '@mui/material';
import { endOfDay, startOfDay } from 'date-fns';

import Button from '@components/Button';
import DatePicker from '@components/DatePicker';
import { initDateRange, radioGroups } from '@components/DatePicker/constants';
import DateRangePicker from '@components/DateRangePicker';
import RadioButton from '@components/RadioButton';
import TextField from '@components/TextField';
import Typography from '@components/Typography';

import { formatInputInfo } from './functions';
import { GenericRef } from './interfaces';
import { DateRange, PopoverDirection } from './interfaces';

import * as S from './styles';

interface Props {
  formatDateInfo?: string;
  initialRange?: DateRange;
  isLoading?: boolean;
  onFilter: (value: DateRange) => void;
  popoverDirection?: PopoverDirection;
}

export interface DateFilterHandles {
  getInputInfo: () => string;
  closeFilter: () => void;
}

function DateFilter(
  {
    formatDateInfo,
    initialRange,
    isLoading = false,
    onFilter,
    popoverDirection = 'right',
  }: Props,
  forwardedRef: GenericRef<DateFilterHandles>,
) {
  const [inputInfo, setInputInfo] = useState<string>('');
  const [radioOption, setRadioOption] = useState<string | null>(null);
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);
  const [selectedRange, setSelectedRange] = useState<DateRange>(
    initialRange || initDateRange,
  );

  const ref = useRef<HTMLDivElement>(null);

  const popoverIsOpen = Boolean(popoverAnchor);

  const disableFilterButton =
    radioOption === null &&
    selectedRange.startDate === null &&
    selectedRange.endDate === null;

  const handleClosePopover = () => setPopoverAnchor(null);

  const handleOpenPopover = ({ currentTarget }: MouseEvent<HTMLElement>) => {
    setPopoverAnchor(popoverAnchor ? null : currentTarget);
  };

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setRadioOption((target as HTMLInputElement).value);
  };

  const handleOnClear = () => {
    setRadioOption(null);
    setInputInfo('Selecione uma data');
    setSelectedRange({ startDate: null, endDate: null });
  };

  const handleOnFilter = () => {
    if (isLoading) return;
    if (onFilter) onFilter(selectedRange);
  };

  const handleUpdateValues = ({
    dateRange,
    info,
  }: {
    dateRange: DateRange;
    info?: string;
  }) => {
    setSelectedRange(dateRange);

    if (info) return setInputInfo(info);

    setInputInfo(() => {
      return formatInputInfo({
        formatType: formatDateInfo,
        dateRange: {
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        },
      });
    });
  };

  useEffect(() => {
    if (selectedRange?.startDate && selectedRange?.endDate) {
      const startDate = startOfDay(selectedRange.startDate).getTime();
      const endDate = endOfDay(selectedRange.endDate).getTime();

      handleUpdateValues({ dateRange: { startDate, endDate } });
    }
  }, []);

  useImperativeHandle(
    forwardedRef,
    () => ({
      getInputInfo() {
        return inputInfo;
      },
      closeFilter() {
        return handleClosePopover();
      },
    }),
    [inputInfo],
  );

  return (
    <S.Container ref={ref} className="date-filter">
      <TextField
        disableSelection
        value={inputInfo}
        onClick={handleOpenPopover}
        InputProps={{
          startAdornment: <CalendarToday className="start" />,
          endAdornment: (
            <KeyboardArrowDown
              className="end"
              style={{
                transform: popoverIsOpen ? 'rotate(180deg)' : 'none',
              }}
            />
          ),
        }}
      />
      <S.CustomPopover
        open={popoverIsOpen}
        anchorEl={popoverAnchor}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: popoverDirection,
        }}
      >
        <FormControl className="groups">
          <FormGroup className="group">
            <RadioGroup value={radioOption} onChange={handleChange}>
              {radioGroups.map((group, groupIndex) => (
                <S.GroupContent key={`${group.title}-${groupIndex}`}>
                  <Typography bold>{group.title}</Typography>
                  {group.options.map((option, optionIndex) => (
                    <FormControlLabel
                      key={`${option.value}-${groupIndex}-${optionIndex}`}
                      value={JSON.stringify(option.value)}
                      label={option.label}
                      control={
                        <RadioButton
                          color="secondary"
                          disabled={isLoading}
                          onChange={() => {
                            handleUpdateValues({
                              dateRange: option.value,
                              info: option.label,
                            });
                          }}
                        />
                      }
                    />
                  ))}
                </S.GroupContent>
              ))}
            </RadioGroup>
          </FormGroup>
          <FormGroup className="group">
            <S.GroupContent>
              <Typography bold>Selecione por dia</Typography>
              <DatePicker
                disabled={isLoading}
                value={
                  selectedRange.startDate
                    ? new Date(selectedRange.startDate)
                    : null
                }
                onChange={(selected) => {
                  if (selected) {
                    const selectedTime = selected.getTime();
                    const startDate = startOfDay(selectedTime).getTime();
                    const endDate = endOfDay(selectedTime).getTime();

                    setRadioOption(null);
                    handleUpdateValues({ dateRange: { endDate, startDate } });
                  }
                }}
              />
            </S.GroupContent>
            <S.GroupContent>
              <Typography bold>Selecione por período</Typography>
              <DateRangePicker
                disabled={isLoading}
                startDate={
                  selectedRange?.startDate
                    ? new Date(selectedRange.startDate)
                    : null
                }
                endDate={
                  selectedRange?.endDate
                    ? new Date(selectedRange.endDate)
                    : null
                }
                onChange={(selected) => {
                  if (selected.startDate && selected.endDate) {
                    const startTime = selected.startDate.getTime();
                    const endTime = selected.endDate.getTime();

                    const startDate = startOfDay(startTime).getTime();
                    const endDate = endOfDay(endTime).getTime();

                    setRadioOption(null);
                    handleUpdateValues({ dateRange: { endDate, startDate } });
                  }
                }}
              />
            </S.GroupContent>
          </FormGroup>
        </FormControl>
        <S.ButtonsContainer>
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleOnClear}
            disabled={isLoading}
          >
            Limpar filtros
          </Button>
          <Button
            color="secondary"
            onClick={handleOnFilter}
            disabled={disableFilterButton}
            isLoading={isLoading}
          >
            Filtrar
          </Button>
        </S.ButtonsContainer>
      </S.CustomPopover>
    </S.Container>
  );
}

export default forwardRef(DateFilter);
