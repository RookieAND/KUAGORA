import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import QuestionHeadline from "@/components/main/Question/QustionHeadline";
import QuestionPost from "@/components/main/Question/QuestionPost";

const QuestionsTemplate = () => {
  return (
    <>
      <Navbar />
      <QuestionHeadline />
      <QuestionPost />
      <Footer />
    </>
  );
};

export default QuestionsTemplate;
