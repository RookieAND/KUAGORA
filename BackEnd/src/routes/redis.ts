import { createClient } from 'redis';
import { Request, Response, NextFunction } from 'express';

import { DEV_CONFIG, PROD_CONFIG } from '@/constants/index';
import { wrapAsync } from '@/utils/wrapAsync';

const isProd: boolean = process.env.NODE_ENV === 'production';
const CURRENT_CONFIG = isProd ? PROD_CONFIG : DEV_CONFIG;

/**
 * Redis Connection 을 진행한 후, Client 객체를 사용하도록 하는 미들웨어.
 */
const registerRedis = wrapAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const redisClient = createClient({
      url: `redis://${CURRENT_CONFIG.redis.username}:${CURRENT_CONFIG.redis.password}@${CURRENT_CONFIG.redis.host}:${CURRENT_CONFIG.redis.port}/0`,
    });
    redisClient.connect();
    req.redis = redisClient;

    next();
  },
);

export default registerRedis;
