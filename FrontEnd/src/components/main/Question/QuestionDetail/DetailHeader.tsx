import * as style from "./DetailHeader.style";

import HeartSvg from "@/assets/icons/Heart.svg";

import { formatISODate } from "@/utils/formatISODate";

interface DetailHeaderProps {
  title: string;
  state: "progressed" | "completed";
  nickname: string;
  createdAt: string;
}

const DetailHeader = ({ title, state, nickname, createdAt }: DetailHeaderProps) => {
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
        <style.IsCompleteBox state={state}>{state == "progressed" ? "미해결" : "해결됨"}</style.IsCompleteBox>
      </style.AuthorBox>
    </style.Wrapper>
  );
};

export default DetailHeader;
