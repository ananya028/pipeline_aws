import { MantineTheme } from '@mantine/core';

// Helpers
import { ColorHelper } from '@helpers';

type SkipToMainContent = {
  root: {
    position?: 'fixed';
    left?: string;
    top?: string;
    zIndex?: number;
    padding?: string;
    backgroundColor?: string;
    color?: string;
    ':focus': {
      left?: string;
    };
  };
};

const commonAnchor = (theme: MantineTheme) => ({
  fontFamily: theme.other.fonts[0],
  lineHeight: theme.other.lh.sm,
  fontWeight: theme.other.fw.bold,
  color: theme.colors.light[1],
  ...theme.fn.hover({
    textDecoration: 'none',
    opacity: theme.other.opacity.xs,
  }),
});

export const Anchor = {
  variants: {
    primary: (theme: MantineTheme) => ({
      root: {
        ...commonAnchor(theme),
        fontSize: theme.fontSizes.sm,
        color: ColorHelper.getColorScheme(
          theme.colorScheme,
          theme.colors.light[1],
          theme.colors.dark[2]
        ),
      },
    }),
    secondary: (theme: MantineTheme) => ({
      root: {
        ...commonAnchor(theme),
        fontSize: theme.fontSizes.sm,
        width: 'fit-content',
        display: 'block',
        padding: '17px 30px',
        color: ColorHelper.getColorScheme(
          theme.colorScheme,
          theme.colors.dark[2],
          theme.colors.light[1]
        ),
        backgroundColor: ColorHelper.getColorScheme(
          theme.colorScheme,
          theme.colors.cyan[0],
          theme.colors.cyan[2]
        ),
      },
    }),
    tertiary: (theme: MantineTheme) => ({
      root: {
        ...commonAnchor(theme),
        fontSize: theme.fontSizes.xs,
        color: ColorHelper.getColorScheme(
          theme.colorScheme,
          theme.colors.cyan[0],
          theme.colors.cyan[2]
        ),
        border: `2px solid ${ColorHelper.getColorScheme(
          theme.colorScheme,
          theme.colors.cyan[0],
          theme.colors.cyan[2]
        )}`,
        backgroundColor: ColorHelper.getColorScheme(
          theme.colorScheme,
          theme.colors.dark[2],
          theme.colors.none[0]
        ),
        padding: '15px 28px',
        [`@media (min-width: ${theme.breakpoints.xs})`]: {
          fontSize: theme.fontSizes.sm,
        },
      },
    }),
    skipToMainContent: (theme: MantineTheme): SkipToMainContent => ({
      root: {
        position: 'fixed',
        left: '100%',
        top: '10%',
        zIndex: 999,
        padding: '10px',
        backgroundColor: theme.colors.dark[4],
        color: theme.colors.light[1],
        ':focus': {
          left: '2%',
        },
      },
    }),
  },
  sizes: {
    xs: (theme: MantineTheme) => ({
      root: {
        fontSize: theme.fontSizes.xxs,
        [`@media (min-width: ${theme.breakpoints.lg})`]: {
          fontSize: theme.fontSizes.xs,
        },
      },
    }),
  },
};
