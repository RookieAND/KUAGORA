import express, { Request, Response, NextFunction } from 'express';

import {
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from '@/errors/definedErrors';
import { wrapAsync } from '@/utils/wrapAsync';
import { createJWT } from '@/auth/jwt';
import { verifyKakao } from '@/auth/platform/verifyKakao';

const authRouter = express.Router();

authRouter.post(
  'login/:social',
  wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization;
    let userData;
    if (accessToken) {
      switch (req.params.social) {
        case 'kakao':
          userData = await verifyKakao(accessToken);
          break;
        default:
          // 미지원 소셜 플랫폼으로 로그인을 시도할 경우, 400 Bad Request 에러 발생
          throw new BadRequestError(
            '지원하지 않는 소셜 플랫폼으로 로그인을 시도했습니다.',
          );
      }
    } else {
      // 엑세스 토큰이 없을 경우, 401 Unauthorization 에러 발생.
      throw new UnauthorizedError(
        '요청의 헤더에 삽입된 JWT 가 유효하지 않습니다.',
      );
    }

    if (userData) {
      const token = createJWT(userData);
      return res.status(200).json({ token });
    }

    // 정상적으로 로그인이 진행되지 않을 경우, 500 Internal Error 발생.
    throw new InternalServerError(
      '소셜 로그인 처리 과정에서 에러가 발생했습니다.',
    );
  }),
);

export default authRouter;
