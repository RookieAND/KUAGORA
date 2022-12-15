import { RefObject } from "react";
import { QuestionPostType } from "~/src/apis/question";

import * as style from "./QustionPost.style";
import QuestionCard from "@/components/main/Question/QuestionCard";

interface QuestionPostProps {
  questions: QuestionPostType[] | undefined;
  questionRef: RefObject<HTMLDivElement>;
}

const QuestionPost = ({ questions, questionRef }: QuestionPostProps) => {
  return (
    <style.Wrapper ref={questionRef}>
      {questions && questions.length > 0 ? (
        questions.map(({ title, likeCount, commentCount, state, keywords, id }: QuestionPostType) => (
          <QuestionCard
            title={title}
            likeCount={likeCount}
            commentCount={commentCount}
            state={state}
            keywords={keywords}
            id={id}
            key={id}
          />
        ))
      ) : (
        <style.NoticeEmpty>
          <h5>질문글 목록 없음</h5>
          <p>현재 등록된 질문글이 없습니다.</p>
        </style.NoticeEmpty>
      )}
    </style.Wrapper>
  );
};

export default QuestionPost;
