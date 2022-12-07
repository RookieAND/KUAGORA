import * as style from "./LoginTemplate.style";
import BackgroundImg from "@/assets/images/Headline.jpg";
import LoginBox from "@/components/main/Login/LoginBox";
import { VerifyState } from "@/constants/social";

interface LoginTemplateProps {
  verifyState: VerifyState;
}

const LoginTemplate = ({ verifyState }: LoginTemplateProps) => {
  return (
    <style.Wrapper image={BackgroundImg}>
      <style.Section>
        <LoginBox verifyState={verifyState} />
      </style.Section>
    </style.Wrapper>
  );
};

export default LoginTemplate;
