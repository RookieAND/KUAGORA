import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import * as styles from "./LoginBox.style";
import { VerifyState } from "@/constants/social";
import SocialButton from "@/components/main/Login/SocialButton";

interface LoginBoxProps {
  verifyState: VerifyState;
}

const LoginBox = ({ verifyState }: LoginBoxProps) => {
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState<VerifyState>("Ready");
  useEffect(() => {
    setIsVerifying(verifyState);
  }, []);

  switch (isVerifying) {
    case "Ready":
      return (
        <styles.Wrapper>
          <styles.TitleBox>
            <styles.Title>Join Our Service</styles.Title>
            <styles.SubTitle>
              우리 같이, 더 넓은 지식을 꿈꿔봅시다.
            </styles.SubTitle>
            <styles.SubTitle>
              하단의 소셜 플랫폼 계정으로 로그인을 진행하세요.
            </styles.SubTitle>
          </styles.TitleBox>
          <styles.ButtonBox>
            <SocialButton social="kakao" />
            <SocialButton social="naver" />
            <SocialButton social="google" />
          </styles.ButtonBox>
          <styles.BackMsg onClick={() => router.replace("/")}>
            {"메인 화면으로 돌아가시겠어요? "}
            <strong>돌아가기</strong>
          </styles.BackMsg>
        </styles.Wrapper>
      );
    case "Pending":
      return (
        <styles.Wrapper>
          <styles.TitleBox>
            <styles.Title>Verify Account</styles.Title>
            <styles.SubTitle>
              소셜 플랫폼 로그인 인증을 처리 중입니다.
            </styles.SubTitle>
          </styles.TitleBox>
        </styles.Wrapper>
      );
    case "Rejected":
      return (
        <styles.Wrapper>
          <styles.TitleBox>
            <styles.Title>Verify Failed</styles.Title>
            <styles.SubTitle>
              계정 인증을 실패했습니다. 재로그인 해주세요.
            </styles.SubTitle>
          </styles.TitleBox>
          <styles.BackMsg onClick={() => router.replace("/login")}>
            {"로그인 화면으로 돌아가시겠어요? "}
            <strong>돌아가기</strong>
          </styles.BackMsg>
        </styles.Wrapper>
      );
  }
};

export default LoginBox;
