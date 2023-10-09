import { Checkbox as CheckBoxMantine, CheckboxProps, MantineTheme } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { ChangeEvent, ReactNode } from 'react';

// Helpers
import { ColorHelper } from '@helpers';

// Assets
import {
  iconCheckBoxDark,
  iconCheckBoxLight,
  iconCheckBoxDisabled,
  toggleDark,
  toggleLight,
} from '@assets';

type CheckBoxType = {
  label?: string | ReactNode;
  name: string;
  checked?: boolean;
  indexColor?: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
} & CheckboxProps;

const commonStyle = {
  '.mantine-Checkbox-body': {
    alignItems: 'center',
  },
  '.mantine-Checkbox-inner': {
    width: 'fit-content',
    height: 'fit-content',
  },
  svg: {
    width: '95%',
    display: 'none',
  },
};

export const Checkbox = ({
  size = '24px',
  label,
  name,
  checked,
  onChange,
  indexColor = 0,
  ...props
}: CheckBoxType) => (
  <CheckBoxMantine
    icon={IconCheck}
    label={label}
    name={name}
    checked={checked}
    onChange={onChange}
    {...props}
    sx={(theme: MantineTheme) => ({
      ...commonStyle,
      label: {
        color: `${ColorHelper.getColorScheme(
          theme.colorScheme,
          theme.colors.light[1],
          theme.colors.dark[2]
        )}!important`,
      },
      input: {
        width: `${size}`,
        height: `${size}`,
        border: `3px solid ${ColorHelper.getColorScheme(
          theme.colorScheme,
          theme.colors.dark[indexColor],
          theme.colors.dark[indexColor]
        )}`,
        backgroundColor: theme.colors.none[0],
        ':checked': {
          background: `url(${ColorHelper.getColorScheme(
            theme.colorScheme,
            iconCheckBoxDark,
            iconCheckBoxLight
          )})`,
          backgroundPosition: 'center',
          borderColor: ColorHelper.getColorScheme(
            theme.colorScheme,
            theme.colors.cyan[0],
            theme.colors.cyan[2]
          ),
        },
        ':disabled': {
          background: `url(${iconCheckBoxDisabled})`,
          border: 'none',
        },
      },
    })}
  />
);

export const ToggleTheme = ({
  width = '76.7px',
  height = '34px',
  name,
  ...props
}: CheckBoxType) => (
  <CheckBoxMantine
    icon={IconCheck}
    name={name}
    {...props}
    aria-label="toggle change theme"
    sx={(theme: MantineTheme) => ({
      ...commonStyle,
      input: {
        width: `${width}`,
        height: `${height}`,
        backgroundColor: theme.colors.none[0],
        border: 'none',
        background: `url(${toggleLight})`,
        backgroundSize: '76.7px 34px',
        ':checked': {
          background: `url(${toggleDark})`,
          backgroundSize: '76.7px 34px',
          backgroundPosition: 'center',
          border: 'none',
          backgroundColor: theme.colors.none[0],
        },
      },
    })}
  />
);
