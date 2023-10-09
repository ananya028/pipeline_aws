import { Anchor, Box, Button, Container, Flex, MantineTheme } from '@mantine/core';
import { KeyboardEvent, ReactElement } from 'react';
import { Link } from 'react-router-dom';

// Constants
import { ROUTES_AUTH } from '@constants';

// Helpers
import { ColorHelper } from '@helpers';

// Hooks
import { useKeyEvent } from '@hooks';
import { PageTitle } from '@components';

interface ProjectLayoutType {
  title: string;
  isButtonDisabled?: boolean;
  handleSubmitForm?: () => void;
  ProjectChild: ReactElement;
  ProjectForm: ReactElement;
}

export const ProjectLayout = ({
  title,
  isButtonDisabled,
  handleSubmitForm,
  ProjectChild,
  ProjectForm,
}: ProjectLayoutType) => {
  const handleRedirect = useKeyEvent<HTMLElement>();

  const handleRedirectProjects = (e: KeyboardEvent<HTMLElement>) => {
    handleRedirect(e, ' ', ROUTES_AUTH.PROJECTS);
  };

  return (
    <Container
      variant="lg"
      className={`${title}-page`}
      aria-label={`${title} page`}
      p="0 15px 50px 15px"
    >
      <Box
        p={{ base: '48px 0' }}
        sx={(theme: MantineTheme) => ({
          borderBottom: `1px solid ${theme.colors.light[2]}`,
        })}
      >
        <Box m="auto" w={{ base: 'min-content', sm: 'fit-content' }}>
          <PageTitle title={title} stepNumber={1} />
          <Flex direction={{ base: 'column', sm: 'row' }} pt="25px" gap="32px">
            <Flex w="420px" gap="20px" direction="column" align={{ base: 'center', sm: 'normal' }}>
              <Box
                w="max-content"
                sx={(theme: MantineTheme) => ({
                  padding: '16px',
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
                {ProjectForm}
              </Box>
            </Flex>

            <Flex gap="15px" direction="column" pt="16px">
              {ProjectChild}
            </Flex>
          </Flex>
        </Box>
      </Box>

      <Flex gap="12px" mt="25px" direction={{ base: 'column', xs: 'row' }}>
        <Anchor
          component={Link}
          to={ROUTES_AUTH.PROJECTS}
          onKeyDown={handleRedirectProjects}
          variant="tertiary"
          aria-label="View home page"
          ta="center"
        >
          Back
        </Anchor>
        <Button
          h="100%"
          variant="tertiary"
          size="md"
          type="submit"
          aria-label="view upload file"
          onClick={handleSubmitForm}
          disabled={isButtonDisabled}
        >
          Next
        </Button>
      </Flex>
    </Container>
  );
};
