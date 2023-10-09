import { NamedColorList } from '@types';

/**
 * @description this function will replace all the old colors with new colors in
 * string svg image
 *
 * @param {string} value is svg string
 * @param {string} oldColor is old color
 * @param {string} newColor is new color
 *
 * @returns {string} the svg image with new color
 */
export function changeSVGColor(value: string, oldColor: string, newColor: string) {
  return value.replaceAll(oldColor, newColor);
}

// TODO: This shold be done in the backend in a more controlled manor.
export function renameDefsClass(value: string) {
  const randomNumber = Math.floor(Math.random() * 100 + 1);
  let originalValue = value;
  if (originalValue.indexOf('cls-') > -1) {
    originalValue = value.replaceAll('cls-', `cls-${randomNumber}`);
  }
  if (value.indexOf('linear-gradient') > -1) {
    originalValue = originalValue.replaceAll('linear-gradient', `${randomNumber}-linear-gradient`);
  }
  if (value.indexOf('radial-gradient') > -1) {
    originalValue = originalValue.replaceAll('radial-gradient', `${randomNumber}-radial-gradient`);
  }
  if (originalValue.indexOf('id="') > -1) {
    originalValue = originalValue.replaceAll('id="', `id="${randomNumber}-`);
    originalValue = originalValue.replaceAll('url(#', `url(#${randomNumber}-`);
    originalValue = originalValue.replaceAll('href="#', `href="#${randomNumber}-`);
  }
  return originalValue;
}

/**
 * @description function return color dark when in dark theme and color light
 * in light theme
 *
 * @param {string} colorScheme dark mode or light mode
 * @param {string} colorDarkTheme the color will show in dark theme
 * @param {string} colorLightTheme the color will show in light theme
 *
 * @returns {string}
 */
export function getColorScheme(
  colorScheme: string,
  colorDarkTheme: string,
  colorLightTheme: string
): string {
  return colorScheme === 'dark' ? colorDarkTheme : colorLightTheme;
}

export function enumerateColorsInPalette(palette: NamedColorList): string[] {
  const result: string[] = [];

  for (const col of palette) {
    if (typeof col[0] === 'string') {
      result.push(col[0]);
    } else {
      for (const col1 of col) {
        result.push(col1[0]);
      }
    }
  }
  return result;
}

// TODO: Remove when api is ready
export function getColorsFromSVGStyle(value: string) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(value, 'image/svg+xml');
  const style = xmlDoc.documentElement.getElementsByTagName('style')[0];
  const linearGradient = xmlDoc.documentElement.getElementsByTagName('linearGradient')[0];

  if (linearGradient) {
    return (
      [
        Array.from(linearGradient.getElementsByTagName('stop'))
          .map((item) => item.getAttribute('stop-color') || '')
          .filter((item: string) => !!item),
      ] || []
    );
  }

  if (style) {
    const innerHTML = style.innerHTML.toString();
    return (
      innerHTML
        .split('.')
        .map((item) => {
          if (item.replaceAll('\n', '').indexOf('fill:') > 0) {
            return item.replaceAll('\n', '').split('fill:')[1].split(';')[0].replaceAll(' ', '');
          }
          return '';
        })
        .filter((item: string) => !!item) || []
    );
  }
  return [];
}
