import { postAsync, APIResult, deleteAsync } from "./API";
import { IAccessToken, IUserData } from "@/stores/atoms";
import { SocialPlatform } from "@/constants/social";

interface loginResultType {
  token: string;
}

interface verifyAsyncProps {
  code: string;
}

export interface verifyAsyncResult {
  userData: IUserData;
  access_token: IAccessToken;
  refresh_token: IAccessToken;
}

/**
 * 발급 받은 JWT 토큰을 통해 로그인을 진행하는 함수.
 * @param token JWT 액세스 토큰
 */
export async function loginAsync(
  social: SocialPlatform,
  token: string
): APIResult<loginResultType> {
  const result = await postAsync<loginResultType, null>(
    `/auth/login/${social}`,
    null,
    {
      headers: {
        Authorization: token
      }
    }
  );

  return result;
}

/**
 * 사용자의 로그아웃을 진행하도록 하는 함수
 * @param token 사용자가 소유한 엑세스 토큰
 */
export async function logoutAsync(token: IAccessToken) {
  const response = await deleteAsync<loginResultType, null>(`/auth/logout`, {
    headers: {
      Authorization: token ?? ""
    }
  });
  // 액세스 토큰이 만료되었을 경우, 리프레시 토큰을 보내고 재전송.
  if (!response.isSuccess && response.result.statusCode == 460) {
    
  }
  return response.isSuccess;
}

/**
 * 소셜 플랫폼으로부터 인계 받은 code를 넘겨 토큰을 받는 함수
 * @param social 인증을 진행한 소셜 플랫폼 타입
 * @param code 플랫폼으로부터 넘겨 받은 인증 코드
 * @returns 서버로부터 발급한 유저의 JWT
 */
export const verifyLoginAsync = async (
  social: SocialPlatform,
  code: string
): Promise<verifyAsyncResult | null> => {
  const resData = await postAsync<verifyAsyncResult, verifyAsyncProps>(
    `/auth/verify/${social}`,
    {
      code
    }
  );

  if (resData.isSuccess) {
    const { access_token, refresh_token, userData } = resData.result;
    return { access_token, refresh_token, userData };
  }
  return null;
};
