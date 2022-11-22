import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { UnauthorizedError } from '@/errors/definedErrors';
import User from '@/database/entity/user';

dotenv.config();

/**
 * 새로운 JWT를 생성하는 함수
 *
 * @param user JWT 생성을 위한 User 데이터
 * @returns User 데이터로 생성된 JWT
 */
export const createJWT = (user: User) => {
  const token = jwt.sign(user, process.env.JWT_SECRET_KEY!);
  return token;
};

/**
 * 기존의 JWT를 디코딩하여 유저의 UUID를 반환하는 함수
 *
 * @param token 디코딩을 진행할 JWT
 * @returns JWT를 디코딩하여 나온 유저의 UUID
 */
export const verifyJWT = async (token: string) => {
  try {
    const decoded_token = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!,
    ) as User;
    return decoded_token.uuid;
  } catch (err) {
    throw new UnauthorizedError('유효하지 않은 JWT 입니다.')
  }
};
