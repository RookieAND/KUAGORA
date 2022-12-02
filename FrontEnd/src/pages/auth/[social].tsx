import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { useEffect } from "react";

import { setUserDataAtom, getAccessTokenAtom } from "@/stores/actions";
import { verifyLoginAsync } from "@/apis/auth";
import { SocialPlatform } from "@/apis/auth";
import MainTemplate from "@/components/template/MainTemplate";

const SocialLogin = () => {
  const router = useRouter();
  const [, setUserData] = useAtom(setUserDataAtom);
  const [, setAccessToken] = useAtom(getAccessTokenAtom);

  useEffect(() => {
    const verifySocialLogin = async () => {
      const code = router.query.code as string;
      const social = router.query.social as SocialPlatform;
      const result = await verifyLoginAsync(social, code);
      if (result) {
        setAccessToken(result.token);
        setUserData(result.userData);
        router.push("/");
      }
    };

    verifySocialLogin();
  }, [router]);

  return <MainTemplate />;
};

// export const getServerSideProps: GetServerSideProps = async context => {
//   const code = context.query.code as string;
//   const social = context.query.social as SocialPlatform;
//   const token = await verifyLoginAsync(social, code);
//   return { props: { token: token } };
// };

export default SocialLogin;
