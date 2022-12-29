import * as style from "./Information.style";

import InfoGuide from "@/components/main/Home/Information/InfoGuide";
import { InfoGuideContent } from "@/components/main/Home/Information/InfoGuide";
import type { InfoGuideProps } from "@/components/main/Home/Information/InfoGuide";

const Information = () => {
  return (
    <style.Wrapper>
      {InfoGuideContent.map(({ textDirection, title, desc }: InfoGuideProps) => (
        <InfoGuide textDirection={textDirection} title={title} desc={desc} key={`${title}-${desc}`} />
      ))}
    </style.Wrapper>
  );
};

export default Information;
