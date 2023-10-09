import { MantineTheme } from '@mantine/core';

// Helpers
import { ColorHelper } from '@helpers';

const commonText = (theme: MantineTheme) => ({
  fontFamily: theme.other.fonts[0],
  fontWeight: theme.other.fw.bold,
});

export const Title = {
  defaultProps: (theme: MantineTheme) => ({
    color: ColorHelper.getColorScheme(
      theme.colorScheme,
      theme.colors.light[1],
      theme.colors.dark[4]
    ),
  }),
  variants: {
    huge: (theme: MantineTheme) => ({
      root: {
        ...commonText(theme),
        fontSize: theme.fontSizes.xl,
        lineHeight: theme.other.lh.lg,

        [`@media (min-width: ${theme.breakpoints.sm})`]: {
          fontSize: theme.fontSizes.xxxxl,
          lineHeight: theme.other.lh.xxl,
        },
        [`@media (min-width: ${theme.breakpoints.lg})`]: {
          fontSize: theme.fontSizes.huge,
          lineHeight: theme.other.lh.huge,
        },
      },
    }),
    xl: (theme: MantineTheme) => ({
      root: {
        ...commonText(theme),
        fontSize: theme.fontSizes.md,
        lineHeight: theme.other.lh.md,
        [`@media (min-width: ${theme.breakpoints.lg})`]: {
          fontSize: theme.fontSizes.lg,
          lineHeight: theme.other.lh.lg,
        },
      },
    }),
  },
};
