import { QuestionPostType } from "@/apis/question";

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import QuestionHeadline from "@/components/main/Question/QustionHeadline";
import QuestionSearch from "@/components/main/Question/QuestionSearch";
import QuestionPost from "@/components/main/Question/QuestionPost";

interface QuestionsTemplateProps {
  questions: QuestionPostType[];
  searchValue: string;
  changeSearchValue: (word: string) => void;
}

const QuestionsTemplate = ({ questions, searchValue, changeSearchValue }: QuestionsTemplateProps) => {
  return (
    <>
      <Navbar />
      <QuestionHeadline />
      <QuestionSearch searchValue={searchValue} changeSearchValue={changeSearchValue} />
      <QuestionPost questions={questions} />
      <Footer />
    </>
  );
};

export default QuestionsTemplate;
