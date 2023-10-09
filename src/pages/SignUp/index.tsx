import { Box, Button, Container, Flex, MantineTheme, Text, TextInput, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { useContext, useState } from 'react';

// Helpers
import { isEmpty, validateConfirmPassword, validateEmail, validatePassword } from '@helpers';

// Constants
import { MESSAGES_ERROR, ROUTES_AUTH } from '@constants';

// Contexts
import { AuthenticationContext } from '@contexts';

// Types
import { FieldValidationError } from '@types';

// Components
import { PasswordInput } from '@components';

interface FormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
}

export const SignUp = () => {
  const navigate = useNavigate();
  const { onSignUp } = useContext(AuthenticationContext);
  const [errors, setErrors] = useState<FieldValidationError[]>([]);
  const form = useForm<FormValues>({
    initialValues: { email: '', password: '', firstName: '', lastName: '', confirmPassword: '' },
    validate: {
      email: validateEmail,
      password: (value) => validatePassword(value, false),
      confirmPassword: (value, values) => validateConfirmPassword(value, values.password),
      firstName: (value) => (isEmpty(value) ? MESSAGES_ERROR.EMPTY : null),
      lastName: (value) => (isEmpty(value) ? MESSAGES_ERROR.EMPTY : null),
    },
  });

  const handleSubmitForm = async () => {
    const response = await onSignUp(form.values);

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

  return (
    <Container variant="s" className="sign-up-page" aria-label="sign up page">
      <Box m="auto" p={{ base: '80px 15px 0 15px' }}>
        <Title order={2} variant="xl">
          Sign Up
        </Title>
        {errors.length > 0 && (
          <Flex
            justify="center"
            mt={15}
            p="10px 15px"
            direction="column"
            sx={(theme: MantineTheme) => ({
              backgroundColor: theme.colors.opacityWarning[0],
              border: `2px solid ${theme.colors.warning[0]}`,
              borderRadius: '4px',
            })}
          >
            {errors.map((error) => (
              <Text key={error.field}>* {error.description}</Text>
            ))}
          </Flex>
        )}
        <form onSubmit={form.onSubmit(handleSubmitForm)} aria-label="form sign up">
          <Flex p="32px 0" gap={16} direction="column">
            <TextInput
              placeholder="Email"
              {...form.getInputProps('email')}
              aria-label="email"
              autoComplete="email"
            />
            <PasswordInput
              placeholder="Password"
              {...form.getInputProps('password')}
              ariaLabel="password"
              autoComplete="current-password"
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
            <TextInput
              placeholder="First Name"
              {...form.getInputProps('firstName')}
              aria-label="first name"
              autoComplete="name"
            />
            <TextInput
              placeholder="Last Name"
              {...form.getInputProps('lastName')}
              aria-label="last name"
              autoComplete="name"
            />
          </Flex>
          <Button variant="tertiary" size="md" type="submit" aria-label="create account">
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
};
