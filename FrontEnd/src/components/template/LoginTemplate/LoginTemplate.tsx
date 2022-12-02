import * as style from "./LoginTemplate.style";

import Navbar from "@/components/common/Navbar";
import LoginSection from "@/components/main/Login/LoginSection";
import LoginBox from "@/components/main/Login/LoginBox";
import Footer from "@/components/common/Footer";

interface LoginTemplateProps {
  isLogin: boolean;
  currentPath: string;
}

const LoginTemplate = ({ isLogin, currentPath }: LoginTemplateProps) => {
  return (
    <>
      <Navbar isLogin={isLogin} currentPath={currentPath} />
      <style.Section>
        <LoginBox />
        <LoginSection />
      </style.Section>
      <Footer />
    </>
  );
};

export default LoginTemplate;
