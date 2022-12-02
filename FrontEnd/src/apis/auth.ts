import { postAsync, APIResult } from "./API";
import { IAccessToken, IUserData } from "@/stores/atoms";

export type SocialPlatform = "google" | "kakao" | "naver";

interface loginResultType {
  token: string;
}

interface verifyAsyncProps {
  code: string;
}

export interface verifyAsyncResult {
  userData: IUserData;
  token: IAccessToken;
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
    const { token, userData } = resData.result;
    return { token, userData };
  }
  return null;
};
