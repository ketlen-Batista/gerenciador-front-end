import React from 'react';

import CalendarIcon from '@mui/icons-material/CalendarToday';
import AntdDatePicker from 'antd/es/date-picker';
import dateFnsConfig from 'rc-picker/lib/generate/dateFns';

import * as S from './styles';

interface Props {
  allowClear?: boolean;
  disabled?: boolean;
  format?: string;
  onChange?: (date: Date | null) => void;
  onClose?: () => void;
  onOpen?: () => void;
  placeholder?: string;
  value?: Date | null;
}

const FormattedDatePicker = AntdDatePicker.generatePicker<Date>(dateFnsConfig);

function DatePicker({
  allowClear = true,
  disabled = false,
  format = 'DD/MM/YYYY',
  onChange,
  onClose,
  onOpen,
  placeholder = 'Selecione uma data',
  value = null,
}: Props) {
  return (
    <S.Container>
      <FormattedDatePicker
        allowClear={allowClear}
        disabled={disabled}
        format={format}
        inputReadOnly
        onChange={onChange}
        placeholder={placeholder}
        size="large"
        suffixIcon={<CalendarIcon color="inherit" fontSize="inherit" />}
        value={value}
        onOpenChange={(status) => {
          if (status && onOpen) onOpen();
          if (!status && onClose) onClose();
        }}
      />
    </S.Container>
  );
}

export default DatePicker;
