import React from 'react';

import DateRangeIcon from '@mui/icons-material/DateRange';
import AntdDatePicker from 'antd/es/date-picker';
import dateFnsConfig from 'rc-picker/lib/generate/dateFns';

import * as S from './styles';

interface Props {
  allowClear?: boolean;
  disabled?: boolean;
  endDate?: Date | null;
  format?: string;
  onChange?: (selectedRange: {
    startDate: Date | null;
    endDate: Date | null;
  }) => void;
  onClose?: () => void;
  onOpen?: () => void;
  placeholder?: [string, string];
  startDate?: Date | null;
}

const FormattedDatePicker = AntdDatePicker.generatePicker<Date>(dateFnsConfig);

function DateRangePicker({
  allowClear = true,
  disabled = false,
  endDate = null,
  format = 'DD/MM/YYYY',
  onChange,
  onClose,
  onOpen,
  placeholder = ['Data inicial', 'Data final'],
  startDate = null,
}: Props) {
  const { RangePicker } = FormattedDatePicker;

  return (
    <>
      <S.GlobalStyle />

      <S.Container>
        <RangePicker
          allowClear={allowClear}
          disabled={disabled}
          format={format}
          placeholder={placeholder}
          separator={'-'}
          size="large"
          suffixIcon={<DateRangeIcon color="inherit" fontSize="inherit" />}
          value={[startDate, endDate]}
          onChange={(selectedRange) => {
            if (selectedRange && onChange) {
              onChange({
                startDate: selectedRange?.[0],
                endDate: selectedRange?.[1],
              });
            }
          }}
          onOpenChange={(status) => {
            if (status && onOpen) onOpen();
            if (!status && onClose) onClose();
          }}
        />
      </S.Container>
    </>
  );
}

export default DateRangePicker;
