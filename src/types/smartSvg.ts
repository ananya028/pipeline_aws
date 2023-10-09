export interface Manipulator {
  target: string;
  name: string;
  parameters: string[];
}

export type NamedColor = [string, string];
export type GradientColor = NamedColor[];
export type NamedColorList = (NamedColor | GradientColor)[];

export interface SvgManipulationInput {
  type: string;
  element: string;
  manipulation: Manipulator[];
}

export interface SvgManipulationOutput {
  lightSvg: string;
  darkSvg: string;
  lightColors: NamedColorList;
  darkColors: NamedColorList;
  id: number;
}

export interface MakeItSmartInput {
  lightSvg: {
    desktop: string;
    mobile?: string;
  };
  darkSvg?: {
    desktop: string;
    mobile?: string;
  };
  breakpoint?: number;
}

export interface MakeItSmartOutput {
  smartSvg: string;
}
