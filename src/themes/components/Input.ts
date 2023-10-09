import { MantineTheme } from '@mantine/core';

// Helpers
import { ColorHelper } from '@helpers';

const commonInput = (theme: MantineTheme) => ({
  fontFamily: theme.other.fonts[1],
  fontWeight: theme.other.fw.regular,
  backgroundColor: theme.colors.light[6],
  fontSize: theme.fontSizes.xxs,
  borderColor: theme.colors.dark[0],
  height: '42px',
  '::placeholder': {
    color: theme.colors.dark[1],
  },
  [`@media (min-width: ${theme.breakpoints.lg})`]: {
    fontSize: theme.fontSizes.xs,
  },
});

export const TextInput = {
  styles: (theme: MantineTheme) => ({
    wrapper: {
      '.mantine-TextInput-input[data-invalid]': {
        border: `2px solid ${theme.colors.warning[2]}`,
        color: theme.colors.dark[4],
        '::placeholder': {
          color: theme.colors.dark[1],
        },
      },
    },
    label: {
      fontWeight: theme.other.fw.regular,
      fontSize: theme.fontSizes.xxs,
      color: theme.colorScheme === 'dark' ? theme.colors.light[2] : theme.colors.dark[1],
      svg: {
        verticalAlign: 'sub',
      },
    },
    input: {
      padding: '8px 16px',
      ...commonInput(theme),
      ':disabled': {
        cursor: 'default',
        opacity: '1',
        backgroundColor: `${ColorHelper.getColorScheme(
          theme.colorScheme,
          theme.colors.dark[1],
          theme.colors.light[1]
        )}`,
        borderColor: `${ColorHelper.getColorScheme(
          theme.colorScheme,
          theme.colors.dark[0],
          theme.colors.light[2]
        )}`,
        '::placeholder': {
          color: ColorHelper.getColorScheme(
            theme.colorScheme,
            theme.colors.dark[0],
            theme.colors.light[2]
          ),
        },
      },
    },
    error: {
      marginTop: '8px',
      color: theme.colorScheme === 'dark' ? theme.colors.light[1] : theme.colors.dark[2],
      fontSize: theme.fontSizes.xxs,
      '.mantine-Image-root': {
        marginRight: '5px',
        verticalAlign: 'sub',
        display: 'inline-block',
      },
    },
  }),
};

export const PasswordInput = {
  styles: (theme: MantineTheme) => ({
    wrapper: {
      '.mantine-PasswordInput-input[data-invalid]': {
        border: `2px solid ${theme.colors.warning[2]}`,
      },
      '.mantine-PasswordInput-innerInput[data-invalid]::placeholder': {
        color: theme.colors.dark[1],
      },
      '.mantine-PasswordInput-innerInput[data-invalid]': {
        color: theme.colors.warning[2],
      },
    },
    input: {
      ...commonInput(theme),
    },
    innerInput: {
      height: '100%',
      fontSize: theme.fontSizes.xxs,
      '::placeholder': {
        color: theme.colors.dark[1],
      },
      [`@media (min-width: ${theme.breakpoints.lg})`]: {
        fontSize: theme.fontSizes.xs,
      },
    },
    visibilityToggle: {
      ':hover': {
        backgroundColor: theme.colors.none[0],
      },
      color: theme.colors.dark[4],
    },
    error: {
      marginTop: '8px',
      color: theme.colorScheme === 'dark' ? theme.colors.light[1] : theme.colors.dark[2],
      fontSize: theme.fontSizes.xxs,
      '.mantine-Image-root': {
        marginRight: '5px',
        verticalAlign: 'sub',
        display: 'inline-block',
      },
    },
  }),
};
