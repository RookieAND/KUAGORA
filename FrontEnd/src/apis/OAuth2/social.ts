import { SocialPlatform } from "@/apis/OAuth2/auth";
import { postAsync } from "@/apis/API";

const KAKAO_HOST_URL = "https://kauth.kakao.com/oauth";
const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URL = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL;

const NAVER_HOST_URL = "https://nid.naver.com/oauth2.0";
const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
const NAVER_REDIRECT_URL = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URL;

const GOOGLE_HOST_URL = "https://accounts.google.com/o/oauth2/v2";
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const GOOGLE_REDIRECT_URL = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL;

export const SOCIAL_LOGIN_URL = {
  kakao: `${KAKAO_HOST_URL}/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`,
  naver: `${NAVER_HOST_URL}/authorize?client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URL}&response_type=code&state=state`,
  google: `${GOOGLE_HOST_URL}/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URL}&scope=profile%20email&access_type=offline&response_type=code`
};

export const sendCodeToServer = async (
  social: SocialPlatform,
  code: string
) => {
  const resData = await postAsync(`/auth/${social}`, { code });
};
