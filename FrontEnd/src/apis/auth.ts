import { postAsync, APIResult } from "./API";

export type SocialPlatform = "google" | "kakao" | "naver";

interface loginResultType {
  token: string;
}

/**
 * 발급 받은 JWT 토큰을 통해 로그인을 진행하는 함수.
 * @param token JWT 액세스 토큰
 */
export async function loginAsync(
  social: SocialPlatform,
  token: string
): APIResult<loginResultType> {
  const result = await postAsync<loginResultType, any>(
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
