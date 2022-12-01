import { useRouter } from "next/router";
import { NextPage } from "next";
import { useRecoilState } from "recoil";

import { accessTokenAtom } from "@/stores/auth";
import { postAsync } from "@/apis/API";
import { SocialPlatform } from "@/apis/auth";
import LoginTemplate from "@/components/template/LoginTemplate/LoginTemplate";

const SocialLogin: NextPage = () => {
  const router = useRouter();
  const code = router.query.code;
  const social = router.query.social;

  // 이미 로그인이 되어 있다면, 이전 화면으로 되돌림.
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
  if (accessToken != null) {
    () => router.back();
  }

  return <LoginTemplate />;
};

export default SocialLogin;
