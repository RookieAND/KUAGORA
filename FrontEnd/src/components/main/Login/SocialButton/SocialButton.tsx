import * as styles from "./SocialButton.style";
import { SocialPlatform } from "@/apis/auth";

import KakaoLogoSvg from "@/assets/icons/KakaoLogo.svg";
import GoogleLogoSvg from "@/assets/icons/GoogleLogo.svg";
import NaverLogoSvg from "@/assets/icons/NaverLogo.svg";

export type ButtonStyleType = {
  [key in SocialPlatform]: {
    text: string;
    textColor: string;
    backgroundColor: string;
    logo: JSX.Element;
  };
};

interface SocialButtonProps {
  social: SocialPlatform;
}

const buttonStyle: ButtonStyleType = {
  kakao: {
    text: "카카오 계정으로 로그인",
    textColor: "#000000",
    backgroundColor: "#FEE500",
    logo: <KakaoLogoSvg />
  },
  google: {
    text: "Google 계정으로 로그인",
    textColor: "#FFFFFF",
    backgroundColor: "#4285F4",
    logo: <GoogleLogoSvg />
  },
  naver: {
    text: "Naver 계정으로 로그인",
    textColor: "#FFFFFF",
    backgroundColor: "#2DB400",
    logo: <NaverLogoSvg />
  }
};

const SocialButton = ({ social }: SocialButtonProps) => {
  return (
    <styles.Wrapper backgroundColor={buttonStyle[social].backgroundColor}>
      <styles.Icon>{buttonStyle[social].logo}</styles.Icon>
      <styles.Text textColor={buttonStyle[social].textColor}>
        {buttonStyle[social].text}
      </styles.Text>
    </styles.Wrapper>
  );
};

export default SocialButton;
