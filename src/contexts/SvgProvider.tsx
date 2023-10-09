import { ReactNode, createContext, useEffect, useMemo, useState, useContext } from 'react';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { MantineTheme } from '@mantine/core';

// Constants
import { STORAGE_KEY } from '@constants';

// Types
import { ApiError, MakeItSmartInput, NamedColorList, SvgManipulationOutput } from '@types';

// Helpers
import {
  FileHelpers,
  arrayNewAndOldColor,
  getMatchingColors,
  SessionStoreHelper,
  ColorHelper,
} from '@helpers';

// Contexts
import { ProjectContext } from './ProjectProvider';
import { AppDependenciesContext } from './AppDependencies';

export const SvgContext = createContext<SvgProviderType>({} as SvgProviderType);

// TODO: move this into component level state instead of an app level context
//      This information is useful only on the SVG manipulations page
//      so it doesn't make sense to inject it globally
//      Also, split the huge interface into smaller ones based on
//      what the individual component needs
export interface SvgProviderType {
  images: { imageMobile: string | ArrayBuffer | null; imageDesktop: string | ArrayBuffer | null };
  onLoadImages: (fileMobile: File[], fileDesktop: File[]) => void;
  onChangeImageMobileColor: (oldColor: string, newColor: string) => void;
  onChangeImageDesktopColor: (oldColor: string, newColor: string) => void;
  onColorLockMobile: (oldColor: string, newColor: string) => void;
  onColorLockDesktop: (oldColor: string, newColor: string) => void;
  onResetDefaultColorsMobile: () => void;
  onResetDefaultColorsDesktop: () => void;
  onApplyChangesToMobile: (
    originalColorsDark: (string | string[])[],
    changedColorsDark: (string | string[])[]
  ) => string;
  onResetSvgValues: () => void;
  onChangeDarkThemeDesktop: () => void;
  onChangeDarkThemeMobile: () => void;
  onMakeSmartSvg: (payload: MakeItSmartInput) => Promise<string | undefined>;

  svgLightDesktop: string | ArrayBuffer | null;
  svgDarkDesktop: string | ArrayBuffer | null;
  svgLightMobile: string | ArrayBuffer | null;
  setSvgDarkMobile: (svg: string) => void;
  svgDarkMobile: string | ArrayBuffer | null;
  svgOriginalDesktop: string | ArrayBuffer | null;
  svgOriginalMobile: string | ArrayBuffer | null;
  matchColorDeskTopMobile: string[];
  colorDark: NamedColorList;
  colorLight: NamedColorList;
  setColorDark: (colors: NamedColorList) => void;
  setColorLight: (colors: NamedColorList) => void;
  colorDarkMobile: NamedColorList;
  colorLightMobile: NamedColorList;
  setColorDarkMobile: (colors: NamedColorList) => void;
  setColorLightMobile: (colors: NamedColorList) => void;
  colorOriginalDesktop: NamedColorList;
  colorOriginalMobile: NamedColorList;
  colorLockDesktop: { [col: string]: boolean };
  colorLockMobile: { [col: string]: boolean };
}

export const SvgProvider = ({ children }: { children: ReactNode }) => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [matchColorDeskTopMobile, setMatchColorDeskTopMobile] = useState<string[]>([]);
  const [images, setImages] = useState<{
    imageMobile: string | ArrayBuffer | null;
    imageDesktop: string | ArrayBuffer | null;
  }>({
    imageMobile: '',
    imageDesktop: '',
  });
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { svgService } = useContext(AppDependenciesContext);

  // States for Desktop
  const [svgOriginalDesktop, setSvgOriginalDesktop] = useState<string | ArrayBuffer | null>('');
  const [svgLightDesktop, setSvgLightDesktop] = useState<string | ArrayBuffer | null>('');
  const [svgDarkDesktop, setSvgDarkDesktop] = useState<string | ArrayBuffer | null>('');
  const [colorDark, setColorDark] = useState<NamedColorList>([]);
  const [colorLight, setColorLight] = useState<NamedColorList>([]);
  const [colorOriginalDesktop, setColorOriginalDesktop] = useState<NamedColorList>([]);
  const [colorEditDesktop, setColorEditDesktop] = useState<{ [col: string]: string }>({});
  const [colorLockDesktop, setColorLockDesktop] = useState<{ [col: string]: boolean }>({});

  // States for Mobile
  const [svgOriginalMobile, setSvgOriginalMobile] = useState<string | ArrayBuffer | null>('');
  const [svgLightMobile, setSvgLightMobile] = useState<string | ArrayBuffer | null>('');
  const [svgDarkMobile, setSvgDarkMobile] = useState<string | ArrayBuffer | null>('');
  const [colorDarkMobile, setColorDarkMobile] = useState<NamedColorList>([]);
  const [colorLightMobile, setColorLightMobile] = useState<NamedColorList>([]);
  const [colorOriginalMobile, setColorOriginalMobile] = useState<NamedColorList>([]);
  const [colorEditMobile, setColorEditMobile] = useState<{ [col: string]: string }>({});
  const [colorLockMobile, setColorLockMobile] = useState<{ [col: string]: boolean }>({});

  const { onCheckProjectSelected } = useContext(ProjectContext);

  function handleComponentError(err: ApiError) {
    if (err.errors && err.errors.length > 0) {
      return { errorFields: err.errors, message: err.message };
    }
    // TODO: component specific error messages should be shown inside components
    //      instead of a disappearing toast message
    setErrorMessage(err.message);
  }

  const handleResetSvgValuesDesktop = () => {
    setColorEditDesktop({});
    setColorLockDesktop({});
  };

  const handleResetSvgValuesMobile = () => {
    setColorEditMobile({});
    setColorLockMobile({});
  };

  const handleResetSvgValues = () => {
    handleResetSvgValuesDesktop();
    handleResetSvgValuesMobile();
  };

  const manipulatorMap: { [key: string]: [string, string] } = {
    darkTheme: ['all', 'invert'],
    darkThemeMobile: ['all', 'invert'],
    alt: ['pre', 'title'],
    description: ['pre', 'description'],
    isDecorative: ['pre', 'decorative'],
  };

  async function makeSmartSvg(payload: MakeItSmartInput): Promise<string | undefined> {
    try {
      const {
        data: { smartSvg },
      } = await svgService.makeSmartSVG(payload);
      return smartSvg;
    } catch (err: any) {
      handleComponentError(err);
    }
  }

  useEffect(() => {
    if (errorMessage) {
      notifications.show({
        title: 'Something went wrong!',
        message: errorMessage,
        autoClose: 2000,
        withCloseButton: false,
        icon: <IconX />,
        color: 'warning.0',
        styles: (theme: MantineTheme) => ({
          root: {
            backgroundColor: ColorHelper.getColorScheme(
              theme.colorScheme,
              theme.colors.dark[0],
              theme.colors.light[6]
            ),
          },
          description: {
            color: ColorHelper.getColorScheme(
              theme.colorScheme,
              theme.colors.light[1],
              theme.colors.dark[2]
            ),
          },
        }),
      });
    }
  }, [errorMessage]);

  const handleApiCall = async (svg: string, kind?: string) => {
    const manipulators = [];
    const project = onCheckProjectSelected() as unknown as { [key: string]: string | boolean };
    Object.entries(project).forEach(([key, value]) => {
      if (value) {
        if (
          (key === 'darkTheme' && kind === 'mobile') ||
          (key === 'darkThemeMobile' && kind === 'desktop')
        ) {
          return;
        }
        const map = manipulatorMap[key];
        if (map) {
          const [target, name] = map;
          manipulators.push({ target, name, parameters: [value.toString()] });
        }
      }
    });

    if (kind) {
      // TODO: Clean this up.
      const locks = kind === 'desktop' ? colorLockDesktop : colorLockMobile;
      const params = Object.entries(locks)
        .filter(([, y]) => y)
        .map(([x]) => x);
      manipulators.push({ target: 'pre', name: 'lock', parameters: params });
      const edits = kind === 'desktop' ? colorEditDesktop : colorEditMobile;
      Object.entries(edits).forEach(([oldColor, newColor]) =>
        manipulators.push({
          target: 'post',
          name: 'editColor',
          parameters: ['hsl', oldColor, newColor],
        })
      );
    }

    return svgService.performManipulations({
      type: 'svg',
      element: svg as string,
      manipulation: manipulators,
    });
  };

  const handleSetDesktopImages = (original: string, payload: SvgManipulationOutput) => {
    setImages((prev) => ({
      ...prev,
      imageDesktop: original,
    }));
    setSvgLightDesktop(payload.lightSvg);
    const renamedDark = ColorHelper.renameDefsClass(payload.darkSvg);
    setSvgOriginalDesktop(renamedDark);
    setSvgDarkDesktop(renamedDark);
    setColorLight(payload.lightColors);
    setColorDark(payload.darkColors);
    setColorOriginalDesktop(payload.darkColors);
  };

  const handleSetMobileImages = (original: string, payload: SvgManipulationOutput) => {
    setImages((prev) => ({
      ...prev,
      imageMobile: original,
    }));
    setSvgLightMobile(ColorHelper.renameDefsClass(payload.lightSvg));
    const renamedDark = ColorHelper.renameDefsClass(payload.darkSvg);
    setSvgOriginalMobile(renamedDark);
    setSvgDarkMobile(renamedDark);
    setColorLightMobile(payload.lightColors);
    setColorDarkMobile(payload.darkColors);
    setColorOriginalMobile(payload.darkColors);
  };

  const handleLoadImages = async (fileMobile: File[], fileDesktop: File[]) => {
    handleResetSvgValues();
    setSvgOriginalDesktop(null);
    setSvgLightDesktop(null);
    setSvgDarkDesktop(null);

    setSvgOriginalMobile(null);
    setSvgLightMobile(null);
    setSvgDarkMobile(null);

    FileHelpers.readFile(async (value) => {
      const reply = await handleApiCall(value as string, 'desktop');
      handleSetDesktopImages(value as string, reply.data);
    }, fileDesktop[0]);

    if (fileMobile.length > 0) {
      FileHelpers.readFile(async (value) => {
        const reply = await handleApiCall(value as string, 'mobile');
        handleSetMobileImages(value as string, reply.data);
      }, fileMobile[0]);
    }
  };

  async function handleResetDefaultColorsMobile() {
    const reply = await handleApiCall(svgLightMobile as string, 'mobile');
    handleSetMobileImages(svgLightMobile as string, reply.data);
  }

  async function handleResetDefaultColorsDesktop() {
    const reply = await handleApiCall(svgLightDesktop as string, 'desktop');
    handleSetDesktopImages(svgLightDesktop as string, reply.data);
  }

  useEffect(() => {
    handleResetDefaultColorsDesktop();
  }, [colorEditDesktop, colorLockDesktop]);

  useEffect(() => {
    handleResetDefaultColorsMobile();
  }, [colorEditMobile, colorLockMobile]);

  const handleColorLockMobile = async (oldColor: string, _newColor: string) => {
    colorLockMobile[oldColor] = !colorLockMobile[oldColor];
    setColorLockMobile(colorLockMobile);
    const reply = await handleApiCall(svgLightMobile as string, 'mobile');
    handleSetMobileImages(svgLightMobile as string, reply.data);
  };

  const handleColorLockDesktop = async (oldColor: string, _newColor: string) => {
    colorLockDesktop[oldColor] = !colorLockDesktop[oldColor];
    setColorLockDesktop(colorLockDesktop);
    const reply = await handleApiCall(svgLightDesktop as string, 'desktop');
    handleSetDesktopImages(svgLightDesktop as string, reply.data);
  };

  const handleChangeImageMobileColor = async (oldColor: string, newColor: string) => {
    colorEditMobile[oldColor] = newColor;
    setColorEditMobile(colorEditMobile);
    const reply = await handleApiCall(svgLightMobile as string, 'mobile');
    handleSetMobileImages(svgLightMobile as string, reply.data);
  };

  const handleChangeImageDesktopColor = async (oldColor: string, newColor: string) => {
    colorEditDesktop[oldColor] = newColor;
    setColorEditDesktop(colorEditDesktop);
    const reply = await handleApiCall(svgLightDesktop as string, 'desktop');
    handleSetDesktopImages(svgLightDesktop as string, reply.data);
  };

  const handleChangeDarkThemeDesktop = async () => {
    const reply = await handleApiCall(svgLightDesktop as string, 'desktop');
    handleSetDesktopImages(svgLightDesktop as string, reply.data);
  };

  const handleChangeDarkThemeMobile = async () => {
    const reply = await handleApiCall(svgLightMobile as string, 'mobile');
    handleSetMobileImages(svgLightMobile as string, reply.data);
  };

  const handleApplyChangesToMobile = (
    originalColorsDark: (string | string[])[],
    changedColorsDark: (string | string[])[]
  ) => {
    // Format of this array: [('#ed5353 #028408', '#944e4e #06c')];
    const newOldOriginalColors = arrayNewAndOldColor(
      changedColorsDark,
      originalColorsDark
    ) as string[];
    let originalDarkMobileSVG = svgOriginalMobile as string;
    const arrNewOriginColors = Array.isArray(newOldOriginalColors[0])
      ? newOldOriginalColors[0]
      : newOldOriginalColors;

    arrNewOriginColors.forEach((item) => {
      const [newColor, oldColor] = item.split(' ');
      matchColorDeskTopMobile.forEach((color) => {
        if (color === oldColor) {
          originalDarkMobileSVG = ColorHelper.changeSVGColor(
            originalDarkMobileSVG,
            oldColor,
            newColor
          );

          // This condition checks that if two image just have some same fields
          if (matchColorDeskTopMobile.length !== arrNewOriginColors.length) {
            const newOldCurrentColors = arrayNewAndOldColor(
              ColorHelper.getColorsFromSVGStyle(svgDarkMobile as string),
              ColorHelper.getColorsFromSVGStyle(originalDarkMobileSVG)
            ) as string[];

            // This code allow to keep colors on mobile that is not matched with desktop
            (Array.isArray(newOldCurrentColors[0]) ? newOldCurrentColors[0] : newOldCurrentColors)
              .filter((i: string[]) => i.indexOf(newColor) === -1)
              .forEach((current: string) => {
                const [currentNewColor, currentOldColor] = current.split(' ');
                originalDarkMobileSVG = ColorHelper.changeSVGColor(
                  originalDarkMobileSVG,
                  currentOldColor,
                  currentNewColor
                );
              });
          }
        }
      });
    });

    setSvgDarkMobile(originalDarkMobileSVG);

    return originalDarkMobileSVG;
  };

  const initialize = () => {
    const svg = SessionStoreHelper.getComplex<{ count?: number }>(STORAGE_KEY.SVG);

    setIsInitialized(true);

    return svg;
  };

  useEffect(() => {
    if (svgOriginalDesktop && svgDarkMobile) {
      setMatchColorDeskTopMobile(
        getMatchingColors(
          ColorHelper.enumerateColorsInPalette(colorLight),
          ColorHelper.enumerateColorsInPalette(colorLightMobile)
        )
      );
    }
  }, [svgOriginalDesktop, svgOriginalMobile]);

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, []);

  const value = useMemo<SvgProviderType>(
    () => ({
      images,
      onLoadImages: handleLoadImages,
      onChangeImageMobileColor: handleChangeImageMobileColor,
      onChangeImageDesktopColor: handleChangeImageDesktopColor,
      onResetDefaultColorsMobile: handleResetSvgValuesMobile,
      onResetDefaultColorsDesktop: handleResetSvgValuesDesktop,
      onApplyChangesToMobile: handleApplyChangesToMobile,
      onColorLockMobile: handleColorLockMobile,
      onColorLockDesktop: handleColorLockDesktop,
      onResetSvgValues: handleResetSvgValues,
      onChangeDarkThemeDesktop: handleChangeDarkThemeDesktop,
      onChangeDarkThemeMobile: handleChangeDarkThemeMobile,
      onMakeSmartSvg: makeSmartSvg,
      svgLightDesktop,
      svgDarkDesktop,
      svgLightMobile,
      setSvgDarkMobile,
      svgDarkMobile,
      svgOriginalDesktop,
      svgOriginalMobile,
      matchColorDeskTopMobile,
      colorDark,
      colorLight,
      setColorDark,
      setColorLight,
      colorDarkMobile,
      colorLightMobile,
      setColorDarkMobile,
      setColorLightMobile,
      colorOriginalDesktop,
      colorOriginalMobile,
      colorLockDesktop,
      colorLockMobile,
    }),
    [
      images,
      handleLoadImages,
      handleChangeImageMobileColor,
      handleChangeImageDesktopColor,
      handleResetDefaultColorsMobile,
      handleResetDefaultColorsDesktop,
      handleApplyChangesToMobile,
      handleColorLockMobile,
      handleColorLockDesktop,
      handleResetSvgValues,
      handleChangeDarkThemeDesktop,
      svgLightDesktop,
      svgDarkDesktop,
      svgLightMobile,
      svgDarkMobile,
      setSvgDarkMobile,
      svgOriginalDesktop,
      svgOriginalMobile,
      matchColorDeskTopMobile,
      colorDark,
      colorLight,
      setColorDark,
      setColorLight,
      colorDarkMobile,
      colorLightMobile,
      setColorDarkMobile,
      setColorLightMobile,
      colorOriginalDesktop,
      colorOriginalMobile,
      makeSmartSvg,
      colorLockDesktop,
      colorLockMobile,
    ]
  );

  return <SvgContext.Provider value={value}>{children}</SvgContext.Provider>;
};
