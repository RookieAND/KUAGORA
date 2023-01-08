import { useRouter } from "next/router";

import * as style from "./NotLoginModal.style";

import useModal from "@/hooks/useModal";

const NotLoginModal = () => {
  const router = useRouter();
  const { closeModal } = useModal();

  const moveToLoginPage = async () => {
    router.replace("/login");
    closeModal();
  };

  return (
    <style.Wrapper>
      <style.Title>로그인이 필요한 기능입니다.</style.Title>
      <style.SubTitle>하단의 버튼을 클릭할 시 로그인을 진행합니다.</style.SubTitle>
      <style.SubmitBtn onClick={moveToLoginPage}>로그인 하기</style.SubmitBtn>
    </style.Wrapper>
  );
};

export default NotLoginModal;
