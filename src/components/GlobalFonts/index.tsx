import { Global } from '@mantine/core';

// Fonts
import openSandsBold from '@assets/fonts/OpenSans-Bold.ttf';
import openSandsMedium from '@assets/fonts/OpenSans-Medium.ttf';
import openSandsRegular from '@assets/fonts/OpenSans-Regular.ttf';
import montserrat from '@assets/fonts/Montserrat-Bold.otf';

export const GlobalFonts = () => (
  <Global
    styles={[
      {
        '@font-face': {
          fontFamily: 'OpenSans',
          src: `url('${openSandsBold}') format("opentype")`,
          fontWeight: 700,
          fontStyle: 'normal',
          fontDisplay: 'swap',
        },
      },
      {
        '@font-face': {
          fontFamily: 'OpenSans',
          src: `url('${openSandsMedium}') format("opentype")`,
          fontWeight: 500,
          fontStyle: 'normal',
          fontDisplay: 'swap',
        },
      },
      {
        '@font-face': {
          fontFamily: 'OpenSans',
          src: `url('${openSandsRegular}') format("opentype")`,
          fontWeight: 400,
          fontStyle: 'normal',
          fontDisplay: 'swap',
        },
      },
      {
        '@font-face': {
          fontFamily: 'Montserrat',
          src: `url('${montserrat}') format("opentype")`,
          fontWeight: 700,
          fontStyle: 'normal',
          fontDisplay: 'swap',
        },
      },
    ]}
  />
);
