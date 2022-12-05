import { useRouter } from "next/router";

import * as style from "./QuestionCard.style";
import { omitTitleText } from "@/utils/omitTitleText";
import CommentSvg from "@/assets/icons/Comment.svg";
import LikeSvg from "@/assets/icons/Like.svg";

interface QuestionCardProps {
  title: string;
  likeCount: number;
  commentCount: number;
  id: number;
  state: "progressed" | "completed";
}

const QuestionCard = ({
  title,
  likeCount,
  commentCount,
  id,
  state
}: QuestionCardProps) => {
  const router = useRouter();
  const moveToQuestionPost = () => router.push(`/question/${id}`);

  return (
    <style.Wrapper onClick={moveToQuestionPost}>
      <style.TopSection>
        <style.Title>{omitTitleText(title, 30, "...")}</style.Title>
      </style.TopSection>
      <style.BottomSection state={state}>
        <style.StateText>
          {state == "completed" ? "해결된 질문" : "미해결된 질문"}
        </style.StateText>
        <style.IconWrap>
          <CommentSvg />
          <p>{commentCount}</p>
        </style.IconWrap>
        <style.IconWrap>
          <LikeSvg />
          <p>{likeCount}</p>
        </style.IconWrap>
      </style.BottomSection>
    </style.Wrapper>
  );
};

export default QuestionCard;
