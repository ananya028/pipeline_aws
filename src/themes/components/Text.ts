import { MantineTheme } from '@mantine/core';

// Helpers
import { ColorHelper } from '@helpers';

const commonText = (theme: MantineTheme) => ({
  fontFamily: theme.other.fonts[0],
  fontWeight: theme.other.fw.bold,
});

export const Text = {
  defaultProps: (theme: MantineTheme) => ({
    color: ColorHelper.getColorScheme(
      theme.colorScheme,
      theme.colors.light[1],
      theme.colors.dark[2]
    ),
  }),
  variants: {
    xxxxl: (theme: MantineTheme) => ({
      root: {
        ...commonText(theme),
        fontSize: theme.fontSizes.xl,
        lineHeight: theme.other.lh.lg,
        [`@media (min-width: ${theme.breakpoints.sm})`]: {
          fontSize: theme.fontSizes.xxxxl,
          lineHeight: theme.other.lh.xxl,
        },
        [`@media (min-width: ${theme.breakpoints.lg})`]: {
          fontSize: theme.fontSizes.enormous,
          lineHeight: '150%',
        },
      },
    }),
    xxl: (theme: MantineTheme) => ({
      root: {
        fontFamily: theme.other.fonts[0],
        fontWeight: theme.other.fw.regular,
        fontSize: theme.fontSizes.xs,
        lineHeight: theme.other.lh.lg,
        [`@media (min-width: ${theme.breakpoints.md})`]: {
          fontSize: theme.fontSizes.lg,
        },
      },
    }),
    xl: (theme: MantineTheme) => ({
      root: {
        ...commonText(theme),
        fontSize: theme.fontSizes.md,
        lineHeight: theme.other.lh.md,
      },
    }),
    lg: (theme: MantineTheme) => ({
      root: {
        ...commonText(theme),
        fontSize: theme.fontSizes.xs,
        lineHeight: theme.other.lh.xs,
      },
    }),
    md: (theme: MantineTheme) => ({
      root: {
        fontWeight: theme.other.fw.regular,
        fontSize: theme.fontSizes.xxs,
        lineHeight: theme.other.lh.xs,

        [`@media (min-width: ${theme.breakpoints.sm})`]: {
          fontSize: theme.fontSizes.xs,
        },
      },
    }),
    sm: (theme: MantineTheme) => ({
      root: {
        fontWeight: theme.other.fw.medium,
        fontSize: theme.fontSizes.xs,
        lineHeight: theme.other.lh.xs,
      },
    }),
    xs: (theme: MantineTheme) => ({
      root: {
        fontWeight: theme.other.fw.bold,
        fontSize: theme.fontSizes.xs,
        lineHeight: theme.other.lh.xs,
      },
    }),
    xxs: (theme: MantineTheme) => ({
      root: {
        fontWeight: theme.other.fw.regular,
        fontSize: theme.fontSizes.xxs,
        lineHeight: theme.other.lh.xxs,
      },
    }),
  },
};
