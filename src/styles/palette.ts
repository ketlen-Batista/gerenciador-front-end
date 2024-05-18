import { PaletteOptions } from '@mui/material';

import { colors } from '@styles/colors';

const defaultPalette: PaletteOptions = {
  primary: {
    dark: colors.primary.dark,
    light: colors.primary.light,
    main: colors.primary.main,
    contrastText: colors.primary.contrast,
  },
  secondary: {
    dark: colors.secondary.dark,
    light: colors.secondary.light,
    main: colors.secondary.main,
    contrastText: colors.secondary.contrast,
  },
  error: {
    dark: colors.error.dark,
    light: colors.error.light,
    main: colors.error.main,
    contrastText: colors.error.contrast,
  },
  warning: {
    dark: colors.warning.dark,
    light: colors.warning.light,
    main: colors.warning.main,
    contrastText: colors.warning.contrast,
  },
  info: {
    dark: colors.info.dark,
    light: colors.info.light,
    main: colors.info.main,
    contrastText: colors.info.contrast,
  },
  success: {
    dark: colors.success.dark,
    light: colors.success.light,
    main: colors.success.main,
    contrastText: colors.success.contrast,
  },
  text: {
    disabled: colors.text.disabled,
    primary: colors.text.primary,
    secondary: colors.text.secondary,
  },
  action: {
    hover: colors.action.hover,
    selected: colors.action.selected,
    disabledBackground: colors.action.disabledBackground,
    focus: colors.action.focus,
    disabled: colors.action.disabled,
    active: colors.action.active,
  },
  divider: colors.extra.divider,
};

export { defaultPalette };
