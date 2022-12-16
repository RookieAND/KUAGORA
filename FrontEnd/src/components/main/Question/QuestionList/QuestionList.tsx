import * as style from "./QuestionList.style";

import QuestionContext from "@/components/main/Question/QuestionList/QuestionContext";
import { QuestionPostType } from "@/apis/question";

interface QuestionListProps {
  questions: QuestionPostType[] | undefined;
}

const QuestionList = ({ questions }: QuestionListProps) => {
  return (
    <style.Wrapper>
      <style.QuestionBox>
        {questions &&
          questions.map(({ id, title, likeCount, commentCount, state }: QuestionPostType) => (
            <QuestionContext
              title={title}
              like={likeCount}
              comment={commentCount}
              state={state}
              questionId={id}
              key={id}
            />
          ))}
      </style.QuestionBox>
    </style.Wrapper>
  );
};

export default QuestionList;
