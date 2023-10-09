import { Anchor, Box, Flex, Image, MantineTheme, Text, useMantineColorScheme } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ChangeEvent, KeyboardEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Contexts
import { ProjectContext } from '@contexts';

// Constants
import { MESSAGES_ERROR, ROUTES_AUTH, STORAGE_KEY } from '@constants';

// Helpers
import {
  avoidCharacterInputNumber,
  ColorHelper,
  keyEventEnterSpaceWithFunction,
  keyEventEnterSpaceWithNewTab,
  SessionStoreHelper,
  validateLength,
} from '@helpers';

// Assets
import { iconNewWindow, iconNewWindowDark } from '@assets';

// Components
import { Checkbox, IconHelpCustom, Input, DarkThemeSuggestions } from '@components';
import { ProjectLayout } from '@layouts';

export const Illustration = () => {
  const { colorScheme } = useMantineColorScheme();
  const navigate = useNavigate();
  const { onSetIllustration, illustration: illustrationProvider } = useContext(ProjectContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [illustration, setIllustration] = useState(illustrationProvider);
  const formInput = useForm({
    initialValues: {
      alt: illustrationProvider.alt,
      description: illustrationProvider.description,
      breakpoint: illustrationProvider.breakpoint,
      darkTheme: illustrationProvider.darkTheme,
    },
    validate: {
      alt: (value) => (!illustration.isDecorative ? validateLength(value.trim(), 250) : null),
      breakpoint: (value) => (illustration.isResponsive && !value ? MESSAGES_ERROR.EMPTY : null),
    },
  });

  /**
   * @description function handle event onchange of checkbox
   *
   * @param {Event} e is event of checkbox
   */
  const handleCheckBox = (
    event: ChangeEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>,
    action: 'change' | 'keyDown'
  ) => {
    const { checked, name } = event.currentTarget;
    setIllustration({ ...illustration, [name]: action === 'change' ? checked : !checked });

    if (name === 'isDecorative') {
      formInput.errors.alt = '';
      return;
    }

    if (name === 'isResponsive') {
      formInput.errors.breakpoint = '';
    }
  };

  const handleOnChangeCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    handleCheckBox(event, 'change');
  };

  const handleOnKeyDownCheckBox = (event: KeyboardEvent<HTMLInputElement>) => {
    keyEventEnterSpaceWithFunction(event, () => {
      handleCheckBox(event, 'keyDown');
    });
  };

  const handleRedirectTipsOptimization = (event: KeyboardEvent<HTMLElement>) => {
    keyEventEnterSpaceWithNewTab(event, process.env.VITE_LINK_ILLUSTRATION!);
  };

  const setDarkTheme = () => illustration.darkTheme || 'invertColor';

  const setDarkThemeMobile = () =>
    illustration.darkThemeMobile || illustration.darkTheme || 'invertColor';

  const handleDarkTheme = (currentValue: string) => {
    illustration.darkTheme = currentValue;
    illustration.darkThemeMobile = currentValue;
  };

  const handleSubmitForm = () => {
    const errors = formInput.validate();

    if (!errors.hasErrors && !isButtonDisabled) {
      const formValues = {
        ...illustration,
        alt: illustration.isDecorative ? '' : formInput.values.alt.trim(),
        description: illustration.isDecorative ? '' : formInput.values.description.trim(),
        breakpoint: illustration.isResponsive ? formInput.values.breakpoint : '',
        isDecorative: illustration.isDecorative,
        darkTheme: setDarkTheme(),
        darkThemeMobile: setDarkThemeMobile(),
      };

      onSetIllustration(formValues);
      SessionStoreHelper.setComplex(STORAGE_KEY.PROJECT, { illustration: formValues });
      navigate(ROUTES_AUTH.UPLOAD_FILE);
    }
  };

  function validate(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      formInput.validate();
      handleSubmitForm();
    }
  }

  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    validate(event);
  };

  const handleIntegersOnly = (event: KeyboardEvent<HTMLInputElement>) => {
    avoidCharacterInputNumber(event);
    validate(event);
  };

  useEffect(() => {
    setIsButtonDisabled(Object.values(formInput.errors).some((error) => !!error));
  }, [
    illustration.isDecorative,
    illustration.isResponsive,
    formInput.errors.alt,
    formInput.errors.description,
    formInput.errors.breakpoint,
  ]);

  return (
    <>
      <ProjectLayout
        title="Illustration"
        handleSubmitForm={handleSubmitForm}
        isButtonDisabled={isButtonDisabled}
        ProjectForm={
          <form onSubmit={formInput.onSubmit(handleSubmitForm)} aria-label="form logo">
            <Text
              variant="xs"
              sx={(theme: MantineTheme) => ({
                fontFamily: theme.other.fonts[0],
              })}
            >
              Preferences
            </Text>
            <Flex gap="5px" align="center" pt="16px">
              <DarkThemeSuggestions defaultValue={setDarkTheme()} onChange={handleDarkTheme} />
            </Flex>

            <Flex align="center" pt="20px">
              <Checkbox
                name="isDecorative"
                checked={illustration.isDecorative}
                onChange={handleOnChangeCheckBox}
                onKeyDown={handleOnKeyDownCheckBox}
                label="Decorative"
              />
              <IconHelpCustom
                tooltip={`If your SVG is meant for visual, decorative purposes 
                only and does not convey any other information to the user, 
                you can choose to hide the icon from screen readers.`}
              />
            </Flex>
            <Box
              p="0px 24px 8px 35px"
              sx={(theme: MantineTheme) => ({
                opacity: `${
                  illustration.isDecorative ? theme.other.opacity.xxs : theme.other.opacity.md
                }`,
              })}
            >
              <Flex pos="relative" gap="5px" align="end" direction="column" w="fit-content" mt="xs">
                <Input
                  autoComplete="off"
                  errorsMessage={formInput.errors.alt}
                  onKeyDown={handleOnKeyDown}
                  disabled={illustration.isDecorative}
                  w={{ base: '200px', xs: '250px', md: '300px', lg: '328px' }}
                  label={
                    <>
                      Alt text
                      <IconHelpCustom
                        disabled={illustration.isDecorative}
                        tooltip={`Alt text is a description of an image that 
                        replaces the image when it cannot be loaded by the 
                        user. It is required so that screen readers can convey 
                        the content of the image to the user. Alt text is also 
                        indexed by search engines and improves SEO.`}
                      />
                    </>
                  }
                  placeholder="Ex. Description of illustration"
                  ariaLabel="alt text for image"
                  {...formInput.getInputProps('alt')}
                  sx={(theme: MantineTheme) => ({
                    label: {
                      color: `${ColorHelper.getColorScheme(
                        theme.colorScheme,
                        illustration.isDecorative ? theme.colors.dark[0] : theme.colors.light[1],
                        illustration.isDecorative ? theme.colors.light[2] : theme.colors.dark[2]
                      )}`,
                    },
                  })}
                />
                <Text
                  pos="absolute"
                  sx={(theme: MantineTheme) => ({
                    fontSize: theme.fontSizes.xxs,
                    marginTop: '5px',
                    top: '65px',
                    color: `${ColorHelper.getColorScheme(
                      theme.colorScheme,
                      illustration.isDecorative ? theme.colors.dark[0] : theme.colors.light[1],
                      illustration.isDecorative ? theme.colors.light[2] : theme.colors.dark[2]
                    )}`,
                  })}
                >
                  {formInput.values.alt.trim().length}/250
                </Text>
              </Flex>

              <Flex align="end" direction="column" w="fit-content">
                <Input
                  errorsMessage={formInput.errors.description}
                  onKeyDown={handleOnKeyDown}
                  disabled={illustration.isDecorative}
                  mt="xs"
                  w={{ base: '200px', xs: '250px', md: '300px', lg: '328px' }}
                  label={
                    <>
                      Long Description (Optional){'  '}
                      <IconHelpCustom
                        disabled={illustration.isDecorative}
                        tooltip={`Graphics that contain essential information 
                        that can't be conveyed in a short phrase or sentence 
                        can use a long description to provide additional 
                        information when the alt text is not enough.`}
                      />
                    </>
                  }
                  placeholder="Ex: Further information"
                  {...formInput.getInputProps('firstName')}
                  ariaLabel="description for image"
                  autoComplete="name"
                  {...formInput.getInputProps('description')}
                  sx={(theme: MantineTheme) => ({
                    label: {
                      color: `${ColorHelper.getColorScheme(
                        theme.colorScheme,
                        illustration.isDecorative ? theme.colors.dark[0] : theme.colors.light[1],
                        illustration.isDecorative ? theme.colors.light[2] : theme.colors.dark[2]
                      )}`,
                    },
                  })}
                />

                <Text
                  sx={(theme: MantineTheme) => ({
                    fontSize: theme.fontSizes.xxs,
                    color: `${ColorHelper.getColorScheme(
                      theme.colorScheme,
                      illustration.isDecorative ? theme.colors.dark[0] : theme.colors.light[1],
                      illustration.isDecorative ? theme.colors.light[2] : theme.colors.dark[2]
                    )}`,
                  })}
                >
                  {formInput.values.description.trim().length}/2000
                </Text>
              </Flex>
            </Box>

            <Flex align="center">
              <Checkbox
                label="Responsive"
                name="isResponsive"
                checked={illustration.isResponsive}
                onChange={handleOnChangeCheckBox}
                onKeyDown={handleOnKeyDownCheckBox}
              />
              <IconHelpCustom
                tooltip={`Enter the breakpoint width (in pixels) at which your 
                website content changes to a mobile version.`}
              />
            </Flex>
            <Box p="5px 24px 9px 35px">
              <Flex
                pos="relative"
                gap="5px"
                align="end"
                direction="column"
                w="fit-content"
                h="68px"
              >
                <Input
                  autoComplete="off"
                  errorsMessage={formInput.errors.breakpoint}
                  disabled={!illustration.isResponsive}
                  onKeyDown={handleIntegersOnly}
                  type="number"
                  w={{ base: '200px', xs: '250px', md: '300px', lg: '328px' }}
                  ariaLabel="input breakpoint"
                  placeholder="Ex. 480"
                  {...formInput.getInputProps('breakpoint')}
                />
                <Text
                  pos="absolute"
                  sx={(theme: MantineTheme) => ({
                    fontSize: theme.fontSizes.xxs,
                    marginTop: '5px',
                    top: '52px',
                  })}
                >
                  Breakpoint (px)
                </Text>
              </Flex>
            </Box>
          </form>
        }
        ProjectChild={
          <>
            <Text variant="md">
              Illustrations can have both an alt text and a longer description.
            </Text>
            <Anchor
              color="primary.0"
              href={process.env.VITE_LINK_ILLUSTRATION}
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
                alt="icon new tab"
                sx={{
                  verticalAlign: 'top',
                }}
              />
            </Anchor>
            <Text variant="md">
              For wider graphics we recommend designing a vertical version to reduce the need to
              pinch and zoom on mobile.
            </Text>
          </>
        }
      />
    </>
  );
};
