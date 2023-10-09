import { useNavigate } from 'react-router-dom';
import { ChangeEvent, KeyboardEvent, useContext, useEffect, useState } from 'react';
import { Anchor, Box, Flex, Image, MantineTheme, Text, useMantineColorScheme } from '@mantine/core';
import { useForm } from '@mantine/form';
// Constants
import { MESSAGES_ERROR, ROUTES_AUTH, STORAGE_KEY } from '@constants';

// Contexts
import { ProjectContext } from '@contexts';

// Helpers
import {
  avoidCharacterInputNumber,
  ColorHelper,
  keyEventEnterSpaceWithFunction,
  keyEventEnterSpaceWithNewTab,
  SessionStoreHelper,
  validateLength,
} from '@helpers';

// Images
import { iconNewWindow, iconNewWindowDark } from '@assets';

// Components
import { Checkbox, IconHelpCustom, Input, DarkThemeSuggestions } from '@components';
import { ProjectLayout } from '@layouts';

export interface DarkThemeSuggestionsType {
  label?: string;
  name?: string;
  indexColor?: number;
  enableDarkMode?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface CheckboxType {
  darkTheme: string;
  darkThemeMobile: string;
  isResponsive: boolean;
  hasAltText: boolean;
}

export interface InputType {
  alt: string;
  breakpoint: string;
  darkTheme: string;
}

export const Logo = () => {
  const { colorScheme } = useMantineColorScheme();
  const navigate = useNavigate();
  const { onSetLogo, logo: logoProvider } = useContext(ProjectContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [logo, setLogo] = useState<CheckboxType>(logoProvider);
  const formInput = useForm<InputType>({
    initialValues: {
      alt: logoProvider.alt,
      breakpoint: logoProvider.breakpoint,
      darkTheme: logoProvider.darkTheme,
    },
    validate: {
      alt: (value) => validateLength(value.trim(), 250),
      breakpoint: (value) => (logo.isResponsive && !value ? MESSAGES_ERROR.EMPTY : null),
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
    setLogo({ ...logo, [name]: action === 'change' ? checked : !checked });

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
    keyEventEnterSpaceWithNewTab(event, process.env.VITE_LINK_LOGO!);
  };

  const setDarkTheme = () => logo.darkTheme || 'invertColor';

  const setDarkThemeMobile = () => logo.darkThemeMobile || logo.darkTheme || 'invertColor';

  const handleDarkTheme = (currentValue: string) => {
    logo.darkTheme = currentValue;
    logo.darkThemeMobile = currentValue;
  };

  const handleSubmitForm = () => {
    const errors = formInput.validate();

    if (!errors.hasErrors && !isButtonDisabled) {
      const formValues = {
        ...logo,
        alt: formInput.values.alt.trim(),
        breakpoint: logo.isResponsive ? formInput.values.breakpoint : '',
        darkTheme: setDarkTheme(),
        darkThemeMobile: setDarkThemeMobile(),
      };

      onSetLogo(formValues);
      SessionStoreHelper.setComplex(STORAGE_KEY.PROJECT, { logo: formValues });
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
    setIsButtonDisabled(!!formInput.errors.alt || !!formInput.errors.breakpoint);
  }, [formInput.errors.alt, formInput.errors.breakpoint]);

  return (
    <ProjectLayout
      title="Logo"
      isButtonDisabled={isButtonDisabled}
      handleSubmitForm={handleSubmitForm}
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
          <Flex align="center" pt="16px">
            <DarkThemeSuggestions defaultValue={setDarkTheme()} onChange={handleDarkTheme} />
          </Flex>
          <Flex align="center" pt="30px">
            <Checkbox
              name="hasAltText"
              checked
              disabled
              onChange={handleOnChangeCheckBox}
              label="Alt Text, Company Name"
            />
            <IconHelpCustom
              tooltip={`For logo Alt Text, we recommend your company or organization 
                name followed by the word "logo"`}
            />
          </Flex>

          <Box p="5px 24px 20px 35px">
            <Flex pos="relative" gap="5px" align="end" direction="column" w="fit-content" h="68px">
              <Input
                ariaLabel="input alt"
                autoComplete="off"
                errorsMessage={formInput.errors.alt}
                onKeyDown={handleOnKeyDown}
                w={{ base: '200px', xs: '250px', md: '300px', lg: '328px' }}
                placeholder="Ex. Company Name logo"
                {...formInput.getInputProps('alt')}
              />
              <Text
                pos="absolute"
                sx={(theme: MantineTheme) => ({
                  marginTop: '5px',
                  top: '38px',
                  fontSize: theme.fontSizes.xxs,
                })}
              >
                {formInput.values.alt.trim().length}/250
              </Text>
            </Flex>
          </Box>

          <Flex align="center">
            <Checkbox
              label="Responsive"
              name="isResponsive"
              checked={logo.isResponsive}
              onChange={handleOnChangeCheckBox}
              onKeyDown={handleOnKeyDownCheckBox}
            />

            <IconHelpCustom
              tooltip="Enter the breakpoint width (in pixels) at 
            which your website content changes to a mobile version."
            />
          </Flex>

          <Box p="5px 24px 9px 35px">
            <Flex pos="relative" gap="5px" align="end" direction="column" w="fit-content" h="68px">
              <Input
                autoComplete="off"
                errorsMessage={formInput.errors.breakpoint}
                disabled={!logo.isResponsive}
                type="number"
                onKeyDown={handleIntegersOnly}
                w={{ base: '200px', xs: '250px', md: '300px', lg: '328px' }}
                placeholder="Ex. 480"
                ariaLabel="responsive for image"
                {...formInput.getInputProps('breakpoint')}
              />
              <Text
                pos="absolute"
                sx={(theme: MantineTheme) => ({
                  marginTop: '5px',
                  top: '38px',
                  fontSize: theme.fontSizes.xxs,
                  color: `${ColorHelper.getColorScheme(
                    theme.colorScheme,
                    !logo.isResponsive ? theme.colors.dark[0] : theme.colors.light[1],
                    !logo.isResponsive ? theme.colors.light[2] : theme.colors.dark[2]
                  )}`,
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
            Make sure you have a dark theme installed on your website before installing your Smart
            SVG™ with dark theme option.
          </Text>
          <Anchor
            color="primary.0"
            href={process.env.VITE_LINK_LOGO}
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
              width="16px"
              height="16px"
              src={ColorHelper.getColorScheme(colorScheme, iconNewWindowDark, iconNewWindow)}
              display="inline-block"
              p="5px"
              alt="icon new tab"
              sx={{
                verticalAlign: 'top',
              }}
            />
          </Anchor>
          <Text variant="md">Alt Text is required for Logos.</Text>
        </>
      }
    />
  );
};
