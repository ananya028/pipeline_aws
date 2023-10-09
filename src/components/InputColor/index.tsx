import { Box, ColorInput, ColorPicker, Flex, Image, MantineTheme, Text } from '@mantine/core';
import { KeyboardEvent, useEffect, useState } from 'react';

// Components
import { Checkbox } from '@components';

// Assets
import { iconClose, iconConfirm, iconEdit } from '@assets';
import { keyEventEnterSpaceWithFunction } from '@helpers';

export const InputColor = ({
  paddingBox = '0px',
  isBorderBottom = true,
  color,
  colorName,
  isLinear,
  hasPencil,
  hasCheckbox,
  isLocked,
  onChange,
}: {
  isLinear?: boolean;
  isBorderBottom?: boolean;
  hasCheckbox?: boolean;
  paddingBox?: string;
  hasPencil?: boolean;
  color: string;
  colorName: string;
  isLocked: boolean;
  onChange: (value: string) => void;
}) => {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(isLocked);
  const [colorValue, setColorValue] = useState<string>('');

  useEffect(() => {
    setIsChecked(isLocked);
  }, [isLocked]);

  /**
   * @description function show hide confirm edit
   */
  const handleLockColor = () => {
    setIsEdit((prev) => !prev);
  };

  const handleLockColorKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    keyEventEnterSpaceWithFunction(event, handleLockColor);
  };

  /**
   * @description function show hide edit pen
   */
  const handleShowHideEditPen = () => {
    setIsChecked((prev) => !prev);
    onChange(colorValue);
    if (colorValue) {
      onChange(colorValue);
      setColorValue('');
    }
    setColorValue('');
    setIsEdit(false);
  };

  /**
   * @description function confirm color picked
   */
  const handleConfirm = () => {
    if (colorValue) {
      onChange(colorValue);
      setColorValue('');
    }
    handleLockColor();
    setIsColorPickerOpen(false);
  };

  const handleConfirmKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    keyEventEnterSpaceWithFunction(event, handleConfirm);
  };

  /**
   * @description function cancel pick color
   */
  const handleCancel = () => {
    setColorValue('');
    handleLockColor();
    setIsColorPickerOpen(false);
  };

  const handleCancelKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    keyEventEnterSpaceWithFunction(event, handleCancel);
  };

  const handleFocus = () => {
    setIsColorPickerOpen(true);
  };

  useEffect(() => {
    // Check prop isLinear exist
    if (typeof isLinear === 'boolean') {
      setIsChecked(isLinear);
    }
  }, [isLinear]);

  return (
    <Flex
      w="100%"
      p="7px 16px"
      h="48px"
      aria-label={colorName}
      gap="20px"
      align="center"
      sx={(theme: MantineTheme) => ({
        borderBottom: `1px solid ${isBorderBottom && theme.colors.light[2]}`,
      })}
    >
      <Flex w={{ base: '65%', xs: '50%' }}>
        <Box pos="relative">
          <ColorInput
            variant="primary"
            aria-label="pick color"
            withPicker={false}
            value={colorValue || color}
            onChange={setColorValue}
            onFocus={handleFocus}
            withEyeDropper={false}
            autoComplete="on"
            styles={(theme: MantineTheme) => ({
              wrapper: {
                paddingLeft: `${paddingBox}`,
              },
              input: {
                display: `${!isEdit ? 'none' : 'block'}`,
                padding: '6px 17px',
                backgroundColor: theme.colors.light[1],
                width: '110px',
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
              value={colorValue || color}
              onChange={setColorValue}
              sx={{ zIndex: 999 }}
            />
          )}
        </Box>

        {!isEdit && (
          <Text variant="md" color="dark.2">
            {color}
          </Text>
        )}
      </Flex>

      <Flex
        w={{ base: '35%', xs: '50%' }}
        justify={`${hasCheckbox ? 'space-between' : 'flex-end'}`}
      >
        {hasCheckbox && (
          <Checkbox
            indexColor={1}
            name="edit"
            checked={isChecked}
            onChange={handleShowHideEditPen}
            aria-label="show hide edit color"
          />
        )}

        {!isChecked && (
          <>
            {isEdit ? (
              <Flex gap="10px">
                <Image
                  width={20}
                  height={20}
                  tabIndex={0}
                  src={iconConfirm}
                  alt="icon edit"
                  onClick={handleConfirm}
                  onKeyDown={handleConfirmKeyDown}
                  sx={{
                    cursor: 'pointer',
                  }}
                />
                <Image
                  width={20}
                  height={20}
                  tabIndex={0}
                  src={iconClose}
                  alt="icon edit"
                  onClick={handleCancel}
                  onKeyDown={handleCancelKeyDown}
                  sx={{
                    cursor: 'pointer',
                  }}
                />
              </Flex>
            ) : (
              <>
                {hasPencil && (
                  <Image
                    width={20}
                    height={20}
                    tabIndex={0}
                    src={iconEdit}
                    onClick={handleLockColor}
                    onKeyDown={handleLockColorKeyDown}
                    alt="icon edit"
                    sx={{
                      cursor: 'pointer',
                    }}
                  />
                )}
              </>
            )}
          </>
        )}
      </Flex>
    </Flex>
  );
};
