import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import path from 'path';
import { fileURLToPath } from 'url';
import { createConnection } from 'typeorm';

import swaggerRouter from './routes/swagger';

import { DEV_CONFIG, PROD_CONFIG } from '@/constants/index';
import typeOrmConfig from '@/database/config/typeormconfig';
import errorHandler from '@/errors/errorHandler';

dotenv.config();

// ES Module 에는 __dirname 변수가 없기에 이를 만들어야 함.
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isProd: boolean = process.env.NODE_ENV === 'production';
const NOW_CONFIG = isProd ? PROD_CONFIG : DEV_CONFIG;

// DB Connection
createConnection(typeOrmConfig[NOW_CONFIG.mode]).then(() => {
  console.log('Successfully connected to DB.');
});

const app = express();

// Security (배포 환경에서만 적용)
if (isProd) {
  app.use(helmet());
  app.use(hpp());
  app.set('trust proxy', true);
}

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Setting
app.use(
  cors({
    origin: isProd ? PROD_CONFIG.baseURL : true,
    credentials: true,
  }),
);

// Router List
app.use('/swagger', swaggerRouter);

app.get('/', (_, res) => {
  res.status(200).send('KUAGORA Server has been Enabled.');
});

// Error Handler
app.use(errorHandler);

app.listen(NOW_CONFIG.port, () => {
  console.log(`server is running on ${NOW_CONFIG.port}`);
});
