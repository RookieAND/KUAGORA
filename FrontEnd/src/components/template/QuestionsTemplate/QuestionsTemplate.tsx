import { RefObject } from "react";
import { QuestionPostType, QuestionSearchType, QuestionSortType } from "@/apis/question";
import { SelectType } from "@/constants/search";

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import QuestionHeadline from "@/components/main/Question/QustionHeadline";
import QuestionSearch from "@/components/main/Question/QuestionSearch";
import QuestionPost from "@/components/main/Question/QuestionPost";

interface QuestionsTemplateProps {
  questions: QuestionPostType[];
  questionRef: RefObject<HTMLDivElement>;
  searchQuery: string;
  searchOption: QuestionSearchType;
  sortOption: QuestionSortType;
  changeSearchQuery: (newQuery: string) => void;
}

const QuestionsTemplate = ({
  questions,
  questionRef,
  searchQuery,
  searchOption,
  sortOption,
  changeSearchQuery
}: QuestionsTemplateProps) => {
  return (
    <>
      <Navbar />
      <QuestionHeadline title={"Question List"} subtitle={"학우 분들이 남긴 다양한 질문을 확인해보세요."} />
      <QuestionSearch
        searchQuery={searchQuery}
        changeSearchQuery={changeSearchQuery}
        searchOption={searchOption}
        sortOption={sortOption}
      />
      <QuestionPost questions={questions} questionRef={questionRef} />
      <Footer />
    </>
  );
};

export default QuestionsTemplate;
