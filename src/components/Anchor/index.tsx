import { Anchor, Image, MantineTheme, useMantineColorScheme } from '@mantine/core';

// Assets
import { iconNewWindow, iconNewWindowDark } from '@assets';
import { ColorHelper } from '@helpers';

export const AnchorNewWindowCustom = ({ title, href }: { title: string; href: string }) => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <Anchor
      href={href}
      target="_blank"
      td="underline"
      sx={(theme: MantineTheme) => ({
        fontSize: theme.fontSizes.xxs,
        fontWeight: theme.other.fw.medium,
        color: ColorHelper.getColorScheme(
          theme.colorScheme,
          theme.colors.cyan[0],
          theme.colors.cyan[2]
        ),
        [`@media (min-width: ${theme.breakpoints.lg})`]: {
          fontSize: theme.fontSizes.xs,
        },
      })}
      tabIndex={0}
    >
      {title}
      <Image
        width={16}
        height={16}
        src={ColorHelper.getColorScheme(colorScheme, iconNewWindowDark, iconNewWindow)}
        display="inline-block"
        p="5px"
        alt="icon new tab"
        sx={{
          verticalAlign: 'middle',
        }}
      />
    </Anchor>
  );
};
