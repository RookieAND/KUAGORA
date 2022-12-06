import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";

import * as style from "@/components/common/Navbar/Navbar.style";

import { logoutAsync } from "@/apis/auth";
import { PATH_INFO } from "@/constants/url";
import NavItem, { NavItemKey } from "@/components/common/Navbar/NavItem";
import { accessTokenAtom, setJWTAtom } from "@/stores/actions";

const Navbar = () => {
  const [loginState, setLoginState] = useState<boolean>(false);
  const [accessToken] = useAtom(accessTokenAtom);
  const [, setJWTToken] = useAtom(setJWTAtom);

  const router = useRouter();
  const navList = Object.keys(PATH_INFO) as [NavItemKey];
  const currentPath = router.pathname;

  useEffect(() => {
    setLoginState(accessToken != null);
  }, [accessToken]);

  // 네비게이션 아이콘 일부를 필터링 할때 사용하는 함수
  const ignoreIcon = (navType: NavItemKey) =>
    (loginState && navType == "login") ||
    (!loginState && navType == "write") ||
    (!loginState && navType == "profile") ||
    (!loginState && navType == "logout");

  // 유저의 로그아웃을 진행하는 함수
  const logout = async () => {
    const isLogout = await logoutAsync(accessToken as string);
    if (isLogout) {
      setJWTToken({ access_token: null, refresh_token: null });
      setLoginState(false);
      router.replace("/");
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
                clickFunc={navType != "logout" ? () => router.push(PATH_INFO[navType]) : logout}
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
