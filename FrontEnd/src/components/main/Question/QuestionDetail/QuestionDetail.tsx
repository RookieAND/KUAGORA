import * as style from "./QuestionDetail.style";
import type { KeywordDataType } from "@/apis/question";

interface QuestionDetailProps {
  content: string;
  keywords: KeywordDataType[];
  state: "progressed" | "completed";
}

const QuestionDetail = ({ content, keywords, state }: QuestionDetailProps) => {
  return (
    <style.Wrapper>
      <style.KeywordBox>
        {keywords &&
          keywords.length > 0 &&
          keywords.map((keyword: KeywordDataType) => (
            <style.Keyword state={state} key={keyword.id}>{`#${keyword.content}`}</style.Keyword>
          ))}
      </style.KeywordBox>
      <style.Content>{content}</style.Content>
    </style.Wrapper>
  );
};

export default QuestionDetail;
