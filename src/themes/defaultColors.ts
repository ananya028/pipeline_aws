interface DefaultColors {
  dark?: string[];
  primary?: string[];
  warning?: string[];
  success?: string[];
  light?: string[];
  grape?: string[];
  cyan?: string[];
  none?: string[];
  opacityWarning?: string[];
  shadow?: string[];
}

export const DEFAULT_COLORS: DefaultColors = {
  dark: ['#666', '#303030', '#171717', '#1d1e30', '#000', '#393939'],
  primary: ['#0066cc', '#0066ccb3'],
  warning: ['#eb5757', '#ff2828', '#df0000'],
  success: ['#219653', '#00a747', '#67ff00'],
  light: ['#f0f2f5', '#f7f7f7', '#bababa', '#d9d9d9', '#efefef', '#e5e5e5', '#fff', '#dadada'],
  grape: ['#eda1eb', '#b02e80', '#660042', '#b30074'],
  cyan: ['#00ccff', '#3792ed', '#0066cc', '#003366'],
  none: ['transparent'],
  opacityWarning: ['rgb(255, 51, 0, 0.2)'],
  shadow: ['0px 2px 8px 0px rgba(0, 0, 0, 0.10)'],
};
