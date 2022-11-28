import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";

import { accessTokenSelector, IAccessToken } from "@/stores/auth";

import Navbar from "@/components/common/Navbar";
import HeadLine from "@/components/main/Home/HeadLine";
import Information from "@/components/main/Home/Information";

const MainTemplate = () => {
  const accessToken = useRecoilValue<IAccessToken>(accessTokenSelector);
  const router = useRouter();

  const isLogin = accessToken != null;
  const currentPath = router.pathname;

  return (
    <>
      <Navbar isLogin={isLogin} currentPath={currentPath} />
      <HeadLine />
      <Information />
    </>
  );
};

export default MainTemplate;
