import { useRouter } from "next/router";
import { NextPage } from "next";
import { useRecoilValue } from "recoil";

import { accessTokenSelector } from "@/stores/auth";
import { SocialPlatform } from "@/apis/OAuth2/auth";
import LoginTemplate from "@/components/template/LoginTemplate/LoginTemplate";

const SocialLogin: NextPage = () => {
  const router = useRouter();
  const socialType = router.query.social as SocialPlatform;
  const code = router.query.code;

  // 이미 로그인이 되어 있다면, 이전 화면으로 되돌림.
  const accessToken = useRecoilValue(accessTokenSelector);
  if (accessToken != null) {
    () => router.back();
  }

  return <LoginTemplate />;
};

export default SocialLogin;
