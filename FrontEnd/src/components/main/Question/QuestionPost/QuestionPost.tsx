import * as style from "./QustionPost.style";

import { QuestionPostType } from "~/src/apis/question";
import QuestionCard from "../QuestionCard";

interface QuestionPostProps {
  questions: QuestionPostType[];
}

const QuestionPost = ({ questions }: QuestionPostProps) => {
  return (
    <style.Wrapper>
      {questions.length > 0 ? (
        questions.map((post: QuestionPostType) => (
          <QuestionCard
            title={post.title}
            likes={post.likes}
            comments={post.comments}
            state={post.state}
            questionId={post.questionId}
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
