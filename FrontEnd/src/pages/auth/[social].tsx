import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

import { setUserDataAtom, setJWTAtom } from "@/stores/actions";
import { verifyLoginAsync } from "@/apis/auth";
import type { VerifyState, SocialPlatform } from "@/constants/social";
import LoginTemplate from "@/components/template/LoginTemplate";

const SocialLogin = () => {
  const router = useRouter();
  const [verifyState, setVerifyState] = useState<VerifyState>("Pending");
  const [, setUserData] = useAtom(setUserDataAtom);
  const [, setJWT] = useAtom(setJWTAtom);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const verifySocialLogin = async () => {
      const code = router.query.code as string;
      const social = router.query.social as SocialPlatform;
      const result = await verifyLoginAsync(social, code);
      if (result != null) {
        const { accessToken, refreshToken, userData } = result;
        setJWT({ accessToken, refreshToken });
        setUserData(userData);
        router.replace("/");
      } else {
        setVerifyState("Rejected");
        router.replace("/login");
      }
    };

    verifySocialLogin();
  }, [router]);

  return <LoginTemplate verifyState={verifyState} />;
};

export default SocialLogin;
