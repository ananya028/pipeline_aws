import { Anchor, Flex, Image, MantineTheme, Text, useMantineColorScheme } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { KeyboardEvent, useContext, useState } from 'react';

// Components
import { ProjectLayout } from '@layouts';

// Contexts
import { ProjectContext } from '@contexts';

// Assets
import { iconNewWindow, iconNewWindowDark } from '@assets';

// Constants
import { ROUTES_AUTH, STORAGE_KEY } from '@constants';

// Helpers
import { ColorHelper, keyEventEnterSpaceWithNewTab, SessionStoreHelper } from '@helpers';

// Components
import { DarkThemeSuggestions } from '@components';

export const Favicon = () => {
  const { colorScheme } = useMantineColorScheme();
  const navigate = useNavigate();
  const { onSetFavicon, favicon: faviconProvider } = useContext(ProjectContext);
  const [favicon] = useState(faviconProvider);

  const setDarkTheme = () => favicon.darkTheme || 'invertColor';

  const handleDarkTheme = (currentValue: string) => {
    favicon.darkTheme = currentValue;
  };

  const handleSubmitForm = () => {
    const formValues = {
      favicon: true,
      darkTheme: setDarkTheme(),
    };
    onSetFavicon(formValues);
    SessionStoreHelper.setComplex(STORAGE_KEY.PROJECT, { favicon: formValues });
    navigate(ROUTES_AUTH.UPLOAD_FILE);
  };

  const handleRedirectTipsOptimization = (event: KeyboardEvent<HTMLElement>) => {
    keyEventEnterSpaceWithNewTab(event, process.env.VITE_LINK_FAVICON!);
  };

  return (
    <ProjectLayout
      title="Favicon"
      handleSubmitForm={handleSubmitForm}
      ProjectForm={
        <>
          <Text
            variant="xs"
            sx={(theme: MantineTheme) => ({
              fontFamily: theme.other.fonts[0],
            })}
          >
            Features
          </Text>
          <Text
            w={{ base: 'fit-content', sm: '388px' }}
            p={{ base: '16px 8px 16px 0', sm: '16px 0 8px 0' }}
            variant="md"
          >
            Responsive to dark themes and custom colors.
          </Text>
          <Flex gap="5px" align="center" pt="26px">
            <DarkThemeSuggestions defaultValue={setDarkTheme()} onChange={handleDarkTheme} />
          </Flex>
        </>
      }
      ProjectChild={
        <>
          <Anchor
            color="primary.0"
            href={process.env.VITE_LINK_FAVICON}
            target="_blank"
            td="underline"
            onKeyDown={handleRedirectTipsOptimization}
            sx={(theme: MantineTheme) => ({
              color: ColorHelper.getColorScheme(
                theme.colorScheme,
                theme.colors.cyan[0],
                theme.colors.cyan[2]
              ),
              fontSize: theme.fontSizes.xxs,
              fontWeight: theme.other.fw.medium,
              [`@media (min-width: ${theme.breakpoints.lg})`]: {
                fontSize: theme.fontSizes.xs,
              },
            })}
            tabIndex={0}
          >
            Tips for File Optimization
            <Image
              width={16}
              height={16}
              src={ColorHelper.getColorScheme(colorScheme, iconNewWindowDark, iconNewWindow)}
              display="inline-block"
              p="5px"
              sx={{
                verticalAlign: 'top',
              }}
              alt="icon new tab"
            />
          </Anchor>
          <Text variant="md">
            In rare cases, some browsers will not display a Smart SVG™ favicon, resulting in the
            need for a fallback raster image.
          </Text>
        </>
      }
    />
  );
};
