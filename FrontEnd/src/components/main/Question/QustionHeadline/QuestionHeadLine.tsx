import * as style from "./QuestionHeadLine.style";
import { useRouter } from "next/router";

import HeadLineImg from "@/assets/images/Headline.jpg";
import QuestionSearch from "@/components/main/Question/QuestionSearch";

interface QuestionHeadlineProps {
  searchValue: string;
  changeSearchValue: (word: string) => void;
}

const QuestionHeadline = ({ searchValue, changeSearchValue }: QuestionHeadlineProps) => {
  const router = useRouter();
  return (
    <style.Wrapper image={HeadLineImg}>
      <style.TextBox>
        <style.MainText>질문글 목록</style.MainText>
        <style.SubText>학우 분들이 남긴 다양한 질문을 확인해보세요.</style.SubText>
      </style.TextBox>
      <QuestionSearch searchValue={searchValue} changeSearchValue={changeSearchValue} />
    </style.Wrapper>
  );
};

export default QuestionHeadline;
