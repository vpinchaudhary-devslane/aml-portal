/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BE_BASE_URL: string;
  readonly VITE_REACT_APP_ENV: 'development' | 'staging' | 'production';
  readonly VITE_APP_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
