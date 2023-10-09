import {
  iconEyeClose,
  iconEyeCloseError,
  iconEyeOpen,
  iconEyeOpenError,
  iconInfoErrorDark,
  iconInfoErrorLight,
} from '@assets';
import { MESSAGES_ERROR } from '@constants';
import { ColorHelper } from '@helpers';
import { getColorScheme } from '@helpers/color';
import {
  Image,
  PasswordInput as Input,
  List,
  MantineTheme,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ReactNode, useCallback, useEffect, useRef } from 'react';

export const PasswordInput = ({
  errorsMessage,
  ariaLabel,
  autoComplete,
  placeholder,
  isInValidRulesPassword,
  label,
  ...props
}: {
  errorsMessage: ReactNode;
  placeholder: string;
  ariaLabel: string;
  isInValidRulesPassword?: boolean;
  autoComplete: string;
  label?: string;
}) => {
  const { colorScheme } = useMantineColorScheme();
  const [visible, { toggle }] = useDisclosure(false);
  const ref = useRef<HTMLInputElement>(null);

  const toggleVisibilityIcon = useCallback(
    ({ reveal }: { reveal: boolean }) => {
      const iconSrc = errorsMessage
        ? reveal
          ? iconEyeCloseError
          : iconEyeOpenError
        : reveal
        ? iconEyeClose
        : iconEyeOpen;

      return <Image width={24} height={24} mr={5} src={iconSrc} alt="icon error" />;
    },
    [errorsMessage]
  );

  useEffect(() => {
    const handleClick = (event: Event) => {
      if ((event as KeyboardEvent).key === 'Enter') {
        toggle();
      }
    };

    const button = ref.current!.closest('.mantine-Input-wrapper')!.querySelector('button');

    if (button) {
      button.addEventListener('keydown', handleClick);
      button.ariaHidden = 'false';
      button.ariaLabel = 'show hide password';
    }

    return () => {
      if (button) {
        button.removeEventListener('keydown', handleClick);
      }
    };
  }, [ref, toggle, visible]);

  return (
    <Input
      label={label}
      placeholder={placeholder}
      aria-label={ariaLabel}
      autoComplete={autoComplete}
      toggleTabIndex={0}
      visible={visible}
      onVisibilityChange={toggle}
      ref={ref}
      {...props}
      visibilityToggleIcon={toggleVisibilityIcon}
      sx={(theme: MantineTheme) => ({
        label: {
          fontSize: theme.fontSizes.sm,
          color: getColorScheme(colorScheme, theme.colors.light[1], theme.colors.dark[2]),
          fontWeight: 100,
        },
      })}
      error={
        errorsMessage &&
        // This condition is to check that if the custom error password match with the rules or
        // show normal error (ex: Passwords do not match)
        (isInValidRulesPassword ? (
          <>
            <Image
              width={16}
              height={16}
              src={ColorHelper.getColorScheme(colorScheme, iconInfoErrorDark, iconInfoErrorLight)}
              alt="icon error"
            />
            <span>{errorsMessage}</span>
            <List
              sx={(theme: MantineTheme) => ({
                color: theme.colorScheme === 'dark' ? theme.colors.light[1] : theme.colors.dark[2],
                fontSize: theme.fontSizes.xxs,
                li: {
                  marginLeft: '30px',
                },
              })}
            >
              <List.Item>{MESSAGES_ERROR.PASSWORD_LENGTH}</List.Item>
              <List.Item>{MESSAGES_ERROR.PASSWORD_UPPERCASE}</List.Item>
              <List.Item>{MESSAGES_ERROR.PASSWORD_NUMBER}</List.Item>
              <List.Item>{MESSAGES_ERROR.PASSWORD_SPECIAL_CHARACTER}</List.Item>
              <List.Item>{MESSAGES_ERROR.PASSWORD_EMPTY_SPACES}</List.Item>
            </List>
          </>
        ) : (
          <>
            <Image
              width={16}
              height={16}
              src={ColorHelper.getColorScheme(colorScheme, iconInfoErrorDark, iconInfoErrorLight)}
              alt="icon error"
            />
            {errorsMessage}
          </>
        ))
      }
    />
  );
};
