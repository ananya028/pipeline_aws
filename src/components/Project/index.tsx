import { Box, Flex, MantineTheme, Text } from '@mantine/core';
import { KeyboardEvent, MouseEvent, useRef } from 'react';

// Helpers
import { ColorHelper, keyEventEnterSpaceWithFunction } from '@helpers';

// Components
import { IconHelpCustom } from '@components';

export const Project = ({
  tooltip,
  name,
  onClick,
  image,
  align = 'center',
  widthImage,
  heightImage,
}: {
  tooltip: string;
  name: string;
  image: string;
  align?: string;
  widthImage: string;
  heightImage: string;
  onClick: () => void;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleOnKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    keyEventEnterSpaceWithFunction(event, onClick);
  };

  const handleOnClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    // Skip when an event occurs on the excluded element
    if (ref.current && ref.current.contains(target)) {
      return;
    }

    onClick();
  };

  return (
    <Box
      sx={(theme: MantineTheme) => ({
        border: `1px solid ${theme.colors.dark[0]}`,
        borderRadius: '4px',
        cursor: 'pointer',
        width: '200px',
        height: '240px',
        backgroundColor: ColorHelper.getColorScheme(
          theme.colorScheme,
          theme.colors.dark[2],
          theme.colors.light[5]
        ),
      })}
      onClick={handleOnClick}
      onKeyDown={handleOnKeyDown}
      tabIndex={0}
    >
      <Flex justify="space-between" align="center" p="16px 16px 0 16px">
        <Text
          variant="xs"
          sx={(theme: MantineTheme) => ({
            fontFamily: theme.other.fonts[0],
          })}
        >
          {name}
        </Text>
        <Box ref={ref}>
          <IconHelpCustom tooltip={tooltip} />
        </Box>
      </Flex>
      <Flex
        mt="16px"
        w="100%"
        h="198px"
        align={align}
        justify="center"
        pb="5px"
        sx={{
          marginTop: '0px',
        }}
      >
        <Box
          w={widthImage}
          h={heightImage}
          sx={{
            background: `url(${image})`,
          }}
        />
      </Flex>
    </Box>
  );
};
