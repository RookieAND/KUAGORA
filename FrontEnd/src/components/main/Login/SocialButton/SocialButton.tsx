import Link from "next/link";

import { SocialPlatform, SOCIAL_LOGIN_URL } from "@/constants/social";

import * as styles from "./SocialButton.style";
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
        <Link href={SOCIAL_LOGIN_URL[social]}>{buttonStyle[social].text}</Link>
      </styles.Text>
    </styles.Wrapper>
  );
};

export default SocialButton;
