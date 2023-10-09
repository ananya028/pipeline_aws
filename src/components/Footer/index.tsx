import { Anchor, Box, Flex, Image, MantineTheme, Text, useMantineColorScheme } from '@mantine/core';
import { KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';

// Helpers
import { ColorHelper, keyEventEnterSpace } from '@helpers';

// Assets
import {
  iconInstagramDark,
  iconInstagram,
  iconLinkedin,
  iconLinkedinDark,
  iconTwitter,
  iconTwitterDark,
  logoDark,
  logoLight,
} from '@assets';

export const Footer = () => {
  const { colorScheme } = useMantineColorScheme();

  const handleRedirectBase = (event: KeyboardEvent<HTMLElement>) => {
    keyEventEnterSpace(event, process.env.VITE_LINK_WELCOME!);
  };

  const handleClickEmail = (event: KeyboardEvent<HTMLElement>) => {
    keyEventEnterSpace(event, process.env.VITE_LINK_EMAIL!);
  };

  const handleRedirectAccessibilityStatement = (event: KeyboardEvent<HTMLElement>) => {
    keyEventEnterSpace(event, process.env.VITE_ACCESSIBILITY_STATEMENT!);
  };

  const handleRedirectTermOfUse = (event: KeyboardEvent<HTMLElement>) => {
    keyEventEnterSpace(event, process.env.VITE_TERM_OF_USE!);
  };

  const handleRedirectPrivacyPolicy = (event: KeyboardEvent<HTMLElement>) => {
    keyEventEnterSpace(event, process.env.VITE_PRIVACY_POLICY!);
  };

  const handleRedirectInstagram = (event: KeyboardEvent<HTMLElement>) => {
    keyEventEnterSpace(event, process.env.VITE_INSTAGRAM!);
  };

  const handleRedirectTwitter = (event: KeyboardEvent<HTMLElement>) => {
    keyEventEnterSpace(event, process.env.VITE_TWITTER!);
  };

  const handleRedirectLinkedin = (event: KeyboardEvent<HTMLElement>) => {
    keyEventEnterSpace(event, process.env.VITE_LINKEDIN!);
  };

  const handleRedirectSubscribe = (event: KeyboardEvent<HTMLElement>) => {
    keyEventEnterSpace(event, process.env.VITE_SUBSCRIBE!);
  };

  return (
    <footer>
      <Box
        p="117px 15px"
        sx={(theme: MantineTheme) => ({
          backgroundColor: ColorHelper.getColorScheme(
            theme.colorScheme,
            theme.colors.dark[2],
            theme.colors.light[1]
          ),
        })}
      >
        <Flex maw="1440px" m="auto" p={{ base: '0 10px', lg: '0px' }} direction="column">
          <Flex direction={{ base: 'column', xs: 'row' }}>
            <Box w={{ base: 'fit-content', xs: '590px' }}>
              <Link
                to={process.env.VITE_LINK_WELCOME!}
                aria-label="View welcome page"
                onKeyDown={handleRedirectBase}
                style={{
                  marginTop: '20px',
                  display: 'block',
                  width: 'min-content',
                }}
              >
                <Image
                  width="216.15px"
                  height="34px"
                  mx="auto"
                  src={ColorHelper.getColorScheme(colorScheme, logoDark, logoLight)}
                  alt="Logo"
                  fit="contain"
                  withPlaceholder
                />
              </Link>

              <Flex
                mt="52px"
                gap="10px"
                direction="column"
                sx={(theme: MantineTheme) => ({
                  a: {
                    ':hover': {
                      opacity: '0.5',
                      textDecoration: 'underline',
                    },
                    textUnderlineOffset: '5px',
                    fontSize: theme.fontSizes.xs,
                    color: ColorHelper.getColorScheme(
                      theme.colorScheme,
                      theme.colors.light[4],
                      theme.colors.dark[2]
                    ),
                    [`@media (min-width: ${theme.breakpoints.md})`]: {
                      fontSize: theme.fontSizes.md,
                    },
                  },
                })}
              >
                <Text variant="xxl">Company</Text>
                <Anchor
                  w="fit-content"
                  td="underline"
                  href={`mailto:${process.env.VITE_LINK_EMAIL}`}
                  onKeyDown={handleClickEmail}
                >
                  {process.env.VITE_LINK_EMAIL}
                </Anchor>
              </Flex>
              <Flex
                mt="30px"
                gap="10px"
                direction="column"
                sx={(theme: MantineTheme) => ({
                  a: {
                    ':hover': {
                      opacity: '0.5',
                      textDecoration: 'underline',
                    },
                    textUnderlineOffset: '5px',
                    fontSize: theme.fontSizes.xs,
                    color: ColorHelper.getColorScheme(
                      theme.colorScheme,
                      theme.colors.light[4],
                      theme.colors.dark[2]
                    ),
                    [`@media (min-width: ${theme.breakpoints.md})`]: {
                      fontSize: theme.fontSizes.md,
                    },
                  },
                })}
              >
                <Text variant="xxl">Legal</Text>
                <Anchor
                  w="fit-content"
                  td="underline"
                  href={process.env.VITE_ACCESSIBILITY_STATEMENT}
                  target="_blank"
                  onKeyDown={handleRedirectAccessibilityStatement}
                >
                  Accessibility Statement
                </Anchor>
                <Anchor
                  w="fit-content"
                  td="underline"
                  href={process.env.VITE_TERM_OF_USE}
                  target="_blank"
                  onKeyDown={handleRedirectTermOfUse}
                >
                  Terms of Use
                </Anchor>
                <Anchor
                  w="fit-content"
                  td="underline"
                  href={process.env.VITE_PRIVACY_POLICY}
                  target="_blank"
                  onKeyDown={handleRedirectPrivacyPolicy}
                >
                  Privacy Policy
                </Anchor>
              </Flex>

              <Flex gap="10px" mt="46px">
                <Anchor
                  href={process.env.VITE_LINKEDIN}
                  target="_blank"
                  aria-label="view linkedin page"
                  onKeyDown={handleRedirectLinkedin}
                >
                  <Image
                    width={30}
                    height={30}
                    src={ColorHelper.getColorScheme(colorScheme, iconLinkedinDark, iconLinkedin)}
                    alt="icon linkedin"
                  />
                </Anchor>
                <Anchor
                  href={process.env.VITE_TWITTER}
                  target="_blank"
                  aria-label="view twitter page"
                  onKeyDown={handleRedirectTwitter}
                >
                  <Image
                    width={30}
                    height={30}
                    src={ColorHelper.getColorScheme(colorScheme, iconTwitterDark, iconTwitter)}
                    alt="icon twitter"
                  />
                </Anchor>

                <Anchor
                  href={process.env.VITE_INSTAGRAM}
                  target="_blank"
                  aria-label="view instagram page"
                  onKeyDown={handleRedirectInstagram}
                >
                  <Image
                    width={30}
                    height={30}
                    src={ColorHelper.getColorScheme(colorScheme, iconInstagramDark, iconInstagram)}
                    alt="icon instagram"
                  />
                </Anchor>
              </Flex>
            </Box>
            <Box>
              <Text
                pt={{ base: '30px', xs: '0px' }}
                sx={(theme: MantineTheme) => ({
                  fontWeight: theme.other.fw.bold,
                  fontSize: '30px',
                  fontFamily: theme.other.fonts[0],
                  color: ColorHelper.getColorScheme(
                    theme.colorScheme,
                    theme.colors.cyan[0],
                    theme.colors.cyan[2]
                  ),
                  [`@media (min-width: ${theme.breakpoints.md})`]: {
                    fontSize: theme.fontSizes.xxxl,
                  },
                })}
              >
                Subscribe to Smart SVG News!
              </Text>
              <Text
                variant="xxl"
                p="16px 0"
                sx={(theme: MantineTheme) => ({
                  fontFamily: theme.other.fonts[1],
                })}
              >
                We’re excited to share news soon!
              </Text>
              <Text
                variant="xxl"
                sx={(theme: MantineTheme) => ({
                  fontFamily: theme.other.fonts[1],
                })}
              >
                Subscribe to our newsletter to received tech updates on our Smart SVG™ software.
              </Text>
              <Anchor
                m="45px 0 40px 0"
                onKeyDown={handleRedirectSubscribe}
                href={process.env.VITE_SUBSCRIBE}
                target="_blank"
                variant="secondary"
                p="26px 33px"
              >
                Subscribe for Updates
              </Anchor>
              <Text
                variant="xxl"
                sx={(theme: MantineTheme) => ({
                  fontFamily: theme.other.fonts[1],
                  fontSize: theme.fontSizes.xxs,
                  [`@media (min-width: ${theme.breakpoints.md})`]: {
                    fontSize: theme.fontSizes.sm,
                  },
                })}
              >
                We respect your privacy. Our newsletter is GDPR compliant.
              </Text>
            </Box>
          </Flex>
          <Text
            pt="53px"
            variant="xxl"
            sx={(theme: MantineTheme) => ({
              fontFamily: theme.other.fonts[1],
              fontSize: theme.fontSizes.xxs,
              [`@media (min-width: ${theme.breakpoints.md})`]: {
                fontSize: theme.fontSizes.sm,
              },
            })}
          >
            Copyright © 2023 Equivalent. All Rights Reserved.
          </Text>
        </Flex>
      </Box>
    </footer>
  );
};
