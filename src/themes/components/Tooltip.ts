import { MantineTheme } from '@mantine/core';

// Helpers
import { ColorHelper } from '@helpers';

type ToolTipType = {
  tooltip: {
    backgroundColor?: string;
    maxWidth?: string;
    padding?: string;
    whiteSpace?: 'normal';
    fontSize?: string;
    fontWeight?: any;
    color?: string;
  };
};

export const Tooltip = {
  styles: (theme: MantineTheme): ToolTipType => ({
    tooltip: {
      backgroundColor: ColorHelper.getColorScheme(
        theme.colorScheme,
        theme.colors.cyan[0],
        theme.colors.cyan[2]
      ),
      maxWidth: '200px',
      padding: '16px',
      whiteSpace: 'normal',
      fontSize: theme.fontSizes.xxs,
      fontWeight: theme.other.fw.regular,
      color: ColorHelper.getColorScheme(
        theme.colorScheme,
        theme.colors.dark[2],
        theme.colors.light[6]
      ),
      [`@media (min-width: ${theme.breakpoints.md})`]: {
        maxWidth: '322px',
      },
    },
  }),
};
