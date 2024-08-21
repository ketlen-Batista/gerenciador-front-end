// import React from 'react';
// import Tooltip from '@material-ui/core/Tooltip';
// import Box from '@material-ui/core/Box';
// import { Autocomplete, Switch } from '@mui/material';
// interface Options {
//   label?: string;
//   value?: string;
// }
// type propTypes = {
//   label: string;
//   dayOfWeek: string;
//   value?: any;
//   active?: boolean;
//   options?: Options[] | [];
//   onClick?: (name: string) => void;
//   onChange?: (name: string, workSchedule: string, value: any) => void;
//   titleTooltip?: string;
// };
// const SwitchWithHoursSelectComponent = ({
//   label,
//   dayOfWeek,
//   value,
//   options = [],
//   active,
//   onClick,
//   onChange,
//   titleTooltip = '',
// }: propTypes) => {
//   const handleSliceByOptions = (prevValue, options) => {
//     const newOption = options.findIndex(item => item.value === prevValue);
//     if (newOption === -1) {
//       return options;
//     }
//     return options.slice(newOption + 1, options.length);
//   };
//   return (
//     <Box component="div" display="flex">
//       <Box component="div" display="flex" alignItems="center">
//         <Switch checked={active} onClick={onClick} />
//         <Tooltip title={titleTooltip}>
//           <Box
//             component="span"
//             font-size="16px"
//             fontFamily={'Poppins Bold'}
//             width={'52px'}
//           >
//             {label}
//           </Box>
//         </Tooltip>
//       </Box>
//       <Box component="div" display="flex" style={{ gap: '16px' }} ml={2}>
//         <Box
//           component="div"
//           display="flex"
//           alignItems="center"
//           style={{ gap: '12px' }}
//         >
//           <Box component="span">Inicio 1</Box>
//           <Autocomplete
//             name="hour"
//             label="Horário"
//             value={
//               value?.workScheduleFirstStart
//                 ? {
//                     value: value?.workScheduleFirstStart,
//                     label: options.find(
//                       e => e.value === value?.workScheduleFirstStart
//                     )?.label,
//                     name: options.find(
//                       e => e.value === value?.workScheduleFirstStart
//                     )?.label,
//                   }
//                 : null
//             }
//             options={options}
//             onChange={(e: any) => {
//               onChange(`${dayOfWeek}`, 'workScheduleFirstStart', e?.value);
//             }}
//             width="135px"
//             disabled={!active}
//           />
//         </Box>
//         <Box
//           component="div"
//           display="flex"
//           alignItems="center"
//           style={{ gap: '23px' }}
//         >
//           <Box component="span">Fim 1</Box>
//           <AutoComplete
//             name="hour"
//             label="Horário"
//             options={handleSliceByOptions(
//               value?.workScheduleFirstStart,
//               options
//             )}
//             value={
//               value?.workScheduleFirstStop
//                 ? {
//                     value: value?.workScheduleFirstStop,
//                     label: options.find(
//                       e => e.value === value?.workScheduleFirstStop
//                     )?.label,
//                     name: options.find(
//                       e => e.value === value?.workScheduleFirstStop
//                     )?.label,
//                   }
//                 : null
//             }
//             onChange={(e: any) => {
//               onChange(`${dayOfWeek}`, 'workScheduleFirstStop', e?.value);
//             }}
//             width="135px"
//             disabled={!active}
//           />
//         </Box>
//         <Box
//           component="div"
//           display="flex"
//           alignItems="center"
//           style={{ gap: '10px' }}
//         >
//           <Box component="span">Inicio 2</Box>
//           <AutoComplete
//             name="hour"
//             label="Horário"
//             options={handleSliceByOptions(
//               value?.workScheduleFirstStop,
//               options
//             )}
//             value={
//               value?.workScheduleSecondStart
//                 ? {
//                     value: value?.workScheduleSecondStart,
//                     label: options.find(
//                       e => e.value === value?.workScheduleSecondStart
//                     )?.label,
//                     name: options.find(
//                       e => e.value === value?.workScheduleSecondStart
//                     )?.label,
//                   }
//                 : null
//             }
//             onChange={(e: any) => {
//               onChange(`${dayOfWeek}`, 'workScheduleSecondStart', e?.value);
//             }}
//             width="135px"
//             disabled={!active}
//           />
//         </Box>
//         <Box
//           component="div"
//           display="flex"
//           alignItems="center"
//           style={{ gap: '20px' }}
//         >
//           <Box component="span">Fim 2</Box>
//           <AutoComplete
//             name="hour"
//             label="Horário"
//             options={handleSliceByOptions(
//               value?.workScheduleSecondStart,
//               options
//             )}
//             value={
//               value?.workScheduleSecondStop
//                 ? {
//                     value: value?.workScheduleSecondStop,
//                     label: options.find(
//                       e => e.value === value?.workScheduleSecondStop
//                     )?.label,
//                     name: options.find(
//                       e => e.value === value?.workScheduleSecondStop
//                     )?.label,
//                   }
//                 : null
//             }
//             onChange={(e: any) => {
//               onChange(`${dayOfWeek}`, 'workScheduleSecondStop', e?.value);
//             }}
//             width="135px"
//             disabled={!active}
//           />
//         </Box>
//       </Box>
//     </Box>
//   );
// };
// export default SwitchWithHoursSelectComponent;
/////////////////////////////////////////////////////////////
import React from 'react';

import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import {
  Autocomplete,
  FormControlLabel,
  Switch,
  TextField,
} from '@mui/material';

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
};

const SwitchWithHoursSelectComponent = ({
  label,
  dayOfWeek,
  value,
  options = [],
  active,
  onClick,
  onChange,
  titleTooltip = '',
}: propTypes) => {
  const handleSliceByOptions = (prevValue, options) => {
    const newOption = options.findIndex((item) => item.value === prevValue);
    if (newOption === -1) {
      return options;
    }
    return options.slice(newOption + 1, options.length);
  };

  return (
    <Box component="div" display="flex">
      <Box component="div" display="flex" alignItems="center">
        <FormControlLabel
          control={<Switch checked={active} onChange={onClick} />}
          label=""
        />
        <Tooltip title={titleTooltip}>
          <Box
            component="span"
            fontSize="16px"
            fontFamily={'Poppins Bold'}
            width={'52px'}
          >
            {label}
          </Box>
        </Tooltip>
      </Box>
      <Box component="div" display="flex" style={{ gap: '16px' }} ml={2}>
        <Box
          component="div"
          display="flex"
          alignItems="center"
          style={{ gap: '12px' }}
        >
          <Box component="span">Inicio 1</Box>
          <Autocomplete
            disablePortal
            renderInput={(params) => <TextField {...params} label="Horário" />}
            value={
              value?.workScheduleFirstStart
                ? {
                    value: value?.workScheduleFirstStart,
                    label: options.find(
                      (e) => e.value === value?.workScheduleFirstStart,
                    )?.label,
                  }
                : null
            }
            options={options}
            onChange={(e, newValue) => {
              onChange?.(dayOfWeek, 'workScheduleFirstStart', newValue?.value);
            }}
            disabled={!active}
          />
        </Box>
        <Box
          component="div"
          display="flex"
          alignItems="center"
          style={{ gap: '23px' }}
        >
          <Box component="span">Fim 1</Box>
          <Autocomplete
            disablePortal
            renderInput={(params) => <TextField {...params} label="Horário" />}
            options={handleSliceByOptions(
              value?.workScheduleFirstStart,
              options,
            )}
            value={
              value?.workScheduleFirstStop
                ? {
                    value: value?.workScheduleFirstStop,
                    label: options.find(
                      (e) => e.value === value?.workScheduleFirstStop,
                    )?.label,
                  }
                : null
            }
            onChange={(e, newValue) => {
              onChange?.(dayOfWeek, 'workScheduleFirstStop', newValue?.value);
            }}
            disabled={!active}
          />
        </Box>
        <Box
          component="div"
          display="flex"
          alignItems="center"
          style={{ gap: '10px' }}
        >
          <Box component="span">Inicio 2</Box>
          <Autocomplete
            disablePortal
            renderInput={(params) => <TextField {...params} label="Horário" />}
            options={handleSliceByOptions(
              value?.workScheduleFirstStop,
              options,
            )}
            value={
              value?.workScheduleSecondStart
                ? {
                    value: value?.workScheduleSecondStart,
                    label: options.find(
                      (e) => e.value === value?.workScheduleSecondStart,
                    )?.label,
                  }
                : null
            }
            onChange={(e, newValue) => {
              onChange?.(dayOfWeek, 'workScheduleSecondStart', newValue?.value);
            }}
            disabled={!active}
          />
        </Box>
        <Box
          component="div"
          display="flex"
          alignItems="center"
          style={{ gap: '20px' }}
        >
          <Box component="span">Fim 2</Box>
          <Autocomplete
            disablePortal
            renderInput={(params) => <TextField {...params} label="Horário" />}
            options={handleSliceByOptions(
              value?.workScheduleSecondStart,
              options,
            )}
            value={
              value?.workScheduleSecondStop
                ? {
                    value: value?.workScheduleSecondStop,
                    label: options.find(
                      (e) => e.value === value?.workScheduleSecondStop,
                    )?.label,
                  }
                : null
            }
            onChange={(e, newValue) => {
              onChange?.(dayOfWeek, 'workScheduleSecondStop', newValue?.value);
            }}
            disabled={!active}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SwitchWithHoursSelectComponent;
