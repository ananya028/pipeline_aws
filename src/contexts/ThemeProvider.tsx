import { useEffect, useState } from 'react';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';

// Utils
import { isDarkTheme } from '@utils';

// Helpers
import { LocalStoreHelper } from '@helpers';

// Constants
import { STORAGE_KEY } from '@constants';

// Theme
import { defaultTheme } from '../themes';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');

  const toggleColorScheme = (value?: ColorScheme) => {
    const themeColor = isDarkTheme(colorScheme) ? 'light' : 'dark';

    LocalStoreHelper.setPrimitive(STORAGE_KEY.THEME, themeColor);
    setColorScheme(value || themeColor);
  };

  const theme = {
    colorScheme,
    ...defaultTheme,
  };

  const initialize = () => {
    const themeColor = LocalStoreHelper.getPrimitive(STORAGE_KEY.THEME);
    setIsInitialized(true);
    if (themeColor) {
      setColorScheme(themeColor as ColorScheme);
    }
  };

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, []);

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS withCSSVariables>
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
