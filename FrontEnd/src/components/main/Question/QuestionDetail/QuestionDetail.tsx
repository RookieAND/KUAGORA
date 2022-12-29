import * as style from "./QuestionDetail.style";

import { KeywordDataType, LikeDataType } from "@/apis/question";

interface QuestionDetailProps {
  content: string;
  keywords: KeywordDataType[];
}

const QuestionDetail = ({ content, keywords }: QuestionDetailProps) => {
  return (
    <style.Wrapper>
      <style.KeywordBox>
        {keywords &&
          keywords.length > 0 &&
          keywords.map((keyword: KeywordDataType) => (
            <style.Keyword key={keyword.id}>{`#${keyword.content}`}</style.Keyword>
          ))}
      </style.KeywordBox>
      <style.Content>{content}</style.Content>
    </style.Wrapper>
  );
};

export default QuestionDetail;
