export interface Logo {
  darkTheme: string;
  darkThemeMobile: string;
  isResponsive: boolean;
  hasAltText: boolean;
  alt: string;
  breakpoint: string;
}

export interface Favicon {
  darkTheme: string;
  favicon: boolean;
}

export interface Illustration {
  isResponsive: boolean;
  darkTheme: string;
  darkThemeMobile: string;
  isDecorative: boolean;
  alt: string;
  description: string;
  breakpoint: string;
}

export interface Icon {
  darkTheme: string;
  isDecorative: boolean;
  alt: string;
}
