import * as style from "./LoginSection.style";
import HeadLineImg from "@/assets/images/Headline.jpg";

const LoginSection = () => {
  return (
    <style.Wrapper image={HeadLineImg}>
      <style.TextBox>
        <style.MainText>Make Our Intelligence</style.MainText>
        <style.SubText>우리 같이, 더 넓은 지식을 꿈꿔봅시다.</style.SubText>
        <style.SubText>KU : AGORA 에서 자신의 정보를 공유해봐요.</style.SubText>
      </style.TextBox>
    </style.Wrapper>
  );
};

export default LoginSection;
