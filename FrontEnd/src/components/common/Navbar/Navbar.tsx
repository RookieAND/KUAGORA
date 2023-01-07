import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";

import * as style from "@/components/common/Navbar/Navbar.style";

import { PATH_INFO } from "@/constants/url";
import { accessTokenAtom } from "@/stores/actions";
import useModal from "@/hooks/useModal";

import LogoutModal from "@/components/main/Login/LogoutModal";
import NavItem from "@/components/common/Navbar/NavItem";
import type { NavItemKey } from "@/components/common/Navbar/NavItem";

const Navbar = () => {
  const [loginState, setLoginState] = useState<boolean>(false);
  const [accessToken] = useAtom(accessTokenAtom);
  const { openModal } = useModal();

  const router = useRouter();
  const navList = Object.keys(PATH_INFO) as [NavItemKey];
  const currentPath = router.pathname;

  useEffect(() => {
    setLoginState(accessToken != null);
  }, [accessToken]);

  // 네비게이션 아이콘 일부를 필터링 할때 사용하는 함수
  const ignoreIcon = (navType: NavItemKey) =>
    (loginState && navType == "login") || (!loginState && navType == "write") || (!loginState && navType == "logout");

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
                  navType != "logout" ? () => router.push(PATH_INFO[navType]) : () => openModal(<LogoutModal />)
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
