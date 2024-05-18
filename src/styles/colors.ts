import { Colors } from './interfaces';

const colors: Colors = {
  text: {
    primary: '#424242',
    secondary: '#757575',
    disabled: '#BDBDBD',
  },
  primary: {
    main: '#00B4AA',
    dark: '#007D76',
    light: '#33C3BB',
    contrast: '#E9F5FE',
    states: {
      hover: '#3E68BD0A',
      selected: '#06B4A814',
      focus: '#06B4A81F',
      focusVisible: '#06B4A84D',
      outlinedBorder: '#7DCAC2',
    },
  },
  secondary: {
    main: '#4443BC',
    dark: '#2B4884',
    light: '#6486CA',
    contrast: '#F8F7FC',
    states: {
      hover: '#3E68BD0A',
      selected: '#3E68BD14',
      focus: '#3E68BD1F',
      focusVisible: '#3E68BD4D',
      outlinedBorder: '#3E68BD80',
    },
  },
  error: {
    main: '#D32F2F',
    dark: '#C62828',
    light: '#EF5350',
    contrast: '#FEECEB',
    states: {
      hover: '#D32F2F0A',
      selected: '#D32F2F14',
      focus: '#D32F2F1F',
      focusVisible: '#D32F2F4D',
      outlinedBorder: '#D32F2F80',
    },
  },
  warning: {
    main: '#ED6C02',
    dark: '#E65100',
    light: '#FF9800',
    contrast: '#FFF5E5',
    states: {
      hover: '#ED6C020A',
      selected: '#ED6C0214',
      focus: '#ED6C021F',
      focusVisible: '#ED6C024D',
      outlinedBorder: '#ED6C0280',
    },
  },
  info: {
    main: '#0288D1',
    dark: '#015F92',
    light: '#349FDA',
    contrast: '#0288D114',
    states: {
      hover: '#0288D10A',
      selected: '#0288D114',
      focus: '#0288D11F',
      focusVisible: '#0288D14D',
      outlinedBorder: '#0288D180',
    },
  },
  success: {
    main: '#2E7D32',
    dark: '#1B5E20',
    light: '#4CAF50',
    contrast: '#f0f6f6',
    states: {
      hover: '#2E7D320A',
      selected: '#2E7D3214',
      focus: '#2E7D321F',
      focusVisible: '#2E7D324D',
      outlinedBorder: '#2E7D3280',
    },
  },
  action: {
    hover: '#0000000A',
    selected: '#00000014',
    disabledBackground: '#0000001F',
    focus: '#0000001F',
    disabled: '#0000004D',
    active: '#00000080',
  },
  extra: {
    divider: '#0000001F',
    avatarFill: '#D9D9D9',
    backdrop: '#00000080',
  },
  alert: {
    error: {
      content: '#531214',
      fill: '#fbebeb',
    },
    warning: {
      content: '#5f2a07',
      fill: '#fdf1e7',
    },
    info: {
      content: '#023753',
      fill: '#e6f3fa',
    },
    success: {
      content: '#133216',
      fill: '#ebf2eb',
    },
  },
  chip: {
    closeFill: '#00000040',
    hoverFill: '#0000001F',
    focusFill: '#0000001F',
    enableBorder: '#616161',
  },
  input: {
    standard: {
      enabled: '#0000006B',
      hover: '#000000',
    },
    filled: {
      enabled: '#0000000F',
      hover: '#00000017',
    },
    outlined: {
      enabled: '#0000003B',
      hover: '#0000003B',
    },
  },
  rating: {
    enabled: '#0000003B',
    hover: '#00000052',
  },
  basic: {
    black: '#000',
    white: '#FFF',
  },
};

export { colors };
