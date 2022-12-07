import * as style from "./QuestionContext.style";

import CommentSvg from "@/assets/icons/Comment.svg";
import LikeSvg from "@/assets/icons/Like.svg";

import { useRouter } from "next/router";
import { omitTitleText } from "@/utils/omitTitleText";

export interface QuestionContextProps {
  title: string;
  like: number;
  comment: number;
  questionId: number;
  state: "progressed" | "completed";
}

const QuestionContext = ({ title, like, comment, state, questionId }: QuestionContextProps) => {
  const router = useRouter();

  const moveToQuestion = (id: number) => {
    router.push(`/question/${id}`);
  };

  return (
    <style.Wrapper onClick={() => moveToQuestion(questionId)}>
      <style.Title>{omitTitleText(title, 30, "...")}</style.Title>
      <style.BottomBox className={state}>
        <style.BottomContent>
          <CommentSvg />
          <p>{comment}</p>
        </style.BottomContent>
        <style.BottomContent>
          <LikeSvg />
          <p>{like}</p>
        </style.BottomContent>
      </style.BottomBox>
    </style.Wrapper>
  );
};

export default QuestionContext;
