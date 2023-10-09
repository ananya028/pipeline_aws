import {
  Image,
  MantineTheme,
  TextInput,
  TextInputProps,
  useMantineColorScheme,
} from '@mantine/core';
import { ReactNode } from 'react';

// Assets
import { iconInfoErrorDark, iconInfoErrorLight } from '@assets';
import { ColorHelper } from '@helpers';
import { getColorScheme } from '@helpers/color';

type InputType = {
  placeholder: string;
  ariaLabel?: string;
  autoComplete: string;
  errorsMessage: ReactNode;
} & TextInputProps;

export const Input = ({
  errorsMessage,
  ariaLabel,
  autoComplete,
  placeholder,
  ...props
}: InputType) => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <TextInput
      placeholder={placeholder}
      aria-label={ariaLabel}
      autoComplete={autoComplete}
      sx={(theme: MantineTheme) => ({
        label: {
          fontSize: theme.fontSizes.sm,
          color: getColorScheme(colorScheme, theme.colors.light[1], theme.colors.dark[2]),
        },
      })}
      {...props}
      error={
        errorsMessage && (
          <>
            <Image
              width={16}
              height={16}
              src={ColorHelper.getColorScheme(colorScheme, iconInfoErrorDark, iconInfoErrorLight)}
              alt="icon error"
            />
            {errorsMessage}
          </>
        )
      }
    />
  );
};
