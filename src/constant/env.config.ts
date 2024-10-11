const ENV_CONFIG = {
  BACKEND_URL: import.meta.env.VITE_BE_BASE_URL!,
  APP_ENV: import.meta.env.VITE_REACT_APP_ENV!,
  APP_VERSION: import.meta.env.VITE_APP_VERSION!,
};

export default ENV_CONFIG;
