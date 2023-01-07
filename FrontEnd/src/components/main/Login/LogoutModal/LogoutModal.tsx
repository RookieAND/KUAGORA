import { useAtom } from "jotai";
import { useRouter } from "next/router";

import * as style from "./LogoutModal.style";

import { logoutAsync } from "@/apis/auth";
import useModal from "@/hooks/useModal";
import { setJWTAtom } from "@/stores/actions";

const LogoutModalModal = () => {
  const router = useRouter();
  const { closeModal } = useModal();
  const [jwtToken, setJWTToken] = useAtom(setJWTAtom);

  const logout = async () => {
    const isLogout = await logoutAsync(jwtToken.accessToken || "");
    if (isLogout) {
      setJWTToken({ accessToken: null, refreshToken: null });
      router.replace("/");
      closeModal();
    }
  };

  return (
    <style.Wrapper>
      <style.Title>정말 로그아웃 하시겠습니까?</style.Title>
      <style.SubmitBtn onClick={logout}>로그아웃</style.SubmitBtn>
    </style.Wrapper>
  );
};

export default LogoutModalModal;
