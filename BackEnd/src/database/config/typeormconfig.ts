import dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';

import { DEV_CONFIG, PROD_CONFIG } from '@/constants/index';

dotenv.config();

interface ormconfigType {
  dev: ConnectionOptions;
  prod: ConnectionOptions;
}

const ormconfig: ormconfigType = {
  dev: {
    type: 'mysql',
    host: process.env.DEV_DB_HOST,
    port: Number(DEV_CONFIG.db.port),
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: DEV_CONFIG.db.database,
    synchronize: true,
    logging: true,
    entities: ['src/database/entity/**/*.ts'],
    migrations: ['src/database/migration/**/*.ts'],
    subscribers: ['src/database/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/database/entity',
      migrationsDir: 'src/database/migration',
      subscribersDir: 'src/database/subscriber',
    },
  },
  prod: {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(PROD_CONFIG.db.port),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: PROD_CONFIG.db.database,
    synchronize: true,
    logging: false,
    entities: ['src/database/entity/**/*.ts'],
    migrations: ['src/database/migration/**/*.ts'],
    subscribers: ['src/database/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/database/entity',
      migrationsDir: 'src/database/migration',
      subscribersDir: 'src/database/subscriber',
    },
  },
};

export default ormconfig;
