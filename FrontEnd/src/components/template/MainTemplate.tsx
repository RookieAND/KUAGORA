import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";

import Navbar from "@/components/common/Navbar";
import HeadLine from "../main/Home/HeadLine";
import { accessTokenSelector, IAccessToken } from "@/stores/auth";

const MainTemplate = () => {
  const accessToken = useRecoilValue<IAccessToken>(accessTokenSelector);
  const router = useRouter();

  const isLogin = accessToken != null;
  const currentPath = router.pathname;

  return (
    <>
      <Navbar isLogin={isLogin} currentPath={currentPath} />
      <HeadLine />
    </>
  );
};

export default MainTemplate;
