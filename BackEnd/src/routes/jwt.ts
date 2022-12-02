import { Request, Response, NextFunction } from 'express';

import { UnauthorizedError } from '@/errors/definedErrors';
import { wrapAsync } from '@/utils/wrapAsync';
import { verifyJWT } from '@/auth/jwt';

/**
 * 요청에 담긴 엑세스 토큰의 유무를 확인하는 미들웨어
 */
export const checkLoggedIn = wrapAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      throw new UnauthorizedError(
        '요청의 헤더에 엑세스 토큰이 존재하지 않습니다.',
      );
    }

    const uuid = await verifyJWT(accessToken);
    req.uuid = uuid;

    next();
  },
);

/**
 * 만약 요청 헤더에 토큰이 있다면, 유저의 uuid를 담아 요청에 담는 함수
 */
export const getUserUUID = wrapAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization;

    if (accessToken) {
      const uuid = await verifyJWT(accessToken);
      req.uuid = uuid;
    }

    next();
  },
);
