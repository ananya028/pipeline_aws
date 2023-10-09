import { Anchor, Button, Flex, Text } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';

// Constants
import { ROUTES_AUTH, STORAGE_KEY } from '@constants';

// Contexts
import { ProjectContext, SvgContext } from '@contexts';

// Helpers
import { SessionStoreHelper } from '@helpers';

// Components
import { PageTitle, PreviewCard } from '@components';
import { UploadLayout } from '@layouts';
import { Favicon, Icon, Illustration, Logo, MakeItSmartInput } from '@types';

export const Preview = () => {
  const navigate = useNavigate();
  const [inversionTheme, setInversionTheme] = useState<string>('');
  const [inversionThemeMobile, setInversionThemeMobile] = useState<string>('');
  // const [isPopoverOpened, setIsPopoverOpened] = useState<boolean>(false);

  const { onCheckProjectSelected, logo, illustration } = useContext(ProjectContext);

  const {
    svgLightDesktop,
    svgDarkDesktop,
    svgLightMobile,
    svgDarkMobile,
    onChangeImageMobileColor,
    onChangeImageDesktopColor,
    onColorLockMobile,
    onColorLockDesktop,
    onResetDefaultColorsMobile,
    onResetDefaultColorsDesktop,
    onChangeDarkThemeDesktop,
    onChangeDarkThemeMobile,
    colorDark,
    colorLight,
    colorDarkMobile,
    colorLightMobile,
    // onApplyChangesToMobile,
    // matchColorDeskTopMobile,
    onMakeSmartSvg,
    colorLockDesktop,
    colorLockMobile,
  } = useContext(SvgContext);

  // TODO: Adapt the reset methods.
  /**
   * @description function set default value for dark theme
   */
  const handleResetToDefault = () => {
    onResetDefaultColorsDesktop();
  };

  /**
   * @description function set default value for dark theme mobile
   */
  const handleResetToDefaultMobile = () => {
    onResetDefaultColorsMobile();
  };

  /**
   * @description function show hide popup apply desktop to mobile
   */
  // const handleShowHidePopupApplyDesktop = () => {
  //   setIsPopoverOpened((prev) => !prev);
  // };

  /**
   * @description function apply change from desktop to mobile
   */
  // const handleApplyDesktopChange = () => {
  //   handleShowHidePopupApplyDesktop();
  // };

  /**
   * @description function apply change from desktop to mobile
   */
  const handleDarkTheme = (value: string) => {
    setInversionTheme(value);
  };

  /**
   * @description function apply change from desktop to mobile
   */
  const handleDarkThemeMobile = (value: string) => {
    setInversionThemeMobile(value);
  };

  // TODO: These two methods are very awkward. We need to move away from
  //       local/sessionStorage for project handling or at least use a flat
  //       structure!
  const getDarkTheme = (mobile = false) => {
    const project = SessionStoreHelper.getComplex<{
      icon?: Icon;
      logo?: Logo;
      illustration?: Illustration;
      favicon?: Favicon;
    }>(STORAGE_KEY.PROJECT);
    if (!project) {
      return 'none';
    }
    const mobProject = project.illustration || project.logo;
    if (mobProject) {
      return (mobile ? mobProject.darkThemeMobile : mobProject.darkTheme) || 'none';
    }
    const iconProject = project.icon || project.favicon;
    return iconProject ? iconProject.darkTheme : 'none';
  };

  const setDarkTheme = (value: string, mobile = false) => {
    const project = SessionStoreHelper.getComplex<{
      icon?: Icon;
      logo?: Logo;
      illustration?: Illustration;
      favicon?: Favicon;
    }>(STORAGE_KEY.PROJECT);
    if (!project) {
      return;
    }
    const values = onCheckProjectSelected() as unknown as { [key: string]: string | boolean };
    if (!values || !values.darkTheme) {
      return;
    }
    if (mobile) {
      values.darkThemeMobile = value;
    } else {
      values.darkTheme = value;
    }
    if (project.icon) {
      SessionStoreHelper.setComplex(STORAGE_KEY.PROJECT, { icon: values });
    }
    if (project.favicon) {
      SessionStoreHelper.setComplex(STORAGE_KEY.PROJECT, { favicon: values });
    }
    if (project.logo) {
      SessionStoreHelper.setComplex(STORAGE_KEY.PROJECT, { logo: values });
    }
    if (project.illustration) {
      SessionStoreHelper.setComplex(STORAGE_KEY.PROJECT, { illustration: values });
    }
  };

  const handleDarkThemeChange = () => {
    setDarkTheme(inversionTheme);
    onChangeDarkThemeDesktop();
  };

  const handleDarkThemeChangeMobile = () => {
    setDarkTheme(inversionThemeMobile, true);
    onChangeDarkThemeMobile();
  };

  // TODO: consider moving this to onload of smart SVG download page
  async function handleMakeItSmart() {
    const payload: MakeItSmartInput = { lightSvg: { desktop: svgLightDesktop as string } };

    const project = SessionStoreHelper.getComplex<{
      icon?: Icon;
      logo?: Logo;
      illustration?: Illustration;
      favicon?: Favicon;
    }>(STORAGE_KEY.PROJECT);

    if (project) {
      if (project.logo) {
        if (project.logo.isResponsive) {
          payload.lightSvg.mobile = svgLightMobile as string;
          payload.breakpoint = parseInt(project.logo.breakpoint, 10);
        }

        // TODO: this is temporary, ideally the condition should be
        //      if (project.logo.isDarkTheme)
        //      Will fix this when preprocessors are applied correctly (on the light mode SVG)
        if (svgDarkDesktop) {
          payload.darkSvg = { desktop: svgDarkDesktop as string };

          if (project.logo.isResponsive) {
            payload.darkSvg.mobile = svgDarkMobile as string;
          }
        }
      }

      if (project.illustration) {
        if (project.illustration.isResponsive) {
          payload.lightSvg.mobile = svgLightMobile as string;
          payload.breakpoint = parseInt(project.illustration.breakpoint, 10);
        }

        // TODO: this is temporary, ideally the condition should be
        //      if (project.illustration.isDarkTheme)
        //      Will fix this when preprocessors are applied correctly (on the light mode SVG)
        if (svgDarkDesktop) {
          payload.darkSvg = { desktop: svgDarkDesktop as string };

          if (project.illustration.isResponsive) {
            payload.darkSvg.mobile = svgDarkMobile as string;
          }
        }
      }

      if (project.icon && svgDarkDesktop) {
        payload.darkSvg = { desktop: svgDarkDesktop as string };
      }

      if (project.favicon && svgDarkDesktop) {
        payload.darkSvg = { desktop: svgDarkDesktop as string };
      }
    }
    const smartSvg = await onMakeSmartSvg(payload);

    if (smartSvg) {
      SessionStoreHelper.setPrimitive(STORAGE_KEY.SMART_SVG, smartSvg);
      navigate(ROUTES_AUTH.MAKE_IT_SMART);
    }
  }

  return (
    <UploadLayout
      title="Preview"
      ChildrenAction={
        <>
          <Anchor
            component={Link}
            to={ROUTES_AUTH.UPLOAD_FILE}
            variant="tertiary"
            aria-label="View upload page"
            ta="center"
          >
            Back
          </Anchor>
          <Button
            h="100%"
            variant="tertiary"
            size="md"
            type="submit"
            aria-label="make the image smart"
            onClick={handleMakeItSmart}
          >
            Make It Smart
          </Button>
        </>
      }
    >
      <PageTitle title="Preview" stepNumber={3} />
      {(logo.isResponsive || illustration.isResponsive) && (
        <Text variant="lg" mt="xl">
          Desktop
        </Text>
      )}
      <Flex direction="column" pt="25px" gap="15px">
        <Flex gap="20px" direction={{ base: 'column', md: 'row' }}>
          <PreviewCard
            id="light-theme-desktop"
            hasPencil={false}
            image={svgLightDesktop}
            colors={colorLight}
            title="Light Theme"
            onChange={onColorLockDesktop}
            lockedColors={colorLockDesktop}
          />
          <PreviewCard
            id="dark-theme-desktop"
            image={svgDarkDesktop}
            hasCheckbox={false}
            colors={colorDark}
            title="Dark Theme"
            darkTheme={getDarkTheme()}
            isReset
            onResetToDefault={handleResetToDefault}
            onChange={onChangeImageDesktopColor}
            onDarkTheme={handleDarkTheme}
            onDarkThemeChange={handleDarkThemeChange}
            lockedColors={colorLockDesktop}
          />
        </Flex>

        {(logo.isResponsive || illustration.isResponsive) && (
          <>
            {/* {matchColorDeskTopMobile.length > 0 && (
              <Box>
                <Popover
                  position="left-start"
                  withArrow
                  shadow="md"
                  offset={25}
                  arrowOffset={19}
                  opened={isPopoverOpened}
                  styles={(theme: MantineTheme) => ({
                    dropdown: {
                      borderRadius: '4px',
                      border: `1px solid ${theme.colors.dark[0]}`,
                    },
                    arrow: {
                      borderColor: theme.colors.dark[0],
                    },
                  })}
                >
                  <Popover.Target>
                    <Button
                      variant="secondary"
                      onClick={handleShowHidePopupApplyDesktop}
                      sx={(theme: MantineTheme) => ({
                        fontFamily: theme.other.fonts[1],
                        fontSize: theme.fontSizes.xs,
                        fontWeight: theme.other.fw.regular,
                        textDecoration: 'underline',
                        color: ColorHelper.getColorScheme(
                          theme.colorScheme,
                          theme.colors.cyan[0],
                          theme.colors.cyan[2]
                        ),
                      })}
                    >
                      Apply Desktop Changes to Mobile
                    </Button>
                  </Popover.Target>
                  <Popover.Dropdown
                    p="16px"
                    sx={(theme: MantineTheme) => ({
                      width: '190px !important',
                      [`@media (min-width: ${theme.breakpoints.xs})`]: {
                        width: 'fit-content !important',
                      },
                      button: {
                        width: '100%',
                        fontSize: theme.fontSizes.xxs,
                        padding: '17px 11px',
                        span: {
                          textAlign: 'center',
                          whiteSpace: 'pre-wrap',
                        },
                        [`@media (min-width: ${theme.breakpoints.xs})`]: {
                          fontSize: theme.fontSizes.xs,
                        },
                      },
                    })}
                  >
                    <Button
                      h="100%"
                      variant="primary"
                      size="md"
                      type="button"
                      aria-label="apply change for image"
                      onClick={handleShowHidePopupApplyDesktop}
                      sx={(theme: MantineTheme) => ({
                        color: theme.colors.cyan[2],
                        borderColor: theme.colors.cyan[2],
                        backgroundColor: theme.colors.none[0],
                      })}
                    >
                      Cancel
                    </Button>

                    <Button
                      h="100%"
                      variant="tertiary"
                      size="md"
                      type="submit"
                      mt="18px"
                      aria-label="make the image smart"
                      onClick={handleApplyDesktopChange}
                      sx={(theme: MantineTheme) => ({
                        color: theme.colors.light[1],
                        backgroundColor: theme.colors.primary[0],
                      })}
                    >
                      Apply Desktop Changes
                    </Button>
                  </Popover.Dropdown>
                </Popover>
              </Box>
            )} */}

            <Text variant="lg" mt="sm">
              Mobile
            </Text>
            <Flex gap="20px" direction={{ base: 'column', md: 'row' }}>
              <PreviewCard
                id="light-theme-mobile"
                hasPencil={false}
                image={svgLightMobile}
                title="Light Theme"
                colors={colorLightMobile}
                onChange={onColorLockMobile}
                lockedColors={colorLockMobile}
              />
              <PreviewCard
                id="dark-theme-mobile"
                image={svgDarkMobile}
                hasCheckbox={false}
                title="Dark Theme"
                colors={colorDarkMobile}
                darkTheme={getDarkTheme(true)}
                isReset
                onChange={onChangeImageMobileColor}
                onResetToDefault={handleResetToDefaultMobile}
                onDarkTheme={handleDarkThemeMobile}
                onDarkThemeChange={handleDarkThemeChangeMobile}
                lockedColors={colorLockMobile}
              />
            </Flex>
          </>
        )}
      </Flex>
    </UploadLayout>
  );
};
