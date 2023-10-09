import { defineConfig, loadEnv } from 'vite';
import * as path from 'path';
import viteImagemin from 'vite-plugin-imagemin';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import EnvironmentPlugin from 'vite-plugin-environment';
import Sitemap from 'vite-plugin-sitemap';

const names = [
  '',
  'login',
  'signup',
  'forgot-password',
  'reset-password',
  'home',
  'logo',
  'icon',
  'illustrations',
  'favicon',
  'settings',
  'upload-file',
  'preview',
];
const dynamicRoutes = names.map((name) => `/${name}`);
const envVariables = loadEnv(process.env.NODE_ENV || 'mock', process.cwd(), '');
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    EnvironmentPlugin('all'),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
    Sitemap({ dynamicRoutes, hostname: envVariables.VITE_HOST_NAME }),
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
