import {
  Box,
  Container,
  Flex,
  MantineTheme,
  Text,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

// Contexts
import { ProjectContext, SvgContext } from '@contexts';

// Constants
import { ROUTES_AUTH } from '@constants';

// Helpers
import { ColorHelper } from '@helpers';

// Components
import { Project } from '@components';

// Images
import {
  projectLogoDark,
  projectLogo,
  projectIcon,
  projectIconDark,
  projectIllustration,
  projectIllustrationDark,
  projectFavicon,
  projectFaviconDark,
} from '@assets';

export const Projects = () => {
  const { colorScheme } = useMantineColorScheme();
  const { onResetProjectsValue } = useContext(ProjectContext);
  const { onResetSvgValues } = useContext(SvgContext);
  const navigate = useNavigate();

  const handleRedirectLogo = () => {
    navigate(ROUTES_AUTH.LOGO);
    onResetProjectsValue();
    onResetSvgValues();
  };

  const handleRedirectIcon = () => {
    navigate(ROUTES_AUTH.ICON);
    onResetProjectsValue();
    onResetSvgValues();
  };

  const handleRedirectIllustration = () => {
    navigate(ROUTES_AUTH.ILLUSTRATIONS);
    onResetProjectsValue();
    onResetSvgValues();
  };

  const handleRedirectFavicon = () => {
    navigate(ROUTES_AUTH.FAVICON);
    onResetProjectsValue();
    onResetSvgValues();
  };

  return (
    <Container
      variant="lg"
      className="projects-page"
      aria-label="projects page"
      p="0 15px 50px 15px"
    >
      <Box
        m="auto"
        p={{ base: '48px 0' }}
        sx={(theme: MantineTheme) => ({ borderBottom: `1px solid ${theme.colors.light[2]}` })}
      >
        <Box>
          <Title order={2} variant="xl">
            New Project
          </Title>
          <Text
            variant="md"
            sx={(theme: MantineTheme) => ({
              fontWeight: theme.other.fw.bold,
              color: ColorHelper.getColorScheme(
                theme.colorScheme,
                theme.colors.cyan[0],
                theme.colors.cyan[2]
              ),
            })}
          >
            Select from one of the project options
          </Text>
        </Box>
        <Flex direction={{ base: 'column', sm: 'row' }} pt="25px" gap="32px">
          <Flex gap="20px" direction="column">
            <Flex
              direction={{ base: 'column', sm: 'row' }}
              gap="20px"
              align={{ base: 'center', sm: 'normal' }}
            >
              <Project
                image={ColorHelper.getColorScheme(colorScheme, projectLogoDark, projectLogo)}
                name="Logo"
                heightImage="87px"
                widthImage="168px"
                tooltip="Smart SVG logos can combine two SVGs into a single 
                file that resizes responsively using a breakpoint. They support 
                dark mode and accessibility features including alternative text 
                and contrast themes."
                onClick={handleRedirectLogo}
              />
              <Project
                image={ColorHelper.getColorScheme(colorScheme, projectIconDark, projectIcon)}
                name="Icon"
                heightImage="67px"
                widthImage="101px"
                tooltip="Smart SVG icons support dark mode and accessibility 
                features including alternative text and contrast themes. They 
                are also SEO-friendly."
                onClick={handleRedirectIcon}
              />
            </Flex>
            <Flex
              direction={{ base: 'column', sm: 'row' }}
              gap="20px"
              align={{ base: 'center', sm: 'normal' }}
            >
              <Project
                image={ColorHelper.getColorScheme(
                  colorScheme,
                  projectIllustrationDark,
                  projectIllustration
                )}
                name="Illustration"
                heightImage="137px"
                widthImage="149px"
                tooltip="Smart SVG illustrations support descriptive 
                alternative text for lengthier explanations of a graphic. They 
                can combine two SVGs into a single file that resizes 
                responsively using a breakpoint. They also support dark mode, 
                and accessibility features including alternative text and 
                contrast themes."
                onClick={handleRedirectIllustration}
              />
              <Project
                image={ColorHelper.getColorScheme(colorScheme, projectFaviconDark, projectFavicon)}
                name="Favicon"
                heightImage="161px"
                widthImage="198px"
                align="flex-end"
                tooltip="Smart SVG favicons support dark mode and contrast 
                themes. We recommend testing your favicon design on light, 
                mid-range, and dark backgrounds."
                onClick={handleRedirectFavicon}
              />
            </Flex>
          </Flex>
          <Flex gap="15px" direction="column">
            <Text variant="md">
              Each Smart SVG&#8482; project will calculate a dark mode version in which you can also
              choose to hand edit the colors. Please upload light mode version only.
            </Text>

            <Text variant="md">
              Note: Dark mode option not recommended for SVGs intended to be used on websites that
              do not have a dark theme.
            </Text>

            <Text variant="md">
              Graphic generated will respond to Windows Contrast Themes/Forced Colors (PC only).
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
};
