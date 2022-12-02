import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";

import { accessTokenAtom, IAccessTokenAtom } from "@/stores/auth";
import { verifyLoginAsync } from "@/apis/auth";
import { SocialPlatform } from "@/apis/auth";
import LoginTemplate from "@/components/template/LoginTemplate/LoginTemplate";

const SocialLogin = ({ token }: IAccessTokenAtom) => {
  const router = useRouter();
  // const setAccessToken = useSetRecoilState(accessTokenAtom);

  useEffect(() => {
    if (!router.isReady) {
      router.reload();
      return;
    }

    if (token != null) {
      console.log(token);
      // setAccessToken({ token });
      router.push("/");
      return;
    }
  }, [router]);

  return <LoginTemplate />;
};

export const getServerSideProps: GetServerSideProps = async context => {
  const code = context.query.code as string;
  const social = context.query.social as SocialPlatform;
  const token = await verifyLoginAsync(social, code);
  return { props: { token: token } };
};

export default SocialLogin;
