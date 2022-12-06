import * as style from "./DetailHeader.style";

import LikeSvg from "@/assets/icons/Like.svg";

import { formatISODate } from "@/utils/formatISODate";

interface DetailHeaderProps {
  title: string;
  nickname: string;
  createdAt: string;
}

const DetailHeader = ({ title, nickname, createdAt }: DetailHeaderProps) => {
  return (
    <style.Wrapper>
      <style.TitleBox>
        <style.QuestionMark>Q.</style.QuestionMark>
        <style.Title>{title}</style.Title>
      </style.TitleBox>
      <style.AuthorBox>
        <style.StateBox>
          <style.StateText>작성자 | {nickname}</style.StateText>
        </style.StateBox>
        <style.StateBox>
          <style.StateText>{createdAt && `작성일 | ${formatISODate(createdAt)}`}</style.StateText>
        </style.StateBox>
      </style.AuthorBox>
    </style.Wrapper>
  );
};

export default DetailHeader;
