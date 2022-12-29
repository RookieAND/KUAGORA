import express, { Request, Response, NextFunction } from 'express';
import {
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  UnauthorizedError,
} from '@/errors/definedErrors';
import {
  delRefreshToken,
  setRefreshToken,
  getRefreshToken,
} from '@/database/controllers/redis';

import { wrapAsync } from '@/utils/wrapAsync';
import { checkLoggedIn } from '@/routes/jwt';
import { createJWT, createRefreshJWT, verifyJWT } from '@/auth/jwt';
import { verifyKakao, verifyNaver, verifyGoogle } from '@/auth/platform';
const authRouter = express.Router();

authRouter.post(
  '/verify/:social',
  wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const code = req.body.code;
    let userData;
    if (code) {
      switch (req.params.social) {
        case 'kakao':
          userData = await verifyKakao(code);
          break;
        case 'naver':
          userData = await verifyNaver(code);
          break;
        case 'google':
          userData = await verifyGoogle(code);
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
        '요청의 파라미터에 포함된 인증 코드가 없습니다.',
      );
    }

    if (userData) {
      const { uuid, nickname, email } = userData;
      const token = createJWT(uuid);
      const refreshToken = createRefreshJWT(uuid);
      await setRefreshToken(uuid, refreshToken);
      return res
        .status(200)
        .json({
          access_token: token,
          refresh_token: refreshToken,
          userData: { uuid, nickname, email },
        });
    }

    // 정상적으로 로그인이 진행되지 않을 경우, 500 Internal Error 발생.
    throw new InternalServerError(
      '소셜 로그인 처리 과정에서 에러가 발생했습니다.',
    );
  }),
);

authRouter.delete(
  `/logout`,
  checkLoggedIn,
  wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const uuid = req.uuid!;
    await delRefreshToken(uuid);
    res.end();
  }),
);

authRouter.post(
  `/check-token`,
  wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.body.refresh_token as string;
    if (refreshToken) {
      // 1. 클라이언트로부터 인계받은 리프레시 토큰이 유효한지를 조사.
      const uuid = await verifyJWT(refreshToken);
      if (!uuid) {
        throw new ForbiddenError(
          '토큰이 만료되었습니다. 재로그인이 필요합니다.',
        );
      }
      // 2. Redis 에 저장된 토큰이 전달받은 리프레시 토큰과 동일한지 조사
      const storedRefreshToken = await getRefreshToken(uuid);
      if (storedRefreshToken != refreshToken) {
        throw new BadRequestError(
          '리프레시 토큰이 유효하지 않습니다. 재로그인이 필요합니다.',
        );
      }
      // 3. 리프레시 토큰이 유효할 경우, 새롭게 토큰을 발급하여 전달
      const newAccessToken = createJWT(uuid);
      const newRefreshToken = createRefreshJWT(uuid);
      await setRefreshToken(uuid, newRefreshToken);
      return res.status(200).json({
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
      });
    }
    // 리프레시 토큰이 없을 경우, 401 에러 리턴
    throw new BadRequestError('토큰 갱신을 위한 리프레시 토큰이 없습니다.');
  }),
);

export default authRouter;
