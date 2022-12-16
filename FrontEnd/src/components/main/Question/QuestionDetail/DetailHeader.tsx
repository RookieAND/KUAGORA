import { LikeDataType } from "@/apis/question";
import { formatISODate } from "@/utils/formatISODate";

import * as style from "./DetailHeader.style";
import LikeSvg from "@/assets/icons/Like.svg";

interface DetailHeaderProps {
  title: string;
  state: "progressed" | "completed";
  nickname: string;
  createdAt: string;
  likesData: LikeDataType;
  toggleLikeState: () => void;
}

const DetailHeader = ({ title, state, nickname, createdAt, likesData, toggleLikeState }: DetailHeaderProps) => {
  const { isLike, likeCount } = likesData;

  return (
    <style.Wrapper>
      <style.TitleBox>
        <style.QuestionMark>Q.</style.QuestionMark>
        <style.Title>{title}</style.Title>
      </style.TitleBox>
      <style.AuthorBox>
        <style.StateBox>
          <style.StateText>작성자 | {nickname}</style.StateText>
          <style.StateText>{createdAt && `작성일 | ${formatISODate(createdAt)}`}</style.StateText>
        </style.StateBox>
        <style.LikeBox isLike={isLike} onClick={toggleLikeState}>
          <LikeSvg />
          <style.LikeText>{likeCount}</style.LikeText>
        </style.LikeBox>
        <style.IsCompleteBox state={state}>{state == "progressed" ? "미해결" : "해결됨"}</style.IsCompleteBox>
      </style.AuthorBox>
    </style.Wrapper>
  );
};

export default DetailHeader;
