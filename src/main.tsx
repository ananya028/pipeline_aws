import { BrowserRouter } from 'react-router-dom';
import { Container, MantineTheme, Text } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import ReactDOM from 'react-dom/client';

import Hotjar from '@hotjar/browser';

if (process.env.NODE_ENV === 'production' && process.env.VITE_HOTJAR_SITE_ID) {
  const siteId = +process.env.VITE_HOTJAR_SITE_ID;
  const hotjarVersion = 6;
  Hotjar.init(siteId, hotjarVersion);
}

import './assets/styles/main.css';

// Contexts
import {
  ThemeProvider,
  AuthenticationProvider,
  ProjectProvider,
  SvgProvider,
  AppDependenciesContext,
  getDependencies,
} from '@contexts';

// Components
import { ErrorBoundary, GlobalFonts } from '@components';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider>
      <Notifications />
      <GlobalFonts />
      <ErrorBoundary
        fallback={
          <Container
            variant="s"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              variant="xxl"
              sx={(theme: MantineTheme) => ({
                fontWeight: theme.other.fw.bold,
              })}
            >
              Ooop! Something went wrong.
            </Text>
          </Container>
        }
      >
        <AppDependenciesContext.Provider value={getDependencies()}>
          <AuthenticationProvider>
            <ProjectProvider>
              <SvgProvider>
                <App />
              </SvgProvider>
            </ProjectProvider>
          </AuthenticationProvider>
        </AppDependenciesContext.Provider>
      </ErrorBoundary>
    </ThemeProvider>
  </BrowserRouter>
);
