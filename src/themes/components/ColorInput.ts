import { MantineTheme } from '@mantine/core';

type Primary = {
  input?: {
    width?: string;
    fontSize?: string;
    color?: string;
    border?: string;
    backgroundColor?: string;
    height?: string;
    ':focus-visible'?: {
      outline?: string;
    };
  };
  wrapper?: {
    position?: 'inherit';
    display?: string;
    '.mantine-Input-input[data-with-icon]'?: {
      paddingLeft?: string;
    };
  };
  icon?: {
    position?: 'inherit';
    '.mantine-ColorSwatch-root'?: {
      width?: string;
      height?: string;
      border?: string;
    };
    '.mantine-ColorSwatch-root, .mantine-ColorSwatch-overlay'?: {
      borderRadius?: string;
    };
  };
};

export const ColorInput = {
  variants: {
    primary: (theme: MantineTheme): Primary => ({
      input: {
        width: '30%',
        fontSize: theme.fontSizes.xs,
        color: theme.colors.dark[2],
        border: 'none',
        backgroundColor: theme.colors.light[1],
        height: '24px',
        ':focus-visible': {
          outline: 'none',
        },
      },
      wrapper: {
        position: 'inherit',
        display: 'flex',
        '.mantine-Input-input[data-with-icon]': {
          paddingLeft: '17px',
        },
      },
      icon: {
        position: 'inherit',
        '.mantine-ColorSwatch-root': {
          width: '24px',
          height: '24px',
          border: `1px solid ${theme.colors.dark[2]}`,
        },
        '.mantine-ColorSwatch-root, .mantine-ColorSwatch-overlay': {
          borderRadius: '0px',
        },
      },
    }),
  },
};
