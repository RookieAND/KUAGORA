import { useRouter } from "next/router";
import useModal from "@/hooks/useModal";

import * as style from "@/components/main/Home/HeadLine/HeadLine.style";
import ModalTemplate from "@/components/common/Modal/ModalTemplate";
import HeadLineImg from "@/assets/images/Headline.jpg";

interface HeadlineProps {
  isLogin: boolean;
}

const Headline = ({ isLogin }: HeadlineProps) => {
  const router = useRouter();
  const { openModal, closeModal } = useModal();

  const moveToWritePage = () => {
    !isLogin
      ? openModal(
          <ModalTemplate
            title={"로그인이 필요한 기능입니다."}
            subtitle={"하단의 버튼을 클릭하여 로그인을 진행하세요."}
            buttonText={"로그인 하기"}
            submitFunc={moveToLoginPage}
          />
        )
      : router.push("/write");
  };

  const moveToLoginPage = async () => {
    router.replace("/login");
    closeModal();
  };

  return (
    <style.Wrapper image={HeadLineImg}>
      <style.TextBox>
        <style.MainText>지식의 요람, KU : AGORA</style.MainText>
        <style.SubText>겹겹이 쌓인 질문 속에서 해답을 찾아보세요.</style.SubText>
      </style.TextBox>
      <style.SubmitButton onClick={moveToWritePage}>지금 질문하기</style.SubmitButton>
    </style.Wrapper>
  );
};

export default Headline;
