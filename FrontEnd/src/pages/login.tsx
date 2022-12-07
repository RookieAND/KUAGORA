import Head from "next/head";
import { useRouter } from "next/router";
import { useAtom } from "jotai";

import { accessTokenAtom } from "@/stores/actions";
import LoginTemplate from "@/components/template/LoginTemplate";

const Login = () => {
  const [accessToken] = useAtom(accessTokenAtom);
  const router = useRouter();

  // 이미 로그인이 되어 있다면, 이전 화면으로 되돌림.
  if (accessToken) {
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
      <LoginTemplate verifyState={"Ready"} />
    </>
  );
};

export default Login;
