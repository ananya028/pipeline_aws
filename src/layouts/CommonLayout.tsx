import { Anchor, Container, MantineTheme } from '@mantine/core';
import { KeyboardEvent } from 'react';
import { Outlet } from 'react-router-dom';

// Helpers
import { keyEventEnterSpace } from '@helpers';

// Components
import { Footer, Header } from '@components';

export const CommonLayout = () => {
  const handleSkipMainContentKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    keyEventEnterSpace(event, '#main');
  };

  return (
    <>
      <Anchor
        href="#main"
        aria-label="skip to main content"
        variant="skipToMainContent"
        onKeyDown={handleSkipMainContentKeyDown}
      >
        Skip to main content
      </Anchor>
      <Header />

      <Container
        id="main"
        role="main"
        sx={(theme: MantineTheme) => ({
          minHeight: `calc(100vh - ${theme.other.headerHeight});`,
        })}
      >
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};
