import { IconHelpCustom } from '@components';
import { ColorHelper } from '@helpers';
import { Radio, createStyles, MantineTheme } from '@mantine/core';

type DarkThemeSuggestionsType = {
  defaultValue: string;
  onChange: (value: string) => void;
};

const useStyles = createStyles((theme: MantineTheme) => ({
  label: {
    fontWeight: 'normal',
    color: theme.colorScheme === 'dark' ? theme.colors.light[1] : theme.colors.dark[1],
  },
  input: {
    appearance: 'none',
    width: '20px',
    height: '20px',
    backgroundColor: theme.colors.none[0],
    border: `3px solid ${ColorHelper.getColorScheme(
      theme.colorScheme,
      theme.colors.dark[0],
      theme.colors.dark[0]
    )}`,
    ':checked': {
      backgroundColor: 'transparent',
      borderWidth: '6px',
      borderColor: ColorHelper.getColorScheme(
        theme.colorScheme,
        theme.colors.cyan[0],
        theme.colors.cyan[2]
      ),
    },
  },
}));

export const DarkThemeSuggestions = ({ defaultValue, onChange }: DarkThemeSuggestionsType) => {
  const { classes } = useStyles();
  return (
    <Radio.Group
      defaultValue={defaultValue}
      onChange={(value: string) => onChange(value)}
      label="Choose a dark theme suggestion"
      sx={(theme: MantineTheme) => ({
        'input + svg': {
          color: `${ColorHelper.getColorScheme(
            theme.colorScheme,
            theme.colors.dark[2],
            theme.colors.light[1]
          )}`,
        },
        marginLeft: '2px',
        div: {
          marginTop: '4px',
          color: `${ColorHelper.getColorScheme(
            theme.colorScheme,
            theme.colors.light[1],
            theme.colors.dark[2]
          )}`,
        },
        input: classes.input,
      })}
    >
      <IconHelpCustom
        tooltip={
          <>
            Color Inversion: Your uploaded graphic, but with opposite colors.
            <br></br>Brightness Inversion: Your uploaded graphic, but the colors have reversed
            brightness while preserving the hue.
            <br></br>No Inversion: Your uploaded graphic with no changes.
          </>
        }
      />
      <Radio label="Color Inversion" value="invertColor" aria-label="Invert the colors" />
      <Radio
        label="Brightness Inversion"
        value="invertLuminosity"
        aria-label="Invert the brightness of the colors"
      />
      <Radio label="No Inversion" value="none" aria-label="No inversion of the colors" />
    </Radio.Group>
  );
};
