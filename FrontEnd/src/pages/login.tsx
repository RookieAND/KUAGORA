import Script from "next/script";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

import styled from "styled-components";
import { authStateAtom } from "../stores/auth";

import LoginBox from "../components/Login/LoginBox";

const Login = () => {
  const router = useRouter();
  const authState = useRecoilValue(authStateAtom);

  const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  // 이미 로그인이 되어 있다면, 이전 화면으로 되돌림.
  if (authState) {
    router.back();
  }

  return (
    <>
      <Script
        type="text/javascript"
        src="https://developers.kakao.com/sdk/js/kakao.min.js"
        strategy="beforeInteractive"
      />
      <Wrapper>
        <LoginBox />
      </Wrapper>
    </>
  );
};

export default Login;
