import * as styles from "./LoginBox.style";
import SocialButton from "@/components/main/Login/SocialButton";

const LoginBox = () => {
  return (
    <styles.Wrapper>
      <styles.TitleBox>
        <styles.Title>Join Our Service</styles.Title>
        <styles.SubTitle>
          하단의 소셜 플랫폼 계정으로 로그인을 진행하세요.
        </styles.SubTitle>
      </styles.TitleBox>
      <styles.ButtonBox>
        <SocialButton social={"google"} />
        <SocialButton social={"kakao"} />
        <SocialButton social={"naver"} />
      </styles.ButtonBox>
    </styles.Wrapper>
  );
};

export default LoginBox;
