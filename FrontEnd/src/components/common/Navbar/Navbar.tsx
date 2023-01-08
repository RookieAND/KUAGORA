import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";

import * as style from "@/components/common/Navbar/Navbar.style";

import useModal from "@/hooks/useModal";
import { logoutAsync } from "@/apis/auth";
import { PATH_INFO } from "@/constants/url";
import { setJWTAtom } from "@/stores/actions";

import ModalTemplate from "@/components/common/Modal/ModalTemplate";
import NavItem from "@/components/common/Navbar/NavItem";
import type { NavItemKey } from "@/components/common/Navbar/NavItem";

const Navbar = () => {
  const [loginState, setLoginState] = useState<boolean>(false);
  const [jwtToken, setJWTToken] = useAtom(setJWTAtom);
  const { openModal, closeModal } = useModal();

  const router = useRouter();
  const navList = Object.keys(PATH_INFO) as [NavItemKey];
  const currentPath = router.pathname;
  const accessToken = jwtToken.accessToken;

  useEffect(() => {
    setLoginState(accessToken != null);
  }, [accessToken]);

  // 네비게이션 아이콘 일부를 필터링 할때 사용하는 함수
  const ignoreIcon = (navType: NavItemKey) =>
    (loginState && navType == "login") || (!loginState && navType == "write") || (!loginState && navType == "logout");

  // 로그아웃을 진행시키는 함수
  const logout = async () => {
    const isLogout = await logoutAsync(jwtToken.accessToken || "");
    if (isLogout.isSuccess) {
      setJWTToken({ accessToken: null, refreshToken: null });
      router.replace("/");
      closeModal();
    }
  };

  return (
    <style.Wrapper>
      <style.Logo onClick={() => router.push("/")} />
      <style.NavItemList>
        {navList.map(
          navType =>
            !ignoreIcon(navType) && (
              <NavItem
                icon={navType}
                clickFunc={
                  navType != "logout"
                    ? () => router.push(PATH_INFO[navType])
                    : () =>
                        openModal(
                          <ModalTemplate
                            title={"정말 로그아웃 하시겠습니까?"}
                            subtitle={"하단의 버튼을 클릭할 시 로그아웃을 진행합니다."}
                            buttonText={"로그아웃 하기"}
                            submitFunc={logout}
                          />
                        )
                }
                isFocused={currentPath == PATH_INFO[navType]}
                key={navType}
              />
            )
        )}
      </style.NavItemList>
    </style.Wrapper>
  );
};

export default Navbar;
