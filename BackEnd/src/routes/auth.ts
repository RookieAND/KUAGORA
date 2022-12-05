import express, { Request, Response, NextFunction } from 'express';
import {
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from '@/errors/definedErrors';
import { wrapAsync } from '@/utils/wrapAsync';
import { createJWT, createRefreshJWT, verifyJWT } from '@/auth/jwt';
import { verifyKakao, verifyNaver, verifyGoogle } from '@/auth/platform';
import {
  setTokenToRedis,
  getTokenFromRedis,
  delTokenFromRedis,
} from '@/database/controllers/redisController';
import { checkLoggedIn } from '@/routes/jwt';

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
      const { uuid } = userData;
      const token = createJWT(uuid);
      const refreshToken = createRefreshJWT();
      await setTokenToRedis(uuid, refreshToken);
      return res
        .status(200)
        .json({ access_token: token, refresh_token: refreshToken, userData });
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
    const uuid = req.uuid as string;
    await delTokenFromRedis(uuid);
    res.end();
  }),
);

authRouter.post(
  `/check-token`,
  wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const uuid = req.body.uuid;
    const refresh_token = req.body.refresh_token;
    if (refresh_token) {
      const result = await getTokenFromRedis(uuid);
      if (result) {
        const newAccessToken = createJWT(uuid);
        const newRefreshToken = createRefreshJWT();
        await setTokenToRedis(uuid, newRefreshToken);
        return res.status(200).json({
          access_token: newAccessToken,
          refresh_token: newRefreshToken,
        });
      }
      throw new BadRequestError(
        '인계받은 리프레시 토큰 값이 유효하지 않습니다.',
      );
    }
    throw new BadRequestError('토큰 갱신을 위한 리프레시 토큰이 없습니다.');
  }),
);

export default authRouter;
