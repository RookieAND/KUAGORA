import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * 새로운 JWT를 생성하는 함수
 */
export const createJWT = (user: string) => {
  const token = jwt.sign(user, process.env.JWT_SECRET_KEY!);
  return token;
};
