import * as style from "@/components/main/Home/HeadLine/HeadLine.style";
import HeadLineImg from "@/assets/images/Headline.jpg";

const Headline = () => {
  return (
    <style.Wrapper image={HeadLineImg}>
      <style.TextBox>
        <style.MainText>지식의 요람, KU : AGORA</style.MainText>
        <style.SubText>
          겹겹이 쌓인 질문 속에서 해답을 찾아보세요.
        </style.SubText>
      </style.TextBox>
      <style.SubmitButton>지금 질문하기</style.SubmitButton>
    </style.Wrapper>
  );
};

export default Headline;
