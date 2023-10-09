import { Anchor, Box, Button, Flex, MantineTheme, Text, Title } from '@mantine/core';
import { KeyboardEvent, useState } from 'react';
import { Link } from 'react-router-dom';

// Constants
import { ROUTES } from '@constants';

// Custom hooks
import { useKeyEvent } from '@hooks';
import { ColorHelper } from '@helpers';

export const EmailSent = ({ email }: { email: string }) => {
  const handleRedirect = useKeyEvent<HTMLElement>();
  const [disabledResend, setDisabledResend] = useState(false);

  /**
   * @description function handle resend email
   */
  const handleResend = () => {
    setDisabledResend(true);

    setTimeout(() => {
      setDisabledResend(false);
    }, 3000);
  };

  const handleRedirectLogin = (event: KeyboardEvent<HTMLElement>) => {
    handleRedirect(event, ' ', ROUTES.LOGIN);
  };

  return (
    <>
      <Title order={2} mb={35} variant="xl">
        Check Your Inbox
      </Title>
      <Box
        p="16px 20px 26px 20px"
        sx={(theme: MantineTheme) => ({
          backgroundColor: ColorHelper.getColorScheme(
            theme.colorScheme,
            theme.colors.dark[2],
            theme.colors.light[1]
          ),
          border: `1px solid ${theme.colors.dark[0]}`,
          boxShadow: theme.colors.shadow[0],
          borderRadius: '4px',
        })}
      >
        <Flex gap={16} direction="column" mb="xs">
          <Text variant="md">We’ve sent an email to {email} to verify your email address.</Text>
          <Text variant="md">
            Didn’t receive it?
            <Button
              variant="secondary"
              ml={5}
              td="underline"
              aria-label="re-send mail confirm"
              sx={(theme: MantineTheme) => ({
                color: theme.colors.cyan[2],
                fontWeight: theme.other.fw.medium,
                fontSize: theme.fontSizes.xxs,
                ':disabled': {
                  backgroundColor: theme.colors.none[0],
                },
                [`@media (min-width: ${theme.breakpoints.sm})`]: {
                  fontSize: theme.fontSizes.xs,
                },
              })}
              onClick={handleResend}
              disabled={disabledResend}
            >
              Resend
            </Button>
          </Text>
        </Flex>

        <Anchor
          component={Link}
          to={ROUTES.LOGIN}
          variant="secondary"
          aria-label="View login page"
          ta="center"
          sx={(theme: MantineTheme) => ({
            width: '100%',
            display: 'block',
            padding: '7px 16px',
            [`@media (min-width: ${theme.breakpoints.xs})`]: {
              fontSize: theme.fontSizes.sm,
              width: 'fit-content',
            },
          })}
          onKeyDown={handleRedirectLogin}
        >
          Back to Login
        </Anchor>
      </Box>
    </>
  );
};
