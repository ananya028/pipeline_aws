import { Box, Flex, Image, MantineTheme, Text, useMantineColorScheme } from '@mantine/core';
import { ReactNode } from 'react';

// Helpers
import { ColorHelper } from '@helpers';
import { PageTitle } from '@components';

export const StatusUpload = ({
  title,
  iconDark,
  iconLight,
  children,
  image,
  imageMobile,
  titleForm,
  titleFormMobile,
  sizeIconStatus = 24,
}: {
  sizeIconStatus?: number;
  image: string;
  imageMobile: string;
  title: string;
  titleForm: string;
  titleFormMobile: string;
  iconDark: string;
  iconLight: string;
  children: ReactNode;
}) => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <>
      <PageTitle title={title} stepNumber={2} />
      <Flex direction={{ base: 'column', sm: 'row' }} pt="25px" gap="32px">
        <Flex direction="column" gap="25px">
          <Flex gap="20px" direction="column" align={{ base: 'center', sm: 'normal' }}>
            <Box
              w={{ base: '325px', lg: '420px' }}
              p="16px"
              sx={(theme: MantineTheme) => ({
                backgroundColor: ColorHelper.getColorScheme(
                  theme.colorScheme,
                  theme.colors.dark[2],
                  theme.colors.light[1]
                ),
                border: `1px solid ${theme.colors.dark[0]}`,
                boxShadow: theme.colors.shadow[0],
                borderRadius: '4px',
              })}
            >
              <Text
                variant="xs"
                sx={(theme: MantineTheme) => ({
                  fontFamily: theme.other.fonts[0],
                })}
              >
                {imageMobile ? titleForm : 'Upload Your SVG'}
              </Text>
              <Flex mt="16px" w={{ base: '290px', sm: '300px', lg: '388px' }} h="118px">
                <Image
                  mr="5px"
                  width={sizeIconStatus}
                  height={sizeIconStatus}
                  alt={`icon ${title}`}
                  src={ColorHelper.getColorScheme(colorScheme, iconDark, iconLight)}
                />
                <Text
                  td="underline"
                  variant="md"
                  sx={(theme: MantineTheme) => ({
                    color: ColorHelper.getColorScheme(
                      theme.colorScheme,
                      theme.colors.cyan[0],
                      theme.colors.cyan[2]
                    ),
                  })}
                >
                  {image}
                </Text>
              </Flex>
            </Box>
          </Flex>

          {imageMobile && (
            <Flex gap="20px" direction="column" align={{ base: 'center', sm: 'normal' }}>
              <Box
                w="max-content"
                p="16px"
                sx={(theme: MantineTheme) => ({
                  backgroundColor: ColorHelper.getColorScheme(
                    theme.colorScheme,
                    theme.colors.dark[2],
                    theme.colors.light[1]
                  ),
                  border: `1px solid ${theme.colors.dark[0]}`,
                  boxShadow: theme.colors.shadow[0],
                  borderRadius: '4px',
                })}
              >
                <Text
                  variant="xs"
                  sx={(theme: MantineTheme) => ({
                    fontFamily: theme.other.fonts[0],
                  })}
                >
                  {titleFormMobile}
                </Text>

                <Flex mt="16px" w={{ base: '290px', sm: '300px', lg: '388px' }} h="118px">
                  <Image
                    mr="5px"
                    width={sizeIconStatus}
                    height={sizeIconStatus}
                    alt={`icon ${title}`}
                    src={ColorHelper.getColorScheme(colorScheme, iconDark, iconLight)}
                  />
                  <Text
                    td="underline"
                    variant="md"
                    sx={(theme: MantineTheme) => ({
                      color: ColorHelper.getColorScheme(
                        theme.colorScheme,
                        theme.colors.cyan[0],
                        theme.colors.cyan[2]
                      ),
                    })}
                  >
                    {imageMobile}
                  </Text>
                </Flex>
              </Box>
            </Flex>
          )}
        </Flex>
        <Flex gap="75px" direction="column" pt="16px">
          {children}
        </Flex>
      </Flex>
    </>
  );
};
