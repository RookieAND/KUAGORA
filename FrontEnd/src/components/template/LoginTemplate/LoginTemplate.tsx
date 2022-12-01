import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";

import { accessTokenSelector, IAccessToken } from "@/stores/auth";
import * as style from "./LoginTemplate.style";

import Navbar from "@/components/common/Navbar";
import LoginSection from "@/components/main/Login/LoginSection";
import LoginBox from "@/components/main/Login/LoginBox";
import Footer from "@/components/common/Footer";

const LoginTemplate = () => {
  const accessToken = useRecoilValue<IAccessToken>(accessTokenSelector);
  const router = useRouter();

  const isLogin = accessToken != null;
  const currentPath = router.pathname;

  // 로그인을 이미 했다면, 이전 페이지로 돌려보냄.
  if (isLogin) {
    () => router.back();
  }

  return (
    <>
      <Navbar isLogin={isLogin} currentPath={currentPath} />
      <style.Section>
        <LoginBox />
        <LoginSection />
      </style.Section>
      <Footer />
    </>
  );
};

export default LoginTemplate;
