import { useAtom } from "jotai";
import { useRouter } from "next/router";

import { accessTokenAtom } from "@/stores/actions";

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
      <Information />
      <QuestionList />
      <Footer />
    </>
  );
};

export default MainTemplate;
