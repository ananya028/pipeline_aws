import { KeyboardEvent, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { Box, Button, Container, Flex, MantineTheme, Text, Title } from '@mantine/core';

// Constants
import { ROUTES } from '@constants';

import { AuthenticationContext } from '@contexts';

// Custom hooks
import { useKeyEvent } from '@hooks';

// Helpers
import { ColorHelper, validateEmail } from '@helpers';

// Components
import { EmailSent, Input } from '@components';
import { FieldValidationError } from '@types';

export const ForgotPassword = () => {
  const { onForgotPassword } = useContext(AuthenticationContext);
  const handleRedirect = useKeyEvent<HTMLElement>();
  const [errors, setErrors] = useState<FieldValidationError[]>([]);
  const [emailSent, setEmailSent] = useState('');
  const form = useForm({
    initialValues: { email: '' },
    validate: {
      email: validateEmail,
    },
  });

  async function handleSubmitForm() {
    const response = await onForgotPassword(form.values.email);

    if (response) {
      const { errorFields } = response;

      if (errorFields) {
        setErrors(errorFields);
      } else {
        setErrors([]);
      }
    } else {
      setEmailSent(form.values.email);
    }
  }

  const handleRedirectLogin = (event: KeyboardEvent<HTMLElement>) => {
    handleRedirect(event, ' ', ROUTES.LOGIN);
  };

  return (
    <Container variant="s" className="forgot-password-page" aria-label="forgot password page">
      <Box m="auto" p={{ base: '80px 15px 0 15px' }}>
        {emailSent ? (
          <EmailSent email={emailSent} />
        ) : (
          <>
            <Title order={2} mb={35} variant="xl">
              Forgot Password?
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
              <Text
                variant="md"
                sx={(theme: MantineTheme) => ({
                  fontFamily: theme.other.fonts[0],
                  fontWeight: theme.other.fw.bold,
                })}
              >
                Reset your password
              </Text>
              <Text variant="md" mt="27px">
                Enter the email associated with your account, and we’ll send an email with
                instructions to reset your password.
              </Text>
              {errors.length > 0 && (
                <Flex
                  justify="center"
                  mt={15}
                  p="10px 15px"
                  direction="column"
                  mb={15}
                  sx={(theme: MantineTheme) => ({
                    backgroundColor: theme.colors.opacityWarning[0],
                    border: `2px solid ${theme.colors.warning[0]}`,
                    borderRadius: '4px',
                  })}
                >
                  {errors.map((err) => (
                    <div key={err.field}>
                      {err.field === 'email' && <Text>* {err.description}</Text>}
                    </div>
                  ))}
                </Flex>
              )}
              <form onSubmit={form.onSubmit(handleSubmitForm)} aria-label="form forgot password">
                <Flex p="32px 0" gap={16} direction="column">
                  <Input
                    label="Email"
                    placeholder=""
                    errorsMessage={form.errors.email}
                    {...form.getInputProps('email')}
                    aria-label="email"
                    autoComplete="email"
                  />
                </Flex>
                <Flex
                  gap={12}
                  justify={{ base: 'stretch' }}
                  direction={{ base: 'column', xs: 'row' }}
                >
                  <Button
                    component={Link}
                    to={ROUTES.LOGIN}
                    variant="primary"
                    aria-label="View login page"
                    size="md"
                    ta="center"
                    onKeyDown={handleRedirectLogin}
                  >
                    Back
                  </Button>
                  <Button variant="tertiary" size="md" type="submit" aria-label="send mail confirm">
                    Submit
                  </Button>
                </Flex>
              </form>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};
