import {
  ActionIcon,
  Box,
  Button,
  ColorInput,
  ColorPicker,
  Flex,
  Image,
  MantineTheme,
  Popover,
  Text,
} from '@mantine/core';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { NamedColorList } from '@types';

// Constants
import { ROUTES_AUTH } from '@constants';

// Components
import { IconHelpCustom, InputColor, DarkThemeSuggestions } from '@components';

// Assets
import { iconClose, iconConfirm, iconEdit, iconZoomIn, iconZoomOut } from '@assets';
import { ColorHelper, keyEventEnterSpaceWithFunction } from '@helpers';
import { useClickOutside } from '@mantine/hooks';

export const PreviewCard = ({
  id,
  title,
  image,
  darkTheme = 'none',
  isReset,
  colors,
  hasCheckbox = true,
  hasPencil = true,
  onChange,
  onResetToDefault,
  onDarkTheme = (_value: string) => {},
  onDarkThemeChange = () => {},
  lockedColors = {},
}: {
  id: string;
  image: string | ArrayBuffer | null;
  title: string;
  hasPencil?: boolean;
  isReset?: boolean;
  darkTheme?: string;
  hasCheckbox?: boolean;
  colors: NamedColorList;
  onChange: (oldColor: string, newColor: string) => void;
  onResetToDefault?: () => void;
  onDarkTheme?: (value: string) => void;
  onDarkThemeChange?: () => void;
  lockedColors?: { [col: string]: boolean };
}) => {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const navigate = useNavigate();
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);
  const [isLinear] = useState<boolean>(false);
  const [colorValue, setColorValue] = useState<string>(hasCheckbox ? '#FFFFFF' : '#000000');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isPopoverOpened, setIsPopoverOpened] = useState<boolean>(false);
  const optionsMenuClickout = useClickOutside(() => setIsPopoverOpened(false));

  /**
   * @description function show hide popup reset changes
   */
  const handleShowHidePopupRestChange = () => {
    setIsPopoverOpened((prev) => !prev);
  };

  /**
   * @description function show hide input change value
   */
  const handleShowHideInputBackground = () => {
    setIsEdit((prev) => !prev);
    setIsColorPickerOpen(false);
  };

  const handleShowHideInputBackgroundKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    keyEventEnterSpaceWithFunction(event, handleShowHideInputBackground);
  };

  /**
   * @description function set default color
   */
  const handleResetDefaultColors = () => {
    if (onResetToDefault) {
      onResetToDefault();
      handleShowHidePopupRestChange();
    }
  };

  /**
   * @description changes dark theme on apply
   */
  const handleDarkThemeChange = () => {
    if (onDarkThemeChange) {
      onDarkThemeChange();
      handleShowHidePopupRestChange();
    }
  };

  const handleFocus = () => {
    setIsColorPickerOpen(true);
  };

  useEffect(() => {
    if (image) {
      const imageElement = document.getElementById(id)!;
      imageElement.innerHTML = image as string;
      const svg = imageElement.querySelector('svg');
      if (svg) {
        svg!.setAttribute('width', '95%');
        svg!.setAttribute('height', '95%');
      }
    } else {
      navigate(ROUTES_AUTH.UPLOAD_FILE);
    }
  }, [image]);

  return (
    <Box
      w={{ base: '320px', xs: '420px' }}
      sx={(theme: MantineTheme) => ({
        borderRadius: '4px',
        border: `1px solid ${theme.colors.dark[0]}`,
        boxShadow: theme.colors.shadow[0],
      })}
    >
      <Box
        className="preview-header"
        p="16px"
        sx={(theme: MantineTheme) => ({
          borderTopLeftRadius: '4px',
          borderTopRightRadius: '4px',
          backgroundColor: theme.colors.light[4],
          borderBottom: `1px solid ${theme.colors.light[2]}`,
        })}
      >
        <Flex ref={optionsMenuClickout} justify="space-between" align="center" h="36px">
          <Text
            variant="xs"
            sx={(theme: MantineTheme) => ({
              color: theme.colors.dark[2],
              fontFamily: theme.other.fonts[0],
            })}
          >
            {title}
          </Text>
          {isReset && (
            <Popover
              position="right-start"
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
                  variant="quaternary"
                  onClick={handleShowHidePopupRestChange}
                  sx={(theme: MantineTheme) => ({
                    svg: {
                      marginLeft: '5px',
                      verticalAlign: 'text-top',
                      color: theme.colors.dark[2],
                    },
                    ':hover': {
                      opacity: theme.other.opacity.md,
                      color: theme.colors.primary[1],
                    },
                  })}
                >
                  Options
                  <IconHelpCustom
                    tooltip="Reset your SVG back to its original state, or use 
                    a verison of your original light svg with inverted colors 
                    or reversed luminosity."
                    color="var(--mantine-color-dark-4)"
                  />
                </Button>
              </Popover.Target>
              <Popover.Dropdown
                p="16px"
                sx={(theme: MantineTheme) => ({
                  width: '190px !important',
                  zIndex: 999,
                  [`@media (min-width: ${theme.breakpoints.xs})`]: {
                    width: 'fit-content !important',
                  },
                  backgroundColor: ColorHelper.getColorScheme(
                    theme.colorScheme,
                    theme.colors.dark[2],
                    theme.colors.light[1]
                  ),
                  button: {
                    display: 'block',
                    width: '100%',
                    fontSize: theme.fontSizes.xxs,
                    padding: '17px 34px',
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
                <DarkThemeSuggestions defaultValue={darkTheme} onChange={onDarkTheme} />
                <Flex justify="space-between" gap="8px" mt="12px">
                  <Button
                    h="100%"
                    variant="primary"
                    size="md"
                    type="button"
                    aria-label="Cancel edit"
                    mt="8px"
                    onClick={handleShowHidePopupRestChange}
                    sx={(theme: MantineTheme) => ({
                      backgroundColor: theme.colors.light[6],
                      color: theme.colors.primary[0],
                      border: `2px solid ${theme.colors.primary[0]}`,
                    })}
                  >
                    Cancel
                  </Button>
                  <Button
                    h="100%"
                    variant="primary"
                    size="md"
                    type="button"
                    aria-label="Apply the change"
                    mt="8px"
                    onClick={handleDarkThemeChange}
                    sx={(theme: MantineTheme) => ({
                      backgroundColor: theme.colors.primary[0],
                      color: theme.colors.light[6],
                      border: `2px solid ${theme.colors.primary[0]}`,
                    })}
                  >
                    Apply
                  </Button>
                </Flex>
                <Button
                  h="100%"
                  variant="primary"
                  size="md"
                  type="submit"
                  mt="8px"
                  aria-label="make the image smart"
                  onClick={handleResetDefaultColors}
                  sx={(theme: MantineTheme) => ({
                    backgroundColor: theme.colors.light[6],
                    color: theme.colors.primary[0],
                    border: `2px solid ${theme.colors.primary[0]}`,
                  })}
                >
                  Reset to Original Colors
                </Button>
              </Popover.Dropdown>
            </Popover>
          )}
        </Flex>

        <TransformWrapper
          initialScale={1}
          initialPositionX={0}
          initialPositionY={0}
          ref={transformComponentRef}
          maxScale={2}
          minScale={0.5}
        >
          {(utils) => (
            <>
              <Flex
                w={{ base: '288px', xs: '388px' }}
                h={{ base: '200px', xs: '300px' }}
                m="10px 0"
                align="center"
                justify="center"
                pos="relative"
                sx={(theme: MantineTheme) => ({
                  borderRadius: '4px',
                  border: `1px solid ${theme.colors.light[2]}`,
                  backgroundColor: `${colorValue}`,
                })}
              >
                <Flex
                  direction="column"
                  gap="8px"
                  pos="absolute"
                  sx={(theme: MantineTheme) => ({
                    zIndex: 99,
                    top: '16px',
                    right: '16px',
                    button: {
                      borderColor: theme.colors.dark[0],
                      backgroundColor: theme.colors.light[1],
                    },
                  })}
                >
                  {/* The number 2 in zoomIn is about 50% */}
                  <ActionIcon
                    aria-label="button zoom in"
                    variant="default"
                    onClick={() => utils.zoomIn(0.5)}
                  >
                    <Image width={20} height={20} src={iconZoomIn} alt="icon zoom in" />
                  </ActionIcon>
                  {/* The number 2 in zoomOut is about 25% */}
                  <ActionIcon
                    aria-label="button zoom out"
                    variant="default"
                    onClick={() => utils.zoomOut(0.25)}
                  >
                    <Image width={20} height={20} src={iconZoomOut} alt="icon zoom out" />
                  </ActionIcon>
                  {/*  The action button is currently unused! */}
                  {/*
                  <ActionIcon
                    aria-label="button apply change for a theme"
                    variant="default"
                    onClick={handleApplyChange}
                  >
                    <Image width={20} height={20} src={iconConfirm} alt="icon zoom in" />
                  </ActionIcon>
                   */}
                </Flex>
                <TransformComponent>
                  <Flex
                    id={id}
                    align="center"
                    justify="center"
                    className="svgClass"
                    w={{ base: '288px', xs: '388px' }}
                    h={{ base: '200px', xs: '300px' }}
                  />
                </TransformComponent>
              </Flex>
            </>
          )}
        </TransformWrapper>

        <Flex justify="space-between" align="center" h="24px">
          <Text
            w={{ base: '130px', xs: 'fit-content' }}
            variant="xs"
            sx={(theme: MantineTheme) => ({
              fontFamily: theme.other.fonts[0],
              color: theme.colors.dark[2],
              svg: {
                marginLeft: '5px',
                verticalAlign: 'text-top',
                color: theme.colors.dark[2],
              },
            })}
          >
            Preview Background
            <IconHelpCustom
              tooltip="The Preview Background will not be included in the Smart SVG™."
              color="var(--mantine-color-dark-4)"
            />
          </Text>
          <Flex w={isEdit ? '160px' : '100px'} justify="space-between" align="center">
            {isEdit ? (
              <>
                <Box pos="relative">
                  <ColorInput
                    w="110px"
                    h="36px"
                    withPicker={false}
                    value={colorValue}
                    variant="primary"
                    aria-label="color background pick"
                    withPreview={false}
                    withEyeDropper={false}
                    onChange={setColorValue}
                    onFocus={handleFocus}
                    styles={(theme: MantineTheme) => ({
                      input: {
                        padding: '6px 17px',
                        backgroundColor: theme.colors.light[1],
                        width: '100%',
                        height: '100%',
                        borderRadius: '4px',
                        border: `1px solid ${theme.colors.dark[0]}`,
                      },
                    })}
                  />
                  {isColorPickerOpen && (
                    <ColorPicker
                      top="40px"
                      pos="absolute"
                      format="hex"
                      value={colorValue}
                      onChange={setColorValue}
                      sx={{ zIndex: 999 }}
                    />
                  )}
                </Box>
                <Image
                  width={20}
                  height={20}
                  src={iconConfirm}
                  alt="icon confirm"
                  onClick={handleShowHideInputBackground}
                  onKeyDown={handleShowHideInputBackgroundKeyDown}
                  tabIndex={0}
                  sx={{
                    cursor: 'pointer',
                  }}
                />
                <Image
                  width={20}
                  height={20}
                  src={iconClose}
                  alt="icon cancel"
                  tabIndex={0}
                  onKeyDown={handleShowHideInputBackgroundKeyDown}
                  onClick={handleShowHideInputBackground}
                  sx={{
                    cursor: 'pointer',
                  }}
                />
              </>
            ) : (
              <>
                <Text variant="md" color="dark.2">
                  {colorValue}
                </Text>
                <Image
                  width={20}
                  height={20}
                  src={iconEdit}
                  alt="icon edit"
                  tabIndex={0}
                  onKeyDown={handleShowHideInputBackgroundKeyDown}
                  onClick={handleShowHideInputBackground}
                  sx={{
                    cursor: 'pointer',
                  }}
                />
              </>
            )}
          </Flex>
        </Flex>
      </Box>

      <Box
        className="preview-body"
        p="25px 16px"
        sx={(theme: MantineTheme) => ({
          borderBottomLeftRadius: '4px',
          borderBottomRightRadius: '4px',
          backgroundColor: theme.colors.light[1],
        })}
      >
        <Flex
          pb="12px"
          sx={(theme: MantineTheme) => ({
            borderBottom: `1px solid ${theme.colors.light[2]}`,
          })}
        >
          <Text
            w={{ base: '60%', xs: '50%' }}
            pl="16px"
            variant="xs"
            sx={(theme: MantineTheme) => ({
              fontFamily: theme.other.fonts[0],
              color: theme.colors.dark[2],
            })}
          >
            Hex Code
          </Text>
          {hasCheckbox && (
            <Text
              w={{ base: '40%', xs: '50%' }}
              variant="xs"
              sx={(theme: MantineTheme) => ({
                fontFamily: theme.other.fonts[0],
                color: theme.colors.dark[2],
                svg: {
                  marginLeft: '5px',
                  verticalAlign: 'text-top',
                  color: theme.colors.dark[2],
                },
              })}
            >
              Lock Color
              <IconHelpCustom
                tooltip="Keeps or locks Light Theme hex colors in place and 
                automatically converts them to your Dark Theme graphic."
                color="var(--mantine-color-dark-4)"
              />
            </Text>
          )}
        </Flex>
        {colors.map((item, index) => {
          if (typeof item[0] === 'string') {
            return (
              <InputColor
                hasPencil={hasPencil}
                hasCheckbox={hasCheckbox}
                isLocked={item[0] in lockedColors && lockedColors[item[0]]}
                key={`solid-${index}`}
                colorName={item[1] as string}
                color={item[0]}
                onChange={(value: string) => {
                  onChange(item[0] as string, value);
                }}
              />
            );
          }

          return (
            <div key={`color-${index}`}>
              <Flex w="100%" p="7px 22px" h={48} gap={20} align="center">
                <Flex w={{ base: '65%', xs: '50%' }}>
                  <Box
                    w="24px"
                    h="24px"
                    sx={(theme: MantineTheme) => ({
                      border: `1px solid ${theme.colors.dark[2]}`,
                      backgroundImage: `linear-gradient(to bottom, ${item.map(([i]) => `${i}`)})`,
                    })}
                  />
                  <Text variant="md" color="dark.2" ml="7px">
                    Gradient
                  </Text>
                </Flex>
                {/* // TODO: Reinstate this once we have a better handling of gradients.
                <Flex w={{ base: '35%', xs: '50%' }} justify="space-between">
                  {hasCheckbox && (
                    <Checkbox
                      indexColor={1}
                      name="linear"
                      checked={isLinear}
                      onChange={handleShowHideLinear}
                      aria-label="show hide edit color"
                    />
                  )}
                  </Flex> */}
              </Flex>
              <Flex w="100%">
                <Flex w="100%" direction="column">
                  {item.map(([i, n], nestedIndex) => (
                    <InputColor
                      hasPencil={hasPencil}
                      hasCheckbox={hasCheckbox}
                      key={`linear-${nestedIndex}`}
                      isLocked={i in lockedColors && lockedColors[i]}
                      colorName={n}
                      color={i}
                      paddingBox="28px"
                      isBorderBottom={false}
                      isLinear={isLinear}
                      onChange={(value: string) => {
                        onChange(i, value);
                      }}
                    />
                  ))}
                </Flex>
              </Flex>
            </div>
          );
        })}
      </Box>
    </Box>
  );
};
