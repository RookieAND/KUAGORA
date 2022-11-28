import * as style from "./Information.style";

import InfoGuide from "@/components/main/Home/Information/InfoGuide";
import {
  InfoGuideContent,
  InfoGuideProps
} from "@/components/main/Home/Information/InfoGuide";

const Information = () => {
  return (
    <style.Wrapper>
      <style.Title>Information</style.Title>
      {InfoGuideContent.map(
        ({ textDirection, title, desc }: InfoGuideProps) => (
          <InfoGuide textDirection={textDirection} title={title} desc={desc} />
        )
      )}
    </style.Wrapper>
  );
};

export default Information;
