import * as style from "./QuestionDetail.style";
interface QuestionDetailProps {
  content: string;
}

const QuestionDetail = ({ content }: QuestionDetailProps) => {
  return (
    <style.Wrapper>
      <style.Content>{content}</style.Content>
    </style.Wrapper>
  );
};

export default QuestionDetail;
