import axios from 'axios';

import { PROD_CONFIG, DEV_CONFIG } from '@/constants/index';
import { UnauthorizedError, InternalServerError } from '@/errors/definedErrors';
import { getUserByEmail, registerUser } from '@/database/controllers/user';

const CURRENT_CONFIG =
  process.env.NODE_ENV === 'production' ? PROD_CONFIG : DEV_CONFIG;

/**
 * 인계받은 승인 코드를 통해 카카오 측에게 토큰을 받는 함수
 * @param code 클라이언트에서 로그인 인증 후 받은 승인 코드
 * @returns 카카오 측으로부터 인계 받은 토큰, 없을 시 null 리턴
 */
export const verifyKakao = async (code: string) => {
  let resData;
  try {
    const response = await axios.post(
      `https://kauth.kakao.com/oauth/token`,
      {
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_CLIENT_ID,
        redirect_url: `${CURRENT_CONFIG['socialAuthURL']}/kakao`,
        code,
      },
      {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
    );
    resData = response.data;
  } catch (err) {
    throw new InternalServerError(
      '카카오 측에서 토큰을 발급받는 과정에서 문제가 발생했습니다.',
    );
  }

  if (resData) {
    // 인계받은 토큰을 통해 유저 정보를 받아오는 함수 실행.
    const token = resData.access_token;
    const userData = await getUserInfoFromKakao(token);
    if (userData) {
      return userData;
    }
  }

  return null;
};

/**
 * 카카오 측에서 전달받은 token이 유효한지를 체크한 후,
 * 유효성 보장이 완료되었다면 유저 정보를 리턴하는 함수.
 *
 * @param token 카카오 측에서 전달받은 엑세스 토큰
 * @returns 유저의 이메일, 이름, 로그인 타입이 담긴 객체
 */
const getUserInfoFromKakao = async (token: string) => {
  let resData;
  try {
    const response = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
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
    let userData = await getUserByEmail(email, socialPlatform);
    if (!userData) {
      userData = await registerUser(nickname, email, socialPlatform);
    }

    return userData;
  }

  return null;
};
