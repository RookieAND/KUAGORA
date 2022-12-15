import { useAtom } from "jotai";
import { accessTokenAtom } from "@/stores/actions";
import { getQuestionsAsync, QuestionPostType } from "@/apis/question";

import TitleBox from "@/components/common/TitleBox";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import HeadLine from "@/components/main/Home/HeadLine";
import Information from "@/components/main/Home/Information";
import QuestionList from "@/components/main/Question/QuestionList";

interface MainTemplateProps {
  recentQuestions: QuestionPostType[];
  popularQuestions: QuestionPostType[];
}

const MainTemplate = ({ recentQuestions, popularQuestions }: MainTemplateProps) => {
  const [accessToken] = useAtom(accessTokenAtom);

  return (
    <>
      <Navbar />
      <HeadLine isLogin={accessToken != null} />
      <TitleBox title={"Today Questions"} subTitle={"학우 분들이 최근에 등록한 질문글 목록입니다."} />
      <QuestionList questions={recentQuestions} />
      <TitleBox title={"Popular Questions"} subTitle={"학우 분들에게 인기 있는 질문글 목록입니다."} />
      <QuestionList questions={popularQuestions} />
      <TitleBox title={"Our Service"} subTitle={"KU : AGORA 의 서비스에 대한 설명입니다."} />
      <Information />
      <Footer />
    </>
  );
};

export default MainTemplate;
