import * as style from "./TitleBox.style";

interface TitleBoxProps {
  title: string;
  subTitle: string;
}

const TitleBox = ({ title, subTitle }: TitleBoxProps) => {
  return (
    <style.Wrapper>
      <style.Title>{title}</style.Title>
      <style.SubTitle>{subTitle}</style.SubTitle>
    </style.Wrapper>
  );
};

export default TitleBox;
