import * as style from "./LoginTemplate.style";
import BackgroundImg from "@/assets/images/Headline.jpg";

import LoginBox from "@/components/main/Login/LoginBox";

const LoginTemplate = () => {
  return (
    <style.Wrapper image={BackgroundImg}>
      <style.Section>
        <LoginBox />
      </style.Section>
    </style.Wrapper>
  );
};

export default LoginTemplate;
