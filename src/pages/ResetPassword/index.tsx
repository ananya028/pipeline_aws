import {
  Anchor,
  Box,
  Button,
  Container,
  Flex,
  Image,
  Input,
  MantineTheme,
  Text,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { KeyboardEvent, useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// Assets
import { iconCheck } from '@assets';

// Constants
import { ROUTES } from '@constants';

import { AuthenticationContext } from '@contexts';

// Helpers
import { validateConfirmPassword, validatePassword } from '@helpers';

// Custom hooks
import { useKeyEvent } from '@hooks';

// Components
import { PasswordInput } from '@components';
import { FieldValidationError } from '@types';

export const ResetPassword = () => {
  const handleRedirect = useKeyEvent<HTMLElement>();
  const { onValidateResetPasswordLink, onResetPassword } = useContext(AuthenticationContext);
  const [resetSuccess, setResetSuccess] = useState('');
  const [errors, setErrors] = useState<FieldValidationError[]>([]);
  const [isLinkValid, setIsLinkValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const { resetToken } = useParams<{ resetToken: string }>();
  const form = useForm<{
    confirmPassword: string;
    password: string;
  }>({
    initialValues: { confirmPassword: '', password: '' },
    validate: {
      password: (value) => validatePassword(value, false),
      confirmPassword: (value, values) => validateConfirmPassword(value, values.password),
    },
  });

  async function validateResetPasswordLink() {
    if (resetToken) {
      const response = await onValidateResetPasswordLink(resetToken);

      if (!response || typeof response !== 'string') {
        setIsLinkValid(false);
      } else if (response && typeof response === 'string') {
        setIsLinkValid(true);
        setUserId(response);
      }
    }
  }

  useEffect(() => {
    validateResetPasswordLink();
  }, []);

  /**
   * @description function handle submit password form
   */
  async function handleSubmitForm() {
    if (form.values.confirmPassword && resetToken && userId) {
      setIsLoading(true);
      const response = await onResetPassword(userId, form.values.password, resetToken);

      if (response) {
        const { message, errorFields } = response;

        if (errorFields) {
          setErrors(errorFields);
        } else {
          setErrors([]);
        }

        if (!message) {
          setResetSuccess(form.values.confirmPassword);
        }
      } else {
        setResetSuccess(form.values.confirmPassword);
      }
      setIsLoading(false);
    }
  }

  function handleRedirectLogin(event: KeyboardEvent<HTMLElement>) {
    handleRedirect(event, ' ', ROUTES.LOGIN);
  }

  return (
    <Container variant="s" className="reset password page" aria-label="reset password page">
      <Box m="auto" pt={80} p={{ base: ' 80px 15px 0 15px' }}>
        {resetSuccess ? (
          <>
            <Flex direction="row" pb={32}>
              <Image width={24} height={24} src={iconCheck} alt="icon success" />
              <Text variant="md" pl={8}>
                Password Changed
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
          </>
        ) : (
          isLinkValid && (
            <>
              <Title order={2} variant="xl">
                Reset Password
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
                  {errors.map((err) => (
                    <div key={err.field}>
                      <Text>* {err.description}</Text>
                    </div>
                  ))}
                </Flex>
              )}
              <form onSubmit={form.onSubmit(handleSubmitForm)}>
                <Input autoComplete="username" display="none" />
                <Flex p="32px 0" gap={16} direction="column">
                  <PasswordInput
                    placeholder="Password"
                    {...form.getInputProps('password')}
                    ariaLabel="password"
                    autoComplete="new-password"
                    errorsMessage={form.errors.password}
                    isInValidRulesPassword={!!form.errors.password}
                  />
                  <PasswordInput
                    placeholder="Confirm Password"
                    {...form.getInputProps('confirmPassword')}
                    ariaLabel="confirm password"
                    autoComplete="confirm-password"
                    errorsMessage={form.errors.confirmPassword}
                    isInValidRulesPassword={!!form.errors.confirmPassword}
                  />
                </Flex>
                <Button
                  variant="tertiary"
                  size="md"
                  type="submit"
                  aria-label="confirm password account"
                  disabled={isLoading}
                >
                  Submit
                </Button>
              </form>
            </>
          )
        )}
      </Box>
    </Container>
  );
};
