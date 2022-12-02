import { useAtom } from "jotai";
import { useRouter } from "next/router";

import { getAccessTokenAtom } from "@/stores/actions";

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import HeadLine from "@/components/main/Home/HeadLine";
import Information from "@/components/main/Home/Information";
import QuestionList from "@/components/main/Home/QuestionList";

const MainTemplate = () => {
  const router = useRouter();
  const [accessToken] = useAtom(getAccessTokenAtom);
  const currentPath = router.pathname;

  return (
    <>
      <Navbar isLogin={accessToken != null} currentPath={currentPath} />
      <HeadLine />
      <Information />
      <QuestionList />
      <Footer />
    </>
  );
};

export default MainTemplate;
