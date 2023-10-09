import { MantineThemeOverride } from '@mantine/core';

// Themes
import { DEFAULT_COLORS } from './defaultColors';
import { FONT_SIZES } from './defaultFontSizes';
import { GLOBAL_STYLES } from './globalStyles';
import { DEFAULT_LINE_HEIGHT } from './defaultLineHeight';
import { DEFAULT_FONT_WEIGHT } from './defaultFontWeight';

// Components
import {
  Button,
  Text,
  Title,
  Container,
  Anchor,
  TextInput,
  PasswordInput,
  Tooltip,
  ColorInput,
} from './components';

export const defaultTheme: MantineThemeOverride = {
  fontFamily: 'OpenSans, Tahoma, sans-serif',
  colors: DEFAULT_COLORS as Partial<MantineThemeOverride['colors']>,
  fontSizes: FONT_SIZES,
  spacing: {
    none: '0px',
  },
  other: {
    fonts: ['Montserrat', 'OpenSans'],
    lh: DEFAULT_LINE_HEIGHT,
    fw: DEFAULT_FONT_WEIGHT,
    td: {
      none: 'none',
    },
    maw: {
      s: '420px',
      md: '838px',
      lg: '860px',
      xl: '1320px',
    },
    opacity: {
      xxs: '0.5',
      xs: '0.7',
      md: '1',
    },
    headerHeight: '90px',
  },
  headings: {
    fontFamily: 'Montserrat',
  },
  radius: {
    none: '0px',
    xs: '4px',
  },
  components: {
    Button,
    Text,
    Title,
    Container,
    Anchor,
    TextInput,
    PasswordInput,
    Tooltip,
    ColorInput,
  },
  globalStyles: GLOBAL_STYLES,
};
