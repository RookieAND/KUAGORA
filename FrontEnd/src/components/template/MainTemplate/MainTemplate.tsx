import { useAtom } from "jotai";
import { accessTokenAtom } from "@/stores/actions";
import type { QuestionPostType } from "@/apis/question";

import TitleBox from "@/components/common/TitleBox";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import HeadLine from "@/components/main/Home/HeadLine";
import QuestionList from "@/components/main/Question/QuestionList";

interface MainTemplateProps {
  recentQuestions: QuestionPostType[];
  recentAnsweredQuestion: QuestionPostType[];
  popularQuestions: QuestionPostType[];
}

const MainTemplate = ({ recentQuestions, recentAnsweredQuestion, popularQuestions }: MainTemplateProps) => {
  const [accessToken] = useAtom(accessTokenAtom);

  return (
    <>
      <Navbar />
      <HeadLine isLogin={accessToken != null} />
      <TitleBox title={"Recently Asked"} subTitle={"학우 분들이 최근에 등록한 질문글 목록입니다."} />
      <QuestionList questions={recentQuestions} />
      <TitleBox title={"Recently Answered"} subTitle={"학우 분들이 최근에 답변한 질문글 목록입니다."} />
      <QuestionList questions={recentAnsweredQuestion} />
      <TitleBox title={"Popular Questions"} subTitle={"학우 분들에게 인기 있는 질문글 목록입니다."} />
      <QuestionList questions={popularQuestions} />
      <Footer />
    </>
  );
};

export default MainTemplate;
