import { useRouter } from "next/router";

import * as style from "./QuestionCard.style";
import { omitTitleText } from "@/utils/omitTitleText";
import CommentSvg from "@/assets/icons/Comment.svg";
import LikeSvg from "@/assets/icons/Like.svg";

interface QuestionCardProps {
  title: string;
  likes: number;
  comments: number;
  questionId: number;
  state: "progressed" | "completed";
}

const QuestionCard = ({
  title,
  likes,
  comments,
  questionId,
  state
}: QuestionCardProps) => {
  const router = useRouter();
  const moveToQuestionPost = () => router.push(`/question/${questionId}`);

  return (
    <style.Wrapper onClick={moveToQuestionPost}>
      <style.TopSection>
        <style.Title>{omitTitleText(title, 30, "...")}</style.Title>
        <style.StateText>
          {state == "completed" ? "해결된 질문" : "미해결된 질문"}
        </style.StateText>
      </style.TopSection>
      <style.BottomSection state={state}>
        <style.IconWrap>
          <CommentSvg />
          <p>{comments}</p>
        </style.IconWrap>
        <style.IconWrap>
          <LikeSvg />
          <p>{likes}</p>
        </style.IconWrap>
      </style.BottomSection>
    </style.Wrapper>
  );
};

export default QuestionCard;
