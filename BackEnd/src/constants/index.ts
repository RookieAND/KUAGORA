export const DEV_CONFIG = {
  mode: 'dev',
  port: '4000',
  baseURL: 'http://localhost:3000',
  socialAuthURL: 'http://localhost:3000/auth',
  db: {
    port: '3306',
    database: 'kuagora-dev',
  },
} as const;

export const PROD_CONFIG = {
  mode: 'dev',
  port: '8000',
  baseURL: 'http://kuagora.app',
  socialAuthURL: 'http://kuagora.app/auth',
  db: {
    port: '3306',
    database: 'kuagora',
  },
} as const;
