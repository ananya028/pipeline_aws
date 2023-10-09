import { MantineTheme } from '@mantine/core';

const commonContainer = (theme: MantineTheme) => ({
  minHeight: `calc(100vh - ${theme.other.headerHeight});`,
  margin: 'auto',
});

export const Container = {
  variants: {
    s: (theme: MantineTheme) => ({
      root: {
        ...commonContainer(theme),
        maxWidth: theme.other.maw.s,
      },
    }),
    md: (theme: MantineTheme) => ({
      root: {
        ...commonContainer(theme),
        maxWidth: theme.other.maw.md,
      },
    }),
    lg: (theme: MantineTheme) => ({
      root: {
        ...commonContainer(theme),
        maxWidth: 'min-content',
        [`@media (min-width: ${theme.breakpoints.sm})`]: {
          maxWidth: theme.other.maw.lg,
        },
      },
    }),
    xl: (theme: MantineTheme) => ({
      root: {
        ...commonContainer(theme),
        maxWidth: theme.other.maw.xl,
      },
    }),
  },
};
