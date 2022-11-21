export const DEV_CONFIG = {
  mode: 'dev',
  port: '8000',
  baseURL: 'http://localhost:3000',
  socialAuthURL: {
    google: 'http://localhost:8000/auth/google/callback',
    kakao: 'http://localhost:8000/auth/kakao/callback',
    discord: 'http://localhost:8000/auth/discord/callback',
  },
  db: {
    port: '3306',
    database: 'kuagora-dev',
  },
} as const;

export const PROD_CONFIG = {
  mode: 'dev',
  port: '8000',
  baseURL: 'http://localhost:3000',
  socialAuthURL: {
    google: 'http://localhost:8000/auth/google/callback',
    kakao: 'http://localhost:8000/auth/kakao/callback',
    discord: 'http://localhost:8000/auth/discord/callback',
  },
  db: {
    port: '3306',
    database: 'kuagora',
  },
} as const;
