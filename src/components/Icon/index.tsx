import { MantineTheme, Tooltip, useMantineColorScheme } from '@mantine/core';
import { IconHelp } from '@tabler/icons-react';
import { ReactNode } from 'react';

// Helpers
import { ColorHelper } from '@helpers';

export const IconHelpCustom = ({
  tooltip,
  size = 16,
  color,
  disabled,
  ...props
}: {
  color?: string;
  tooltip: string | ReactNode;
  size?: number;
  disabled?: boolean;
}) => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <Tooltip
      variant="primary"
      position="right"
      label={tooltip}
      withArrow
      zIndex="999"
      sx={(theme: MantineTheme) => ({
        fontWeight: 'normal',
        color: `${ColorHelper.getColorScheme(
          theme.colorScheme,
          theme.colors.dark[2],
          theme.colors.light[1]
        )}!important`,
      })}
    >
      <IconHelp
        {...props}
        size={size}
        style={{
          pointerEvents: `${disabled ? 'none' : 'auto'}`,
          cursor: 'default',
          color: `${
            color ||
            ColorHelper.getColorScheme(
              colorScheme,
              'var(--mantine-color-light-2)',
              'var(--mantine-color-dark-4)'
            )
          }`,
          marginLeft: '5px',
        }}
      />
    </Tooltip>
  );
};
