import * as style from "./Information.style";

import InfoGuide from "@/components/main/Home/Information/InfoGuide";
import {
  InfoGuideContent,
  InfoGuideProps
} from "@/components/main/Home/Information/InfoGuide";

const Information = () => {
  return (
    <style.Wrapper>
      <style.TitleBox>
        <style.Title>Service</style.Title>
        <style.SubTitle>
          지식의 요람, <strong>KU : AGORA</strong> 에 대해 소개합니다.
        </style.SubTitle>
      </style.TitleBox>
      {InfoGuideContent.map(
        ({ textDirection, title, desc }: InfoGuideProps) => (
          <InfoGuide textDirection={textDirection} title={title} desc={desc} />
        )
      )}
    </style.Wrapper>
  );
};

export default Information;
