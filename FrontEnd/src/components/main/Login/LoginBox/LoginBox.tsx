import * as styles from "./LoginBox.style";
import { useRouter } from "next/router";

import SocialButton from "@/components/main/Login/SocialButton";

const LoginBox = () => {
  const router = useRouter();
  return (
    <styles.Wrapper>
      <styles.TitleBox>
        <styles.Title>Join Our Service</styles.Title>
        <styles.SubTitle>우리 같이, 더 넓은 지식을 꿈꿔봅시다.</styles.SubTitle>
        <styles.SubTitle>
          하단의 소셜 플랫폼 계정으로 로그인을 진행하세요.
        </styles.SubTitle>
      </styles.TitleBox>
      <styles.ButtonBox>
        <SocialButton social="kakao" />
        <SocialButton social="naver" />
        <SocialButton social="google" />
      </styles.ButtonBox>
      <styles.BackMsg onClick={() => router.push("/")}>
        {"메인 화면으로 돌아가시겠어요? "}
        <strong>돌아가기</strong>
      </styles.BackMsg>
    </styles.Wrapper>
  );
};

export default LoginBox;
