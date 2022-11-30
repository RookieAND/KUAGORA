import axios from 'axios';

import { UnauthorizedError } from '@/errors/definedErrors';
import {
  getUserByEmail,
  registerUser,
} from '@/database/controllers/userController';

const verifyKakaoURL = 'https://kapi.kakao.com/v2/user/me';

/**
 * 카카오 측에서 전달받은 token이 유효한지를 체크한 후,
 * 유효성 보장이 완료되었다면 유저 정보를 리턴하는 함수.
 *
 * @param token 카카오 측에서 전달받은 엑세스 토큰
 * @returns 유저의 이메일, 이름, 로그인 타입이 담긴 객체
 */

export const verifyKakao = async (token: string) => {
  let resData;
  try {
    const response = await axios.get(verifyKakaoURL, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    resData = response.data;
  } catch (err) {
    throw new UnauthorizedError(
      '카카오 측에서 발급한 토큰이 유효하지 않습니다.',
    );
  }

  // 카카오 측에서 인계받은 데이터가 있는지를 체크하고 없다면 null 반환.
  if (resData) {
    const socialPlatform = 'kakao';
    const { email } = resData.kakao_account;
    const { nickname } = resData.kakao_account.profile;

    // 인계받은 데이터를 통해 유저 정보를 로드, 없을 경우 회원가입 진행.
    let userData = getUserByEmail(email, socialPlatform);
    if (!userData) {
      userData = registerUser(nickname, email, socialPlatform);
    }

    return userData;
  }

  return null;
};
