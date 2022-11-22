export const DEV_CONFIG = {
  mode: 'dev',
  port: '4000',
  baseURL: 'http://localhost:3000',
  socialAuthURL: {
    google: 'http://localhost:4000/auth/google/callback',
    kakao: 'http://localhost:4000/auth/kakao/callback',
  },
  db: {
    port: '3306',
    database: 'kuagora-dev',
  },
} as const;

export const PROD_CONFIG = {
  mode: 'dev',
  port: '8000',
  baseURL: 'http://kuagora.app',
  socialAuthURL: {
    google: 'http://api.kuagora.app/auth/google/callback',
    kakao: 'http://api.kuagora.app/auth/kakao/callback',
  },
  db: {
    port: '3306',
    database: 'kuagora',
  },
} as const;
