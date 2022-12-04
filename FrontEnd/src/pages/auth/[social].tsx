import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

import {
  setUserDataAtom,
  refreshTokenAtom,
  accessTokenAtom
} from "@/stores/actions";
import { verifyLoginAsync } from "@/apis/auth";
import { SocialPlatform } from "@/apis/auth";
import { VerifyState } from "@/constants/social";
import LoginTemplate from "@/components/template/LoginTemplate";

const SocialLogin = () => {
  const router = useRouter();
  const [verifyState, setVerifyState] = useState<VerifyState>("Pending");
  const [, setUserData] = useAtom(setUserDataAtom);
  const [, setRefreshToken] = useAtom(refreshTokenAtom);
  const [, setAccessToken] = useAtom(accessTokenAtom);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const verifySocialLogin = async () => {
      const code = router.query.code as string;
      const social = router.query.social as SocialPlatform;
      const result = await verifyLoginAsync(social, code);
      if (result != null) {
        const { access_token, refresh_token, userData } = result;
        setAccessToken(access_token);
        setRefreshToken(refresh_token);
        setUserData(userData);
        router.replace("/");
      } else {
        setVerifyState("Rejected");
      }
    };

    verifySocialLogin();
  }, [router]);

  return <LoginTemplate verifyState={verifyState} />;
};

export default SocialLogin;
