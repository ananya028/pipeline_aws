import { MantineThemeOverride } from '@mantine/core';

type DefaultFontSizes = {
  xxs?: string;
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  xxl?: string;
  xxxl?: string;
  xxxxl?: string;
  huge?: string;
} & MantineThemeOverride['fontSizes'];

export const FONT_SIZES: Partial<DefaultFontSizes> = {
  xxs: '14px',
  xs: '16px',
  sm: '18px',
  md: '20px',
  lg: '22px',
  xl: '24px',
  xxl: '26px',
  xxxl: '44px',
  xxxxl: '48px',
  huge: '57px',
  enormous: '80px',
};
