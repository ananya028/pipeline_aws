import { MantineTheme } from '@mantine/core';

// Helpers
import { ColorHelper } from '@helpers';

export const GLOBAL_STYLES = (theme: MantineTheme) => ({
  body: {
    ...theme.fn.fontStyles(),
    fontSize: theme.fontSizes.xs,
    color: theme.colors.dark[4],
    backgroundColor: ColorHelper.getColorScheme(
      theme.colorScheme,
      theme.colors.dark[1],
      theme.colors.light[4]
    ),
  },
});
