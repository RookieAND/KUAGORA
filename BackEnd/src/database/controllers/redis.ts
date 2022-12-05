import { createClient } from 'redis';
import { DEV_CONFIG, PROD_CONFIG } from '@/constants/index';
import { InternalServerError } from '@/errors/definedErrors';

const isProd: boolean = process.env.NODE_ENV === 'production';
const CURRENT_CONFIG = isProd ? PROD_CONFIG : DEV_CONFIG;

const redisClient = async () => {
  const client = createClient({
    url: `redis://${CURRENT_CONFIG.redis.username}:${CURRENT_CONFIG.redis.password}@${CURRENT_CONFIG.redis.host}:${CURRENT_CONFIG.redis.port}`,
    socket: {
      port: Number(CURRENT_CONFIG.redis.port),
      host: CURRENT_CONFIG.redis.host,
      connectTimeout: 50000,
    },
  });
  return client;
};

export const getRefreshToken = async (uuid: string) => {
  try {
    const client = await redisClient();
    await client.connect();
    const refresh_token = await client.get(uuid);
    await client.quit();
    return refresh_token;
  } catch (err) {
    throw new InternalServerError(
      'Redis 를 처리하던 도중 문제가 발생했습니다.',
    );
  }
};

export const setRefreshToken = async (uuid: string, token: string) => {
  try {
    const client = await redisClient();
    await client.connect();
    await client.set(uuid, token);
    await client.quit();
  } catch (err) {
    throw new InternalServerError(
      'Redis 를 처리하던 도중 문제가 발생했습니다.',
    );
  }
};

export const delRefreshToken = async (uuid: string) => {
  try {
    const client = await redisClient();
    await client.connect();
    await client.del(uuid);
    await client.quit();
  } catch (err) {
    throw new InternalServerError(
      'Redis 를 처리하던 도중 문제가 발생했습니다.',
    );
  }
};
