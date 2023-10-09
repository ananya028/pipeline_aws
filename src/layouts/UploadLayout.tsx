import { Box, Container, Flex, MantineTheme } from '@mantine/core';
import { ReactElement, ReactNode } from 'react';

export const UploadLayout = ({
  title,
  ChildrenAction,
  children,
}: {
  title: string;
  children: ReactNode;
  ChildrenAction: ReactElement;
}) => (
  <Container
    variant="lg"
    w="max-content"
    className={`${title}-page`}
    aria-label={`${title} page`}
    p="0 15px 50px 15px"
  >
    <Box
      p={{ base: '48px 0' }}
      w="max-content"
      sx={(theme: MantineTheme) => ({
        borderBottom: `1px solid ${theme.colors.light[2]}`,
      })}
    >
      <Box m="auto" w={{ base: 'min-content', sm: 'fit-content' }}>
        {children}
      </Box>
    </Box>

    <Flex gap="12px" mt="25px" direction={{ base: 'column', xs: 'row' }}>
      {ChildrenAction}
    </Flex>
  </Container>
);
