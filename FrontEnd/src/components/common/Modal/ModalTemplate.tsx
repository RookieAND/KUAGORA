import * as style from "./ModalTemplate.style";

interface ModalTemplateProps {
  title: string;
  subtitle: string;
  buttonText: string;
  submitFunc: (...arg: any) => any;
}

const ModalTemplate = ({ title, subtitle, buttonText, submitFunc }: ModalTemplateProps) => {
  return (
    <style.Wrapper>
      <style.Title>{title}</style.Title>
      <style.SubTitle>{subtitle}</style.SubTitle>
      <style.SubmitBtn onClick={submitFunc}>{buttonText}</style.SubmitBtn>
    </style.Wrapper>
  );
};

export default ModalTemplate;
