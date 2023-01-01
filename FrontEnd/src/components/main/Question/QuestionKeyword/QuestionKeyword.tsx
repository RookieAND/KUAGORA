import * as style from "./QuestionKeyword.style";

import type { KeywordDataType } from "@/apis/question";

interface QuestionKeywordProps {
  keywords: KeywordDataType[];
  state: "progressed" | "completed";
}

const QuestionKeyword = ({ keywords, state }: QuestionKeywordProps) => {
  return (
    <style.Wrapper>
      {keywords.length > 0 &&
        keywords.map((keyword: KeywordDataType) => (
          <style.Keyword key={keyword.id} state={state}>{`#${keyword.content}`}</style.Keyword>
        ))}
    </style.Wrapper>
  );
};

export default QuestionKeyword;
