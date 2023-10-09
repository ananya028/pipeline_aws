import { Box, Flex, MantineTheme, Text } from '@mantine/core';
import { Dropzone, DropzoneProps } from '@mantine/dropzone';

import { ColorHelper } from '@helpers';

type InputFileType = {
  multiple?: boolean;
  fileName: string;
  onDrop: (listFiles: File[]) => void;
} & Omit<DropzoneProps, 'children'>;

export const InputFile = ({ fileName, onDrop, multiple = false, ...props }: InputFileType) => (
  <Box mt={16} w={{ base: '290px', sm: '300px', lg: '388px' }}>
    <Dropzone
      h="120px"
      onDrop={onDrop}
      maxSize={5 * 1024 ** 2}
      maxFiles={1}
      accept={['image/svg+xml']}
      multiple={multiple}
      {...props}
      sx={(theme: MantineTheme) => ({
        border: 'none',
        borderRadius: '4px',
        background: `repeating-linear-gradient(-3deg, ${theme.colors.light[2]}, ${theme.colors.light[2]} 11px, transparent 11px, transparent 21px, ${theme.colors.light[2]} 21px), repeating-linear-gradient(87deg, ${theme.colors.light[2]}, ${theme.colors.light[2]} 11px, transparent 11px, transparent 21px, ${theme.colors.light[2]} 21px), repeating-linear-gradient(177deg, ${theme.colors.light[2]}, ${theme.colors.light[2]} 11px, transparent 11px, transparent 21px, ${theme.colors.light[2]} 21px), repeating-linear-gradient(267deg, ${theme.colors.light[2]}, ${theme.colors.light[2]} 11px, transparent 11px, transparent 21px, ${theme.colors.light[2]} 21px)`,
        backgroundSize: '1.5px 100%, 100% 1.5px, 1.5px 100% , 100% 1.5px',
        backgroundPosition: '0 0, 0 0, 100% 0, 0 100%',
        backgroundRepeat: 'no-repeat',
        '.mantine-Dropzone-inner': {
          width: '100%',
          height: '100%',
        },
      })}
    >
      <Flex
        w="100%"
        h="100%"
        justify="center"
        align="center"
        sx={(theme: MantineTheme) => ({
          span: {
            textDecoration: 'underline',
            color: ColorHelper.getColorScheme(
              theme.colorScheme,
              theme.colors.cyan[0],
              theme.colors.cyan[2]
            ),
          },
        })}
      >
        {!fileName ? (
          <>
            <Text variant="md" mr={5}>
              Drag and Drop file here or
            </Text>
            <span>Browse</span>
          </>
        ) : (
          <Text variant="md" mr={5}>
            {fileName}
          </Text>
        )}
      </Flex>
    </Dropzone>
  </Box>
);
