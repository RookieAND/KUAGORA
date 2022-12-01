import * as style from "./QuestionContext.style";

import CommentSvg from "@/assets/icons/Comment.svg";
import LikeSvg from "@/assets/icons/Like.svg";

import { omitTitleText } from "@/utils/omitTitleText";

export interface QuestionContextProps {
  title: string;
  like: number;
  comment: number;
}

const QuestionContext = ({ title, like, comment }: QuestionContextProps) => {
  return (
    <style.Wrapper>
      <style.Title>{omitTitleText(title, 30, "...")}</style.Title>
      <style.BottomBox>
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
