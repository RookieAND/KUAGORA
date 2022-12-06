import * as style from "./QuestionDetail.style";

import CommentSvg from "@/assets/icons/Comment.svg";
import { KeywordDataType } from "@/apis/question";

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
      <style.CommentBox>
        <style.IconWrap>
          <CommentSvg />
        </style.IconWrap>
        <style.CommentInput placeholder="댓글을 입력해주세요." maxLength={30} minLength={1} />
      </style.CommentBox>
    </style.Wrapper>
  );
};

export default QuestionDetail;
