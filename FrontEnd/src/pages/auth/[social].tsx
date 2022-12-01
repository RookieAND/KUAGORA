import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

import { accessTokenSelector, IAccessToken } from "@/stores/auth";
import LoginTemplate from "~/src/components/template/LoginTemplate/LoginTemplate";

const SocialLogin = () => {
  const router = useRouter();
  const accessToken = useRecoilValue<IAccessToken>(accessTokenSelector);
  const isLogin = accessToken != null;

  // 이미 로그인이 되어 있다면, 이전 화면으로 되돌림.
  if (isLogin) {
    () => router.back();
  }

  return <LoginTemplate />;
};

export default SocialLogin;
