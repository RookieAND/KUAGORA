import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import TitleBox from "@/components/common/TitleBox";
import QuestionHeadline from "@/components/main/Question/QustionHeadline";
import QuestionPost from "@/components/main/Question/QuestionPost";

import dummyQuestionData from "@/constants/dummyQuestionData";

const QuestionsTemplate = () => {
  return (
    <>
      <Navbar />
      <QuestionHeadline />
      <TitleBox
        title={"Question List"}
        subTitle={"검색에 의한 질문글 목록입니다."}
      />
      <QuestionPost questions={dummyQuestionData}/>
      <Footer />
    </>
  );
};

export default QuestionsTemplate;
