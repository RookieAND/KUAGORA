import { useAtom } from "jotai";
import { useRouter } from "next/router";

import { accessTokenAtom } from "@/stores/actions";

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import QuestionHeadline from "@/components/main/Question/QustionHeadline";

const QuestionsTemplate = () => {
  const router = useRouter();
  const [accessToken] = useAtom(accessTokenAtom);
  const currentPath = router.pathname;

  return (
    <>
      <Navbar isLogin={accessToken != null} currentPath={currentPath} />
      <QuestionHeadline />
      <Footer />
    </>
  );
};

export default QuestionsTemplate;
