import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";

import { accessTokenSelector, IAccessToken } from "@/stores/auth";

import Navbar from "@/components/common/Navbar";
import LoginBox from "@/components/main/Login/LoginBox";

const LoginTemplate = () => {
  const accessToken = useRecoilValue<IAccessToken>(accessTokenSelector);
  const router = useRouter();

  const isLogin = accessToken != null;
  const currentPath = router.pathname;

  return (
    <>
      <Navbar isLogin={isLogin} currentPath={currentPath} />
      <LoginBox />
    </>
  );
};

export default LoginTemplate;
