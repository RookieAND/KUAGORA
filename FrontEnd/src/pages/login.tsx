import Script from "next/script";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

import { accessTokenSelector, IAccessToken } from "../stores/auth";
import LoginTemplate from "@/components/template/LoginTemplate";

const Login = () => {
  const router = useRouter();
  const accessToken = useRecoilValue<IAccessToken>(accessTokenSelector);
  const isLogin = accessToken != null;

  // 이미 로그인이 되어 있다면, 이전 화면으로 되돌림.
  if (isLogin) {
    () => router.back();
  }

  return (
    <>
      <Script
        type="text/javascript"
        src="https://developers.kakao.com/sdk/js/kakao.min.js"
        strategy="beforeInteractive"
      />
      <LoginTemplate />
    </>
  );
};

export default Login;
