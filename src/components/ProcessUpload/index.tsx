import { Box, MantineTheme, Progress, Text } from '@mantine/core';

import { ColorHelper } from '@helpers';

export const ProcessUpload = ({
  percent,
  fileName,
  size,
}: {
  percent?: number;
  fileName: string;
  size: number;
}) => (
  <Box mt="16px" w={{ base: '290px', sm: '300px', lg: '388px' }}>
    <Text variant="md">{fileName}</Text>
    <Text variant="xxs">{size} kb</Text>
    <Progress
      value={percent}
      m="8px 0"
      radius="none"
      aria-label="processing upload file"
      styles={(theme: MantineTheme) => ({
        root: {
          backgroundColor: ColorHelper.getColorScheme(
            theme.colorScheme,
            theme.colors.dark[0],
            theme.colors.dark[2]
          ),
        },
        bar: {
          backgroundColor: ColorHelper.getColorScheme(
            theme.colorScheme,
            theme.colors.cyan[0],
            theme.colors.cyan[2]
          ),
        },
      })}
    />
    {/* <Text variant="xxs">{percent}% complete</Text> */}
  </Box>
);
