import * as style from "./QuestionHeadLine.style";
import HeadLineImg from "@/assets/images/Headline.jpg";

interface QuestionHeadlineProps {
  title: string;
  subtitle: string;
}

const QuestionHeadline = ({ title, subtitle }: QuestionHeadlineProps) => {
  return (
    <style.Wrapper image={HeadLineImg}>
      <style.TextBox>
        <style.MainText>{title}</style.MainText>
        <style.SubText>{subtitle}</style.SubText>
      </style.TextBox>
    </style.Wrapper>
  );
};

export default QuestionHeadline;
