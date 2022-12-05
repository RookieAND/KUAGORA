import { useAtom } from "jotai";
import { accessTokenAtom } from "@/stores/actions";

import TitleBox from "@/components/common/TitleBox";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import HeadLine from "@/components/main/Home/HeadLine";
import Information from "@/components/main/Home/Information";
import QuestionList from "@/components/main/Question/QuestionList";

const MainTemplate = () => {
  const [accessToken] = useAtom(accessTokenAtom);

  return (
    <>
      <Navbar />
      <HeadLine isLogin={accessToken != null} />
      <TitleBox
        title={"Our Service"}
        subTitle={"지식의 요람. [KU : AGORA] 에 대해 소개합니다."}
      />
      <Information />
      <TitleBox
        title={"Today Questions"}
        subTitle={"학우 분들이 가장 최근에 등록한 질문글 목록입니다."}
      />
      <QuestionList />
      <Footer />
    </>
  );
};

export default MainTemplate;
