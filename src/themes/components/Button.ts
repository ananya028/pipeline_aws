import { MantineTheme } from '@mantine/core';

// Helpers
import { ColorHelper } from '@helpers';

const commonButton = (theme: MantineTheme) => ({
  fontFamily: theme.other.fonts[0],
  lineHeight: theme.other.lh.sm,
  fontWeight: theme.other.fw.bold,
  borderRadius: theme.radius.none,
  ...theme.fn.hover({
    opacity: theme.other.opacity.xs,
  }),
});

export const Button = {
  variants: {
    primary: (theme: MantineTheme) => ({
      root: {
        ...commonButton(theme),
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
        height: 'fit-content',
        ':focus': {
          color: theme.colors.light[1],
          backgroundColor: theme.colors.primary[0],
        },
      },
    }),

    secondary: (theme: MantineTheme) => ({
      root: {
        ...commonButton(theme),
        padding: theme.spacing.none,
        color: theme.colors.light[1],
        backgroundColor: theme.colors.none[0],
      },
    }),

    tertiary: (theme: MantineTheme) => ({
      root: {
        ...commonButton(theme),
        height: '100%',
        color: ColorHelper.getColorScheme(
          theme.colorScheme,
          theme.colors.dark[1],
          theme.colors.light[1]
        ),
        backgroundColor: ColorHelper.getColorScheme(
          theme.colorScheme,
          theme.colors.cyan[0],
          theme.colors.primary[0]
        ),
        border: `2px solid ${theme.colors.none[0]}`,
        ':disabled': {
          color: ColorHelper.getColorScheme(
            theme.colorScheme,
            theme.colors.dark[0],
            theme.colors.dark[5]
          ),
          backgroundColor: ColorHelper.getColorScheme(
            theme.colorScheme,
            theme.colors.light[7],
            theme.colors.light[2]
          ),
          ...theme.fn.hover({
            opacity: theme.other.opacity.md,
          }),
        },
        ':focus': {
          color: theme.colors.light[1],
          backgroundColor: theme.colors.primary[0],
        },
      },
    }),
    quaternary: (theme: MantineTheme) => ({
      root: {
        ...commonButton(theme),
        padding: theme.spacing.none,
        backgroundColor: theme.colors.none[0],
        fontFamily: theme.other.fonts[1],
        fontSize: theme.fontSizes.xs,
        fontWeight: theme.other.fw.regular,
        textDecoration: 'underline',
        color: theme.colors.cyan[2],
      },
    }),
  },
  sizes: {
    xs: (theme: MantineTheme) => ({
      root: {
        fontSize: theme.fontSizes.xxs,
        padding: '8px 16px',
      },
    }),

    s: (theme: MantineTheme) => ({
      root: {
        fontSize: theme.fontSizes.xs,
        padding: '8px 16px',
      },
    }),

    md: (theme: MantineTheme) => ({
      root: {
        fontSize: theme.fontSizes.xs,
        width: '100%',
        padding: '15px 30px',
        [`@media (min-width: ${theme.breakpoints.xs})`]: {
          width: 'fit-content',
          fontSize: theme.fontSizes.sm,
        },
      },
    }),

    lg: (theme: MantineTheme) => ({
      root: {
        fontSize: theme.fontSizes.xl,
        padding: '8px 20px',
      },
    }),
  },
};
