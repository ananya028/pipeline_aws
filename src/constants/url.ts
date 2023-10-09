export const URL = {
  BASE: process.env.VITE_BASE_URL,

  SIGN_UP: '/auth/signup',
  LOGIN: '/auth/signin',
  LOGOUT: '/auth/logout',
  REFRESH_ACCESS_TOKEN: '/auth/refresh-token',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',

  CURRENT_USER: '/users/me',

  PERFORM_SVG_MANIPULATIONS: '/smart-svg',
  MAKE_SMART_SVG: '/make-it-smart',
};
