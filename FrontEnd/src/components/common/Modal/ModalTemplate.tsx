import Lottie from "lottie-react";

import LOTTIE_ICON from "@/constants/styles/lottieIcon";
import * as style from "./ModalTemplate.style";

interface ModalTemplateProps {
  title: string;
  subtitle: string;
  buttonText: string;
  iconType?: keyof typeof LOTTIE_ICON;
  submitFunc: (...arg: any) => any;
}

const ModalTemplate = ({ title, subtitle, buttonText, iconType, submitFunc }: ModalTemplateProps) => {
  return (
    <style.Wrapper>
      <style.IconWrap>
        <Lottie loop={false} animationData={LOTTIE_ICON[iconType || "confirm"]} />
      </style.IconWrap>
      <style.Title>{title}</style.Title>
      <style.SubTitle>{subtitle}</style.SubTitle>
      <style.SubmitBtn onClick={submitFunc}>{buttonText}</style.SubmitBtn>
    </style.Wrapper>
  );
};

export default ModalTemplate;
