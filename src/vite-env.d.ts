/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_END_POINTS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
