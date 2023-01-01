import { useRouter } from "next/router";

import * as style from "./QuestionCard.style";

import type { KeywordDataType } from "@/apis/question";
import { omitTitleText } from "@/utils/omitTitleText";

import CommentSvg from "@/assets/icons/Comment.svg";
import LikeSvg from "@/assets/icons/Like.svg";
import QuestionKeyword from "@/components/main/Question/QuestionKeyword";

interface QuestionCardProps {
  title: string;
  likeCount: number;
  commentCount: number;
  id: number;
  keywords: KeywordDataType[];
  state: "progressed" | "completed";
}

const QuestionCard = ({ title, likeCount, commentCount, id, keywords, state }: QuestionCardProps) => {
  const router = useRouter();
  const moveToQuestionPost = () => router.push(`/question/${id}`);

  return (
    <style.Wrapper onClick={moveToQuestionPost}>
      <style.TopSection>
        <style.Title>{omitTitleText(title, 30, "...")}</style.Title>
        <QuestionKeyword state={state} keywords={keywords} />
      </style.TopSection>
      <style.BottomSection state={state}>
        <style.StateText state={state}>{state == "completed" ? "해결된 질문" : "미해결된 질문"}</style.StateText>
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
