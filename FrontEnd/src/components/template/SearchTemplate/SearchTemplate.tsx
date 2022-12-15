import { RefObject } from "react";
import { QuestionPostType, QuestionSearchType, QuestionSortType } from "@/apis/question";

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import QuestionHeadline from "@/components/main/Question/QustionHeadline";
import QuestionSearch from "@/components/main/Question/QuestionSearch";
import QuestionPost from "@/components/main/Question/QuestionPost";

interface SearchTemplateProps {
  questions: QuestionPostType[] | undefined;
  questionRef: RefObject<HTMLDivElement>;
  searchQuery: string;
  searchOption: QuestionSearchType;
  sortOption: QuestionSortType;
  changeSearchQuery: (newQuery: string) => void;
}

const SearchTemplate = ({
  questions,
  questionRef,
  searchQuery,
  searchOption,
  sortOption,
  changeSearchQuery
}: SearchTemplateProps) => {
  return (
    <>
      <Navbar />
      <QuestionHeadline title={"Search Result"} subtitle={`${searchQuery} 에 대한 검색 결과입니다.`} />
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

export default SearchTemplate;
