import { QuestionPostType } from "@/apis/question";

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import TitleBox from "@/components/common/TitleBox";
import QuestionHeadline from "@/components/main/Question/QustionHeadline";
import QuestionPost from "@/components/main/Question/QuestionPost";

interface QuestionsPageProps {
  questions: QuestionPostType[];
}

const QuestionsTemplate = ({ questions }: QuestionsPageProps) => {
  return (
    <>
      <Navbar />
      <QuestionHeadline />
      <TitleBox
        title={"Question List"}
        subTitle={"검색에 의한 질문글 목록입니다."}
      />
      <QuestionPost questions={questions} />
      <Footer />
    </>
  );
};

export default QuestionsTemplate;