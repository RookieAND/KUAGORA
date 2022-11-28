import * as style from "./InfoGuide.style";
import InfoGuideImageFirst from "@/assets/images/InfoGuideFirst.png";
import InfoGuideImageSecond from "@/assets/images/InfoGuideSecond.png";

export const InfoGuideContent: InfoGuideProps[] = [
  {
    title: "모두가 함께하는 질문",
    desc: `학교에서 알려주지 않아 해결이 어려웠던 문제들도
학과 선배들에게 묻고 싶었던 여러가지 의문점들도
이제는 KU : AGORA 에서 모두 해결해보세요.`,
    textDirection: "left"
  },
  {
    title: "질문이 쌓여 정보가 되다",
    desc: `내가 궁금했던 질문은 이미 누군가 물어봤을 겁니다.
학우 분들이 만들어간 공간은 지식의 요람이 됩니다.
빼곡히 쌓인 질문들을 KU : AGORA 에서 공유해요.`,
    textDirection: "right"
  }
];

export interface InfoGuideProps {
  textDirection: "left" | "right";
  title: string;
  desc: string;
}

const InfoGuide = ({ textDirection, title, desc }: InfoGuideProps) => {
  return (
    <style.Wrapper>
      {textDirection == "left" ? (
        <>
          <style.Image src={InfoGuideImageFirst} />
          <style.Text>
            <style.Title>{title}</style.Title>
            <style.Desc>{desc}</style.Desc>
          </style.Text>
        </>
      ) : (
        <>
          <style.Text>
            <style.Title>{title}</style.Title>
            <style.Desc>{desc}</style.Desc>
          </style.Text>
          <style.Image src={InfoGuideImageSecond} />
        </>
      )}
    </style.Wrapper>
  );
};

export default InfoGuide;
