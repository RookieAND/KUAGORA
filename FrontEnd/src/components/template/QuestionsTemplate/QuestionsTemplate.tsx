import { RefObject } from "react";
import { QuestionPostType } from "@/apis/question";

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import QuestionHeadline from "@/components/main/Question/QustionHeadline";
import QuestionSearch from "@/components/main/Question/QuestionSearch";
import QuestionPost from "@/components/main/Question/QuestionPost";

interface QuestionsTemplateProps {
  questions: QuestionPostType[] | undefined;
  questionRef: RefObject<HTMLDivElement>;
  searchQuery: string;
  changeSearchQuery: (newQuery: string) => void;
}

const QuestionsTemplate = ({ questions, questionRef, searchQuery, changeSearchQuery }: QuestionsTemplateProps) => {
  return (
    <>
      <Navbar />
      <QuestionHeadline title={"Question List"} subtitle={"학우 분들이 남긴 다양한 질문을 확인해보세요."} />
      <QuestionSearch searchQuery={searchQuery} changeSearchQuery={changeSearchQuery} />
      <QuestionPost questions={questions} questionRef={questionRef} />
      <Footer />
    </>
  );
};

export default QuestionsTemplate;
