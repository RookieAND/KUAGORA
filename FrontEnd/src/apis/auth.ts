import type { APIResult } from "@/apis/API";
import { postAsync, deleteAsync } from "@/apis/API";
import type { IAccessToken, IUserData } from "@/stores/atoms";
import type { SocialPlatform } from "@/constants/social";

interface LoginResultType {
  token: string;
}

interface VerifyAsyncProps {
  code: string;
}

export interface VerifyAsyncResult {
  userData: IUserData;
  accessToken: IAccessToken;
  refreshToken: IAccessToken;
}

/**
 * 발급 받은 JWT 토큰을 통해 로그인을 진행하는 함수.
 * @param token JWT 액세스 토큰
 */
export async function loginAsync(social: SocialPlatform, token: string): APIResult<LoginResultType> {
  const result = await postAsync<LoginResultType, null>(`/auth/login/${social}`, null, {
    headers: {
      Authorization: token
    }
  });

  return result;
}

/**
 * 사용자의 로그아웃을 진행하도록 하는 함수
 * @param token 사용자가 소유한 엑세스 토큰
 */
export async function logoutAsync(token: string) {
  const response = await deleteAsync<null, null>(`/auth/logout`, {
    headers: {
      Authorization: token
    }
  });
  return response.isSuccess;
}

/**
 * 소셜 플랫폼으로부터 인계 받은 code를 넘겨 토큰을 받는 함수
 * @param social 인증을 진행한 소셜 플랫폼 타입
 * @param code 플랫폼으로부터 넘겨 받은 인증 코드
 * @returns 서버로부터 발급한 유저의 JWT
 */
export const verifyLoginAsync = async (social: SocialPlatform, code: string): Promise<VerifyAsyncResult | null> => {
  const resData = await postAsync<VerifyAsyncResult, VerifyAsyncProps>(`/auth/verify/${social}`, {
    code
  });

  if (resData.isSuccess) {
    const { accessToken, refreshToken, userData } = resData.result;
    return { accessToken, refreshToken, userData };
  }
  return null;
};
