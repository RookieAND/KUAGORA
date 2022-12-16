import { RefObject } from "react";
import { QuestionPostType } from "@/apis/question";

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import QuestionHeadline from "@/components/main/Question/QustionHeadline";
import QuestionSearch from "@/components/main/Question/QuestionSearch";
import QuestionPost from "@/components/main/Question/QuestionPost";

interface SearchTemplateProps {
  questions: QuestionPostType[] | undefined;
  questionRef: RefObject<HTMLDivElement>;
  searchedQuery: string;
}

const SearchTemplate = ({ questions, questionRef, searchedQuery }: SearchTemplateProps) => {
  return (
    <>
      <Navbar />
      <QuestionHeadline title={"Search Result"} subtitle={`${searchedQuery} 에 대한 검색 결과입니다.`} />
      <QuestionSearch searchedQuery={searchedQuery} />
      <QuestionPost questions={questions} questionRef={questionRef} />
      <Footer />
    </>
  );
};

export default SearchTemplate;
