import * as style from "./QuestionDetail.style";
import type { KeywordDataType } from "@/apis/question";

interface QuestionDetailProps {
  content: string;
  keywords: KeywordDataType[];
  isWriter: boolean;
  state: "progressed" | "completed";
}

const QuestionDetail = ({ content, keywords, isWriter, state }: QuestionDetailProps) => {
  return (
    <style.Wrapper>
      <style.KeywordBox>
        {keywords &&
          keywords.length > 0 &&
          keywords.map((keyword: KeywordDataType) => (
            <style.Keyword state={state} key={keyword.id}>{`#${keyword.content}`}</style.Keyword>
          ))}
      </style.KeywordBox>
      {isWriter && (
        <style.ModifyBox>
          <style.ModifyText>{`수정`}</style.ModifyText>
          <style.ModifyText>{`삭제`}</style.ModifyText>
        </style.ModifyBox>
      )}
      <style.Content>{content}</style.Content>
    </style.Wrapper>
  );
};

export default QuestionDetail;
