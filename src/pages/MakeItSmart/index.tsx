import {
  Anchor,
  Box,
  Container,
  Flex,
  Image,
  MantineTheme,
  Text,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { ChangeEvent, useEffect, useState, KeyboardEvent, useContext } from 'react';
import { Link } from 'react-router-dom';

import { iconInfoErrorDark, iconInfoErrorLight } from '@assets';
import { Checkbox, RowStatus } from '@components';
import { ROUTES_AUTH, STORAGE_KEY } from '@constants';
import {
  ColorHelper,
  keyEventEnterSpace,
  keyEventEnterSpaceWithFunction,
  keyEventEnterSpaceWithNewTab,
  FileHelpers,
  SessionStoreHelper,
} from '@helpers';

// Hooks
import { useKeyEvent } from '@hooks';
import { getColorScheme } from '@helpers/color';
import { Icon, Logo, Illustration, Favicon } from '@types';
import { SvgContext } from '@contexts';

export const MakeItSmart = () => {
  const [svgFeatures, setSvgFeatures] = useState<string[]>([]);
  const { colorScheme } = useMantineColorScheme();
  const handleRedirect = useKeyEvent();
  const [isFail, setIsFail] = useState<boolean>(false);
  const [disabledButton, setDisabledButton] = useState<boolean>(false);
  const [checkboxLink, setCheckboxLink] = useState<{
    linkDisclaimer: boolean;
    linkInstallation: boolean;
  }>({
    linkDisclaimer: false,
    linkInstallation: false,
  });
  const [svgDownloadUrl, setSvgDownloadUrl] = useState<string>();
  const [isDownloadReady, setIsDownloadReady] = useState(false);

  function buildSvgDownloadUrl() {
    const smartSvg = SessionStoreHelper.getPrimitive(STORAGE_KEY.SMART_SVG);

    if (smartSvg) {
      const downloadUrl = FileHelpers.createDownloadableFile(
        smartSvg,
        'image/svg+xml;charset=utf-8'
      );
      setSvgDownloadUrl(downloadUrl);
      setIsDownloadReady(true);
    }
  }

  function buildProjectFeaturesList() {
    const project = SessionStoreHelper.getComplex<{
      icon?: Icon;
      logo?: Logo;
      illustration?: Illustration;
      favicon?: Favicon;
    }>(STORAGE_KEY.PROJECT);
    const tempFeaturesList = [];

    if (project) {
      tempFeaturesList.push('Dark Mode');

      if (
        project.logo ||
        (project.icon && !project.icon.isDecorative) ||
        (project.illustration && !project.illustration.isDecorative)
      ) {
        tempFeaturesList.push('Alt Text');
      }

      if (project.illustration && project.illustration.description) {
        tempFeaturesList.push('Long Description');
      }

      if (
        (project.logo && project.logo.isResponsive) ||
        (project.illustration && project.illustration.isResponsive)
      ) {
        tempFeaturesList.push('Responsive Resizing');
      }
      tempFeaturesList.push('Contrast Theme Overlay');
    }
    setSvgFeatures(tempFeaturesList);
  }

  function getSvgPreview() {
    const project = useContext(SvgContext);
    let svgPreview: string = '';
    if (project.svgDarkDesktop) {
      svgPreview = project.svgDarkDesktop as string;
    }
    return { __html: svgPreview };
  }

  useEffect(() => {
    buildSvgDownloadUrl();
    buildProjectFeaturesList();
  }, []);

  /**
   * @description function handle get value of checkbox
   *
   * @param {event} e event of input checkbox
   */
  const handleCheckboxLink = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setCheckboxLink((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleKeyDownCheckboxLink = (event: KeyboardEvent<HTMLInputElement>) => {
    keyEventEnterSpaceWithFunction(event, () => {
      const { name, checked } = event.currentTarget;

      setCheckboxLink((prev) => ({
        ...prev,
        [name]: !checked,
      }));
    });
  };

  const handleRedirectDisclaimer = (event: KeyboardEvent<HTMLElement>) => {
    keyEventEnterSpaceWithNewTab(event, process.env.VITE_LINK_DISCLAIMER!);
  };

  const handleRedirectInstallationInstructions = (event: KeyboardEvent<HTMLElement>) => {
    keyEventEnterSpaceWithNewTab(event, process.env.VITE_LINK_INSTALLATION_INSTRUCTIONS!);
  };

  const handleRedirectLearningCenter = (e: KeyboardEvent<HTMLElement>) => {
    keyEventEnterSpace(e, process.env.VITE_LEARNING_CENTER!);
  };

  const handleRedirectUploadFile = (e: KeyboardEvent<HTMLElement>) => {
    handleRedirect(e, ' ', ROUTES_AUTH.UPLOAD_FILE);
  };

  useEffect(() => {
    setIsFail(false); // TODO: set this state when have error from API
    setDisabledButton(!checkboxLink.linkDisclaimer || !checkboxLink.linkInstallation);
  }, [checkboxLink.linkDisclaimer, checkboxLink.linkInstallation]);

  return (
    <Container variant="lg" aria-label="make it smart page" p="0 15px 50px 15px">
      <Box
        p={{ base: '70px 0 40px 0' }}
        sx={(theme: MantineTheme) => ({
          borderBottom: `1px solid ${theme.colors.light[2]}`,
        })}
      >
        <Box m="auto" w={{ base: 'min-content', sm: 'fit-content' }}>
          <Flex direction="column" justify="space-between">
            {isFail ? (
              <Title order={2} variant="xl">
                Error
              </Title>
            ) : (
              <>
                <Title order={2} variant="xl">
                  Download your Smart SVG™
                </Title>
              </>
            )}
          </Flex>
          <Flex direction={{ base: 'column', sm: 'row' }} pt="25px" gap="32px">
            <Flex w="378px" gap="20px" direction="column" justify="space-between">
              {isFail ? (
                <Flex direction="row" gap="8px">
                  <Image
                    width={20}
                    height={20}
                    src={ColorHelper.getColorScheme(
                      colorScheme,
                      iconInfoErrorDark,
                      iconInfoErrorLight
                    )}
                    alt="icon-error"
                    mt={5}
                  />
                  <Box>
                    <Text variant="md">
                      An Error occurred in the Smart SVG™ conversion process and cannot be completed
                    </Text>
                    <br />
                    <Text variant="md">
                      Please try again or visit the Learning Center for more information.
                    </Text>
                  </Box>
                </Flex>
              ) : (
                <>
                  <Flex direction="column" gap="16px" pb={{ base: '30px', sm: 0 }}>
                    {svgFeatures.map((item) => (
                      <RowStatus step={item} />
                    ))}
                  </Flex>

                  <Box>
                    <Flex gap="8px">
                      <Checkbox
                        name="linkDisclaimer"
                        checked={checkboxLink.linkDisclaimer}
                        onChange={handleCheckboxLink}
                        onKeyDown={handleKeyDownCheckboxLink}
                        aria-label="checkbox have read Equivalent’s Disclaimer"
                        label={
                          <>
                            I have read Equivalent’s{' '}
                            <Anchor
                              target="_blank"
                              onKeyDown={handleRedirectDisclaimer}
                              href={process.env.VITE_LINK_DISCLAIMER}
                              td="underline"
                              sx={(theme: MantineTheme) => ({
                                color: getColorScheme(
                                  colorScheme,
                                  theme.colors.cyan[0],
                                  theme.colors.cyan[2]
                                ),
                              })}
                            >
                              Disclaimer
                            </Anchor>
                          </>
                        }
                      />
                    </Flex>
                    <Flex gap="8px" mt="16px">
                      <Checkbox
                        name="linkInstallation"
                        checked={checkboxLink.linkInstallation}
                        onChange={handleCheckboxLink}
                        onKeyDown={handleKeyDownCheckboxLink}
                        aria-label="checkbox have read the Installation Instructions"
                        label={
                          <>
                            I have read the{' '}
                            <Anchor
                              target="_blank"
                              onKeyDown={handleRedirectInstallationInstructions}
                              href={process.env.VITE_LINK_INSTALLATION_INSTRUCTIONS}
                              td="underline"
                              sx={(theme: MantineTheme) => ({
                                color: getColorScheme(
                                  colorScheme,
                                  theme.colors.cyan[0],
                                  theme.colors.cyan[2]
                                ),
                              })}
                            >
                              Installation Instructions
                            </Anchor>
                          </>
                        }
                      />
                    </Flex>
                  </Box>
                </>
              )}
            </Flex>

            <Flex gap="15px" direction="column">
              <Flex
                align="center"
                justify="center"
                dangerouslySetInnerHTML={getSvgPreview()}
                sx={(theme: MantineTheme) => ({
                  svg: {
                    width: '95%',
                    height: '95%',
                    objectFit: 'scale-down',
                  },
                  overflow: 'hidden',
                  borderRadius: '4px',
                  boxShadow: theme.colors.shadow[0],
                  backgroundColor: getColorScheme(
                    colorScheme,
                    theme.colors.dark[4],
                    theme.colors.dark[4]
                  ),
                  border: `1px solid ${theme.colors.dark[0]}`,
                  width: '320px',
                  height: '255px',
                  [`@media (min-width: ${theme.breakpoints.md})`]: {
                    width: '420px',
                    height: '335px',
                  },
                })}
              ></Flex>
            </Flex>
          </Flex>
        </Box>
      </Box>

      <Flex gap="12px" mt="25px" direction={{ base: 'column', sm: 'row' }}>
        {isFail ? (
          <>
            <Anchor
              href={process.env.VITE_LEARNING_CENTER}
              variant="tertiary"
              onKeyDown={handleRedirectLearningCenter}
              aria-label="View learning center page"
              ta="center"
              target="_blank"
            >
              Learning Center
            </Anchor>
            <Anchor
              component={Link}
              to={ROUTES_AUTH.UPLOAD_FILE}
              onKeyDown={handleRedirectUploadFile}
              variant="secondary"
              aria-label="View preview page"
              ta="center"
              sx={(theme: MantineTheme) => ({
                width: '100%',
                [`@media (min-width: ${theme.breakpoints.sm})`]: {
                  width: 'fit-content',
                },
              })}
            >
              Try Again
            </Anchor>
          </>
        ) : (
          <>
            <Anchor
              component={Link}
              to={ROUTES_AUTH.PREVIEW}
              variant="tertiary"
              aria-label="View projects page"
              ta="center"
            >
              Back
            </Anchor>
            <Anchor
              h="100%"
              variant="tertiary"
              size="md"
              className={disabledButton || !isDownloadReady ? 'disabled-anchor' : ''}
              aria-label="download image"
              href={svgDownloadUrl}
              download="smart.svg"
              sx={(theme: MantineTheme) => ({
                textAlign: 'center',
                backgroundColor: ColorHelper.getColorScheme(
                  theme.colorScheme,
                  theme.colors.success[2],
                  theme.colors.success[1]
                ),
                borderColor: ColorHelper.getColorScheme(
                  theme.colorScheme,
                  theme.colors.success[2],
                  theme.colors.success[1]
                ),
                color: ColorHelper.getColorScheme(
                  theme.colorScheme,
                  theme.colors.dark[2],
                  theme.colors.light[1]
                ),
                '&.disabled-anchor': {
                  color: ColorHelper.getColorScheme(
                    theme.colorScheme,
                    theme.colors.dark[2],
                    theme.colors.light[1]
                  ),
                  backgroundColor: ColorHelper.getColorScheme(
                    theme.colorScheme,
                    theme.colors.success[2],
                    theme.colors.success[1]
                  ),
                  borderColor: ColorHelper.getColorScheme(
                    theme.colorScheme,
                    theme.colors.success[2],
                    theme.colors.success[1]
                  ),
                  opacity: theme.other.opacity.xxs,
                  pointerEvents: 'none',
                },
              })}
            >
              Download
            </Anchor>
          </>
        )}
      </Flex>
    </Container>
  );
};
