import { createClient } from 'redis';
import { DEV_CONFIG, PROD_CONFIG } from '@/constants/index';
import { InternalServerError } from '@/errors/definedErrors';

const isProd: boolean = process.env.NODE_ENV === 'production';
const CURRENT_CONFIG = isProd ? PROD_CONFIG : DEV_CONFIG;

const client = createClient({
  url: `redis://RookieAND:Qorrhkddls1!@redis-14828.c266.us-east-1-3.ec2.cloud.redislabs.com:14828`, // 왜 숨길 수 없는지 원인 찾아야 함.
  socket: {
    connectTimeout: 50000,
  },
});

export const connectRedis = async () => {
  await client.connect();
};

export const getRefreshToken = async (uuid: string) => {
  try {
    const refresh_token = await client.get(uuid);
    return refresh_token;
  } catch (err) {
    console.log(err);
    throw new InternalServerError(
      'Redis 를 처리하던 도중 문제가 발생했습니다.',
    );
  }
};

export const setRefreshToken = async (uuid: string, token: string) => {
  try {
    await client.set(uuid, token);
  } catch (err) {
    console.log(err);
    throw new InternalServerError(
      'Redis 를 처리하던 도중 문제가 발생했습니다.',
    );
  }
};

export const delRefreshToken = async (uuid: string) => {
  try {
    await client.del(uuid);
  } catch (err) {
    console.log(err);
    throw new InternalServerError(
      'Redis 를 처리하던 도중 문제가 발생했습니다.',
    );
  }
};
