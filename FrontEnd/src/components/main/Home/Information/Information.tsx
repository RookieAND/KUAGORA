import * as style from "./Information.style";

import TitleBox from "~/src/components/common/TitleBox";
import InfoGuide from "@/components/main/Home/Information/InfoGuide";
import {
  InfoGuideContent,
  InfoGuideProps
} from "@/components/main/Home/Information/InfoGuide";

const Information = () => {
  return (
    <style.Wrapper>
      <TitleBox
        title={"지식의 요람"}
        subTitle={"지식의 요람, [KU : AGORA] 에 대해 소개합니다."}
      />
      {InfoGuideContent.map(
        ({ textDirection, title, desc }: InfoGuideProps) => (
          <InfoGuide
            textDirection={textDirection}
            title={title}
            desc={desc}
            key={`${title}-${desc}`}
          />
        )
      )}
    </style.Wrapper>
  );
};

export default Information;
