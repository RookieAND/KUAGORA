import type { RefObject } from "react";
import type { QuestionPostType, QuestionSearchType } from "@/apis/question";

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import QuestionHeadline from "@/components/main/Question/QustionHeadline";
import QuestionSearch from "@/components/main/Question/QuestionSearch";
import QuestionPost from "@/components/main/Question/QuestionPost";

interface SearchTemplateProps {
  questions: QuestionPostType[] | undefined;
  questionRef: RefObject<HTMLDivElement>;
  searchOption: QuestionSearchType;
  searchedQuery: string;
}

const SearchTemplate = ({ questions, questionRef, searchOption, searchedQuery }: SearchTemplateProps) => {
  return (
    <>
      <Navbar />
      <QuestionHeadline
        title={"Search Result"}
        subtitle={`[${searchedQuery}] 에 대한 ${searchOption === "keyword" ? "키워드" : "제목"} 검색 결과입니다.`}
      />
      <QuestionSearch searchedQuery={searchOption === "title" ? searchedQuery : `#${searchedQuery}`} />
      <QuestionPost questions={questions} questionRef={questionRef} />
      <Footer />
    </>
  );
};

export default SearchTemplate;
