import { Anchor, Box, Flex, Image, MantineTheme, Text, useMantineColorScheme } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ChangeEvent, KeyboardEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Helpers
import {
  ColorHelper,
  keyEventEnterSpaceWithFunction,
  keyEventEnterSpaceWithNewTab,
  SessionStoreHelper,
  validateLength,
} from '@helpers';

// Constants
import { ROUTES_AUTH, STORAGE_KEY } from '@constants';

// Contexts
import { ProjectContext } from '@contexts';

// Assets
import { iconNewWindow, iconNewWindowDark } from '@assets';

// Layouts
import { ProjectLayout } from '@layouts';

// Components
import { Checkbox, IconHelpCustom, Input, DarkThemeSuggestions } from '@components';

export const Icon = () => {
  const { colorScheme } = useMantineColorScheme();
  const navigate = useNavigate();
  const { onSetIcon, icon: iconProvider } = useContext(ProjectContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [icon, setIcon] = useState(iconProvider);
  const formInput = useForm({
    initialValues: {
      alt: iconProvider.alt,
      darkTheme: iconProvider.darkTheme,
    },
    validate: {
      alt: (value) => (!icon.isDecorative ? validateLength(value.trim(), 250) : null),
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
    setIcon({ ...icon, [name]: action === 'change' ? checked : !checked });

    if (name === 'isDecorative') {
      formInput.errors.alt = '';
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
    keyEventEnterSpaceWithNewTab(event, process.env.VITE_LINK_ICON!);
  };

  const setDarkTheme = () => icon.darkTheme || 'invertColor';

  const handleDarkTheme = (currentValue: string) => {
    icon.darkTheme = currentValue;
  };

  const handleSubmitForm = () => {
    const errors = formInput.validate();

    if (!errors.hasErrors && !isButtonDisabled) {
      const formValues = {
        ...icon,
        alt: icon.isDecorative ? '' : formInput.values.alt.trim(),
        isDecorative: icon.isDecorative,
        darkTheme: setDarkTheme(),
      };
      onSetIcon(formValues);
      SessionStoreHelper.setComplex(STORAGE_KEY.PROJECT, { icon: formValues });
      navigate(ROUTES_AUTH.UPLOAD_FILE);
    }
  };

  useEffect(() => {
    setIsButtonDisabled(icon.isDecorative ? false : !!formInput.errors.alt);
  }, [icon.isDecorative, formInput.errors.alt]);

  return (
    <>
      <ProjectLayout
        title="Icon"
        isButtonDisabled={isButtonDisabled}
        handleSubmitForm={handleSubmitForm}
        ProjectForm={
          <form onSubmit={formInput.onSubmit(handleSubmitForm)} aria-label="form icon">
            <Text
              variant="xs"
              sx={(theme: MantineTheme) => ({
                fontFamily: theme.other.fonts[0],
              })}
            >
              Preferences
            </Text>
            <Flex gap="5px" align="center" pt="26px">
              <DarkThemeSuggestions defaultValue={setDarkTheme()} onChange={handleDarkTheme} />
            </Flex>

            <Flex align="center" pt="27px">
              <Checkbox
                name="isDecorative"
                checked={icon.isDecorative}
                onKeyDown={handleOnKeyDownCheckBox}
                onChange={handleOnChangeCheckBox}
                label="Decorative"
              />
              <IconHelpCustom
                tooltip={`If your SVG is meant for visual, decorative purposes 
                only and does not convey any other information to the user, 
                you can choose to hide the icon from screen readers.`}
              />
            </Flex>
            <Box p="0px 24px 16px 35px">
              <Flex
                pos="relative"
                align="end"
                direction="column"
                w="fit-content"
                h="90px"
                mt="xs"
                sx={(theme: MantineTheme) => ({
                  opacity: `${
                    icon.isDecorative ? theme.other.opacity.xxs : theme.other.opacity.md
                  }`,
                })}
              >
                <Input
                  autoComplete="off"
                  errorsMessage={formInput.errors.alt}
                  disabled={icon.isDecorative}
                  w={{ base: '200px', xs: '250px', md: '300px', lg: '328px' }}
                  label={
                    <>
                      Alt text
                      <IconHelpCustom
                        disabled={icon.isDecorative}
                        tooltip={`Alt text is a description of an image that 
                        replaces the image when it cannot be loaded by the user. 
                        It is required so that screen readers can convey the 
                        content of the image to the user. Alt text is also 
                        indexed by search engines and improves SEO.`}
                      />
                    </>
                  }
                  placeholder="Ex. Description of icon"
                  aria-label="alt text for image"
                  {...formInput.getInputProps('alt')}
                  sx={(theme: MantineTheme) => ({
                    label: {
                      color: `${ColorHelper.getColorScheme(
                        theme.colorScheme,
                        icon.isDecorative ? theme.colors.dark[0] : theme.colors.light[1],
                        icon.isDecorative ? theme.colors.light[2] : theme.colors.dark[2]
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
                      icon.isDecorative ? theme.colors.dark[0] : theme.colors.light[1],
                      icon.isDecorative ? theme.colors.light[2] : theme.colors.dark[2]
                    )}`,
                  })}
                >
                  {formInput.values.alt.trim().length}/250
                </Text>
              </Flex>
            </Box>
          </form>
        }
        ProjectChild={
          <>
            <Text variant="md">
              Smart SVG™ icons and UI components need special care around alternative text and
              installation.
            </Text>
            <Anchor
              color="primary.0"
              href={process.env.VITE_LINK_ICON}
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
          </>
        }
      />
    </>
  );
};
