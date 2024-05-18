import { ptBR } from '@mui/material/locale';
import { PaletteOptions, createTheme } from '@mui/material/styles';
import { ThemeConfig } from 'antd/es/config-provider';
import { DefaultTheme } from 'styled-components';

import { colors } from './colors';
import {
  Colors as ColorTypes,
  Typography as TypographyTypes,
} from './interfaces';
import { defaultPalette } from './palette';
import { typography } from './typography';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ColorTypes;
    typography: TypographyTypes;
  }
}

export const defaultStyledTheme: DefaultTheme = {
  colors,
  typography,
};

export const defaultFontFamily = ['Poppins', 'sans-serif'].join(',');

export const createCustomMUITheme = ({
  palette,
}: {
  palette: PaletteOptions;
}) => {
  return createTheme(
    {
      palette,
      typography: {
        fontFamily: defaultFontFamily,
        fontSize: typography.body.b1.size,
        fontWeightLight: 200,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600,
        body1: {
          fontSize: typography.body.b1.size,
          fontWeight: typography.body.b1.weight,
          lineHeight: typography.body.b1.lineHeight,
        },
        body2: {
          fontSize: typography.body.b2.size,
          fontWeight: typography.body.b2.weight,
          lineHeight: typography.body.b2.lineHeight,
        },
        caption: {
          fontSize: typography.body.caption.size,
          fontWeight: typography.body.caption.weight,
          lineHeight: typography.body.caption.lineHeight,
        },
        h1: {
          fontSize: typography.header.h1.size,
          fontWeight: typography.header.h1.weight,
          lineHeight: typography.header.h1.lineHeight,
        },
        h2: {
          fontSize: typography.header.h2.size,
          fontWeight: typography.header.h2.weight,
          lineHeight: typography.header.h2.lineHeight,
        },
        h3: {
          fontSize: typography.header.h3.size,
          fontWeight: typography.header.h3.weight,
          lineHeight: typography.header.h3.lineHeight,
        },
        h4: {
          fontSize: typography.header.h4.size,
          fontWeight: typography.header.h4.weight,
          lineHeight: typography.header.h4.lineHeight,
        },
        h5: {
          fontSize: typography.header.h5.size,
          fontWeight: typography.header.h5.weight,
          lineHeight: typography.header.h5.lineHeight,
        },
        h6: {
          fontSize: typography.header.h6.size,
          fontWeight: typography.header.h6.weight,
          lineHeight: typography.header.h6.lineHeight,
        },
        subtitle1: {
          fontSize: typography.subtitle.subtitle1.size,
          fontWeight: typography.subtitle.subtitle1.weight,
          lineHeight: typography.subtitle.subtitle1.lineHeight,
        },
        subtitle2: {
          fontSize: typography.subtitle.subtitle2.size,
          fontWeight: typography.subtitle.subtitle2.weight,
          lineHeight: typography.subtitle.subtitle2.lineHeight,
        },
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            '*': {
              boxSizing: 'border-box',
              margin: 0,
              padding: 0,
              outline: 0,
            },
            body: {
              fontFamily: defaultFontFamily,
              backgroundColor: '#f2f2f2',
              margin: 0,
              '#root': {
                height: '100%',
              },
            },
            a: {
              all: 'unset',
              textDecoration: 'none',
            },
            'ol, ul': {
              listStyle: 'none',
            },
            '&::-webkit-scrollbar': {
              width: '0.5rem',
              height: '0.5rem',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#777',
              '&:hover': {
                backgroundColor: '#777',
              },
            },
          },
        },
        MuiTooltip: {
          styleOverrides: {
            arrow: {
              color: colors.chip.enableBorder,
            },
            tooltip: {
              backgroundColor: colors.chip.enableBorder,
              color: colors.basic.white,
              lineHeight: '1.25rem',
            },
          },
        },
        MuiMenuItem: {
          styleOverrides: {
            root: {
              '&.select-button-item': {
                background: 'none !important',
                '& > button': {
                  fontSize: '0.875rem',
                  width: '100%',
                  '.MuiButton-startIcon, .MuiButton-endIcon': {
                    margin: '0',
                  },
                  '.select-button-icon': {
                    fontSize: '1.25rem',
                    margin: '0 0.25rem',
                  },
                },
              },
            },
          },
        },
        MuiPopper: {
          styleOverrides: {
            root: {
              zIndex: '1200 !important',
            },
          },
        },
        MuiDialog: {
          styleOverrides: {
            root: {
              zIndex: 1200,
            },
          },
        },
      },
    },
    ptBR,
  );
};

export const defaultMUITheme = createCustomMUITheme({
  palette: defaultPalette,
});

export const antdThemeConfig: ThemeConfig = {
  token: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: typography.body.b1.size,
    fontSizeHeading1: typography.header.h1.size,
    fontSizeHeading2: typography.header.h2.size,
    fontSizeHeading3: typography.header.h3.size,
    fontSizeHeading4: typography.header.h4.size,
    fontSizeHeading5: typography.header.h5.size,
    colorPrimary: colors.secondary.main,
    colorError: colors.error.main,
    colorWarning: colors.warning.main,
    colorSuccess: colors.success.main,
    fontSizeIcon: typography.body.b1.size,
  },
  components: {
    DatePicker: {
      cellWidth: 38,
      cellHeight: 38,
    },
  },
};
