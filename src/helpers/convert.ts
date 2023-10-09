export const arrayNewAndOldColor = (
  oldData: (string | string[])[],
  newData: (string | string[])[]
): (string | string[])[] =>
  oldData.map((oldColor, index) => {
    const newColor = newData[index];
    if (Array.isArray(oldColor)) {
      return oldColor.map((subColor, subIndex) => `${subColor} ${newColor[subIndex]}`);
    }
    return `${oldColor} ${newColor}`;
  });

const flattenArray = (arr: (string | string[])[]): string | string[] =>
  arr.reduce(
    (acc, val) =>
      Array.isArray(acc) ? acc.concat(Array.isArray(val) ? flattenArray(val) : val) : [],
    []
  );

export const getMatchingColors = (
  desktop: (string | string[])[],
  mobile: (string | string[])[]
) => {
  const set1 = new Set(flattenArray(desktop));
  const set2 = new Set(flattenArray(mobile));

  return [...set1].filter((color) => set2.has(color));
};
