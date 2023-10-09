import { KeyboardEvent, useContext, useEffect, useRef, useState } from 'react';
import {
  Box,
  Burger,
  Anchor,
  Flex,
  Image,
  useMantineColorScheme,
  MantineTheme,
  Button,
} from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import { Link, useLocation } from 'react-router-dom';

// Constants
import { ROUTES, ROUTES_AUTH } from '@constants';

// Helpers
import { ColorHelper, keyEventEnterSpace, keyEventEnterSpaceWithFunction } from '@helpers';

// Contexts
import { AuthenticationContext } from '@contexts';

// Custom hooks
import { useKeyEvent } from '@hooks';

// Utils
import { isDarkTheme } from '@utils';

// Images
import { avatarDark, avatarLight, logoDark, logoLight } from '@assets';

// Components
import { ToggleTheme } from '@components';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const avatarClickout = useClickOutside(() => setIsMenuOpen(false));
  const ref = useRef<HTMLElement>(null);
  const location = useLocation();
  const handleRedirect = useKeyEvent<HTMLElement>();
  const { isAuthenticated, onLogout } = useContext(AuthenticationContext);
  const [opened] = useDisclosure(false);
  const [openBurgerMenu, setOpenBurgerMenu] = useState(false);
  const mobileMenuClickout = useClickOutside(() => setOpenBurgerMenu(false));
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = isDarkTheme(colorScheme);

  const handleOpenBurgerMenu = () => {
    setOpenBurgerMenu((prev) => !prev);
    setIsMenuOpen(false);
  };

  const handleRedirectBase = (event: KeyboardEvent<HTMLElement>) => {
    keyEventEnterSpace(event, process.env.VITE_LINK_WELCOME!);
  };

  const handleRedirectHome = (event: KeyboardEvent<HTMLElement>) => {
    handleRedirect(event, ' ', ROUTES_AUTH.PROJECTS);
  };

  const handleRedirectLogin = (event: KeyboardEvent<HTMLElement>) => {
    handleRedirect(event, ' ', ROUTES.LOGIN);
  };

  const handleRedirectSmartSVG = (event: KeyboardEvent<HTMLElement>) => {
    keyEventEnterSpace(event, process.env.VITE_LINK_SMART_SVG!);
  };

  const handleKeyDownToggle = (event: KeyboardEvent<HTMLInputElement>) => {
    keyEventEnterSpaceWithFunction(event, toggleColorScheme);
  };

  const handleShowHidePopup = () => {
    setIsMenuOpen((prev) => !prev);
    setOpenBurgerMenu(false);
  };

  const handleOpenSettingKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    keyEventEnterSpaceWithFunction(event, handleShowHidePopup);
  };

  const handleLogoutKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    keyEventEnterSpaceWithFunction(event, () => {
      onLogout();
      setIsMenuOpen(false);
    });
  };

  useEffect(() => {
    const avatar = ref.current;
    if (avatar) {
      avatar.removeAttribute('aria-expanded');
      avatar.removeAttribute('aria-controls');
    }
  }, [isAuthenticated]);

  return (
    <header className="header-wrapper" role="banner">
      <Box
        ref={avatarClickout}
        sx={(theme) => ({
          backgroundColor: ColorHelper.getColorScheme(
            colorScheme,
            theme.colors.dark[2],
            theme.colors.light[1]
          ),
        })}
      >
        <Flex
          maw="1440px"
          p="0 15px"
          m="auto"
          justify="space-between"
          align="center"
          sx={(theme) => ({
            height: theme.other.headerHeight,
            backgroundColor: ColorHelper.getColorScheme(
              colorScheme,
              theme.colors.dark[2],
              theme.colors.light[1]
            ),
          })}
        >
          <h1
            style={{
              width: '216.15px',
            }}
          >
            <Link
              to={process.env.VITE_LINK_WELCOME!}
              aria-label="View welcome page"
              onKeyDown={handleRedirectBase}
              style={{
                width: '193px',
                height: '31px',
              }}
            >
              <Image
                mx="auto"
                src={ColorHelper.getColorScheme(colorScheme, logoDark, logoLight)}
                alt="Logo"
                fit="contain"
                withPlaceholder
              />
            </Link>
          </h1>

          <Flex className="navigation" gap={{ base: 15, sm: 40 }} align="center">
            <ToggleTheme
              name="toggle"
              onChange={() => toggleColorScheme()}
              onKeyDown={handleKeyDownToggle}
              checked={dark}
              display={{ base: 'none', xs: 'block' }}
              styles={{
                input: {
                  width: '100px',
                  height: '34px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                },
              }}
            />
            {isAuthenticated ? (
              <>
                <Box
                  display={{ base: 'none', lg: 'flex' }}
                  sx={{
                    alignItems: 'center',
                    justifyItems: 'center',
                  }}
                >
                  <Anchor
                    mr="40px"
                    href={process.env.VITE_LINK_SMART_SVG}
                    variant="primary"
                    aria-label="View login page"
                    onKeyDown={handleRedirectSmartSVG}
                  >
                    Smart SVG™
                  </Anchor>
                  <Anchor
                    component={Link}
                    to={ROUTES_AUTH.PROJECTS}
                    variant="primary"
                    aria-label="View project page"
                    onKeyDown={handleRedirectHome}
                    sx={(theme: MantineTheme) => ({
                      borderBottom: `2px solid ${
                        location.pathname === ROUTES_AUTH.PROJECTS
                          ? ColorHelper.getColorScheme(
                              theme.colorScheme,
                              theme.colors.cyan[0],
                              theme.colors.cyan[2]
                            )
                          : 'none'
                      }`,
                    })}
                  >
                    New Project
                  </Anchor>
                </Box>

                <Box
                  pos={{ base: 'static', lg: 'relative' }}
                  id="avatar-navbar"
                  onChange={() => {
                    setOpenBurgerMenu(false);
                    handleShowHidePopup();
                  }}
                >
                  <Image
                    width="42.2px"
                    height="42.2px"
                    mx="auto"
                    radius="md"
                    tabIndex={0}
                    src={ColorHelper.getColorScheme(colorScheme, avatarDark, avatarLight)}
                    onKeyDown={handleOpenSettingKeyDown}
                    onClick={handleShowHidePopup}
                    alt="Avatar"
                    sx={{ cursor: 'pointer' }}
                  />
                  {isMenuOpen && (
                    <Button
                      pos={{ base: 'static', lg: 'absolute' }}
                      display={{ base: 'none', lg: 'block' }}
                      h="max-content"
                      variant="secondary"
                      p="20px 20px"
                      onKeyDown={handleLogoutKeyDown}
                      onClick={onLogout}
                      sx={(theme: MantineTheme) => ({
                        right: '0',
                        fontFamily: theme.other.fonts[1],
                        fontSize: theme.fontSizes.xs,
                        fontWeight: theme.other.fw.regular,
                        color: ColorHelper.getColorScheme(
                          theme.colorScheme,
                          theme.colors.light[1],
                          theme.colors.dark[2]
                        ),
                        backgroundColor: ColorHelper.getColorScheme(
                          colorScheme,
                          theme.colors.dark[2],
                          theme.colors.light[1]
                        ),
                        width: 'fit-content',
                        ...theme.fn.hover({
                          color: theme.colors.dark[2],
                          background: theme.colors.light[2],
                          opacity: 1,
                        }),
                      })}
                    >
                      Logout
                    </Button>
                  )}
                </Box>
                <Burger
                  color={ColorHelper.getColorScheme(colorScheme, 'white', 'black')}
                  opened={opened}
                  onClick={handleOpenBurgerMenu}
                  aria-label="Show hide menu login/ sign up"
                  display={{ base: 'block', lg: 'none' }}
                />
              </>
            ) : (
              <>
                <Box
                  display={{ base: 'none', lg: 'flex' }}
                  sx={{
                    alignItems: 'center',
                    justifyItems: 'center',
                  }}
                >
                  <Anchor
                    mr="40px"
                    href={process.env.VITE_LINK_SMART_SVG}
                    variant="primary"
                    aria-label="View smart SVG page"
                    onKeyDown={handleRedirectSmartSVG}
                  >
                    Smart SVG™
                  </Anchor>
                  <Anchor
                    component={Link}
                    to={ROUTES.LOGIN}
                    variant="secondary"
                    aria-label="View login page"
                    onKeyDown={handleRedirectLogin}
                  >
                    Login
                  </Anchor>
                </Box>
                <Burger
                  color={ColorHelper.getColorScheme(colorScheme, 'white', 'black')}
                  opened={opened}
                  onClick={handleOpenBurgerMenu}
                  aria-label="Show hide menu login/ sign up"
                  display={{ base: 'block', lg: 'none' }}
                />
              </>
            )}
          </Flex>
        </Flex>
        {openBurgerMenu && (
          <Flex
            ref={mobileMenuClickout}
            pos="absolute"
            direction="column"
            sx={(theme) => ({
              zIndex: 9999,
              backgroundColor: ColorHelper.getColorScheme(
                colorScheme,
                theme.colors.dark[2],
                theme.colors.light[1]
              ),
              width: '100%',
              a: {
                textDecoration: theme.other.td.none,
                color: ColorHelper.getColorScheme(
                  colorScheme,
                  theme.colors.light[1],
                  theme.colors.dark[2]
                ),
                padding: '15px',
                ...theme.fn.hover({
                  color: theme.colors.dark[2],
                  background: theme.colors.light[2],
                  opacity: theme.other.opacity.xs,
                }),
              },
              [`@media (min-width: ${theme.breakpoints.lg})`]: {
                display: 'none',
              },
            })}
          >
            {isAuthenticated ? (
              <Link
                to={ROUTES_AUTH.PROJECTS}
                onClick={handleOpenBurgerMenu}
                aria-label="View home page"
                onKeyDown={handleRedirectHome}
              >
                New Project
              </Link>
            ) : (
              <Link
                to={ROUTES.LOGIN}
                onClick={handleOpenBurgerMenu}
                aria-label="View login page"
                onKeyDown={handleRedirectLogin}
              >
                Login
              </Link>
            )}

            <Link
              to={process.env.VITE_LINK_SMART_SVG!}
              onClick={handleOpenBurgerMenu}
              aria-label="View smart SVG page"
              onKeyDown={handleRedirectSmartSVG}
            >
              Smart SVG™
            </Link>

            <Box w="100%" p="10px 15px" display={{ base: 'block', xs: 'none' }}>
              <ToggleTheme
                name="toggle"
                onChange={() => toggleColorScheme()}
                checked={dark}
                styles={{
                  input: {
                    cursor: 'pointer',
                  },
                }}
              />
            </Box>
          </Flex>
        )}
        {isMenuOpen && (
          <Button
            pos="absolute"
            display={{ base: 'block', lg: 'none' }}
            h="max-content"
            variant="secondary"
            p="20px 20px"
            onKeyDown={handleLogoutKeyDown}
            onClick={onLogout}
            sx={(theme: MantineTheme) => ({
              fontFamily: theme.other.fonts[1],
              fontSize: theme.fontSizes.xs,
              fontWeight: theme.other.fw.regular,
              color: ColorHelper.getColorScheme(
                theme.colorScheme,
                theme.colors.light[1],
                theme.colors.dark[2]
              ),
              backgroundColor: ColorHelper.getColorScheme(
                colorScheme,
                theme.colors.dark[2],
                theme.colors.light[1]
              ),
              ...theme.fn.hover({
                color: theme.colors.dark[2],
                background: theme.colors.light[2],
                opacity: 1,
              }),
              width: '100%',
              span: {
                width: '100%',
              },
            })}
          >
            Logout
          </Button>
        )}
      </Box>
    </header>
  );
};
