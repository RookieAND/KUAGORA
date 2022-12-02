import { useRouter } from "next/router";
import { NextPage } from "next";
import Head from "next/head";
import { useRecoilValue } from "recoil";

import { accessTokenSelector, IAccessToken } from "@/stores/auth";
import LoginTemplate from "~/src/components/template/LoginTemplate/LoginTemplate";

const Login: NextPage = () => {
  const router = useRouter();
  const accessToken = useRecoilValue<IAccessToken>(accessTokenSelector);
  const isLogin = accessToken != null;

  // 이미 로그인이 되어 있다면, 이전 화면으로 되돌림.
  if (isLogin) {
    router.back();
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#00917C" />
        <link rel="icon" href="/favicon.ico" />
        <title>지식의 요람, KU : AGORA</title>
      </Head>
      <LoginTemplate />
    </>
  );
};

export default Login;
