interface Text {
  primary: string;
  secondary: string;
  disabled: string;
}

interface MainColors {
  main: string;
  dark: string;
  light: string;
  contrast: string;
  states: {
    hover: string;
    selected: string;
    focus: string;
    focusVisible: string;
    outlinedBorder: string;
  };
}

interface Action {
  hover: string;
  selected: string;
  disabledBackground: string;
  focus: string;
  disabled: string;
  active: string;
}

interface AlertVariation {
  content: string;
  fill: string;
}

interface Alert {
  error: AlertVariation;
  warning: AlertVariation;
  info: AlertVariation;
  success: AlertVariation;
}

interface Chip {
  closeFill: string;
  hoverFill: string;
  focusFill: string;
  enableBorder: string;
}

interface InputVariations {
  enabled: string;
  hover: string;
}

interface Input {
  standard: InputVariations;
  filled: InputVariations;
  outlined: InputVariations;
}

type Rating = InputVariations;

interface Extra {
  divider: string;
  avatarFill: string;
  backdrop: string;
}

interface Basic {
  black: string;
  white: string;
}

interface StatusColors {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string;
  13: string;
  14: string;
  15: string;
  16: string;
  17: string;
  18: string;
  19: string;
  20: string;
}

export interface Colors {
  text: Text;
  primary: MainColors;
  secondary: MainColors;
  error: MainColors;
  warning: MainColors;
  info: MainColors;
  success: MainColors;
  action: Action;
  extra: Extra;
  alert: Alert;
  chip: Chip;
  input: Input;
  rating: Rating;
  basic: Basic;
  statusColors: StatusColors;
}

interface TypographyVariations {
  size: number;
  weight: number;
  lineHeight: string;
}

interface TypographyHeader {
  h1: TypographyVariations;
  h2: TypographyVariations;
  h3: TypographyVariations;
  h4: TypographyVariations;
  h5: TypographyVariations;
  h6: TypographyVariations;
}

interface TypographyBody {
  b1: TypographyVariations;
  b2: TypographyVariations;
  caption: TypographyVariations;
  mini: TypographyVariations;
}

interface TypographyParagraph {
  p1: TypographyVariations;
  p2: TypographyVariations;
}

interface TypographySubtitle {
  subtitle1: TypographyVariations;
  subtitle2: TypographyVariations;
}

interface TypographyComponents {
  alertTitle: TypographyVariations;
  alertDescription: TypographyVariations;
  cardTitle: TypographyVariations;
  largeButton: TypographyVariations;
  mediumButton: TypographyVariations;
  smallButton: TypographyVariations;
  inputLabel: TypographyVariations;
  inputText: TypographyVariations;
  tableHeader: TypographyVariations;
  tableCell: TypographyVariations;
  chipLabel: TypographyVariations;
  avatarInitials: TypographyVariations;
}

export interface Typography {
  header: TypographyHeader;
  body: TypographyBody;
  paragraph: TypographyParagraph;
  subtitle: TypographySubtitle;
  components: TypographyComponents;
}
