import { Anchor, Box, Button, Container, Flex, MantineTheme, Text, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { KeyboardEvent, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Contexts
import { AuthenticationContext } from '@contexts';

// Helpers
import { ColorHelper, validateEmail, validateRequired } from '@helpers';

// Constants
import { MESSAGES_ERROR, ROUTES, ROUTES_AUTH } from '@constants';

// Types
import { FieldValidationError } from '@types';

// Components
import { Input, PasswordInput } from '@components';
import { useKeyEvent } from '@hooks';

export const Login = () => {
  const { onLogin } = useContext(AuthenticationContext);
  const [errors, setErrors] = useState<FieldValidationError[]>([]);
  const handleRedirect = useKeyEvent<HTMLElement>();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: {
      email: validateEmail,
      password: validateRequired,
    },
  });

  const handleSubmitForm = async () => {
    const response = await onLogin(form.values.email, form.values.password);

    if (response) {
      const { message, errorFields } = response;

      if (errorFields) {
        setErrors(errorFields);
      } else {
        setErrors([]);
      }

      if (!message) {
        navigate(ROUTES_AUTH.PROJECTS);
      }
    } else {
      navigate(ROUTES_AUTH.PROJECTS);
    }
  };

  function handleRedirectForgotPassword(event: KeyboardEvent<HTMLElement>) {
    handleRedirect(event, ' ', ROUTES.FORGOT_PASSWORD);
  }

  return (
    <Container variant="s" className="login-page" aria-label="login page">
      <Box w={{ base: 340, xs: 450 }} m="auto" p={{ base: '80px 15px 0 15px' }}>
        <Title order={2} mb={35} variant="xl">
          Login
        </Title>
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
            {errors.map((error) => (
              <div key={error.field}>
                {error.field === 'password' && <Text>* {MESSAGES_ERROR.INVALID_PASSWORD}</Text>}

                {error.field === 'email' && <Text>* {MESSAGES_ERROR.EMAIL_UNKNOWN}</Text>}
              </div>
            ))}
          </Flex>
        )}
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
            Welcome
          </Text>
          <form onSubmit={form.onSubmit(handleSubmitForm)} aria-label="form login">
            <Flex p="27px 0" gap={16} direction="column">
              <Input
                label="Email"
                ariaLabel="email"
                autoComplete="email"
                errorsMessage={form.errors.email}
                placeholder=""
                {...form.getInputProps('email')}
              />
              <PasswordInput
                errorsMessage={form.errors.password}
                placeholder=""
                {...form.getInputProps('password')}
                ariaLabel="password"
                autoComplete="current-password"
                label="Password"
              />
              <Anchor
                size="sm"
                component={Link}
                to={ROUTES.FORGOT_PASSWORD}
                td="underline"
                aria-label="view forgot password page"
                onKeyDown={handleRedirectForgotPassword}
                sx={(theme: MantineTheme) => ({
                  color: ColorHelper.getColorScheme(
                    theme.colorScheme,
                    theme.colors.cyan[0],
                    theme.colors.cyan[2]
                  ),
                })}
              >
                Forgot Password?
              </Anchor>
            </Flex>
            <Button variant="tertiary" size="md" type="submit" aria-label="login account">
              Login
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
};
