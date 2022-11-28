import { useRouter } from "next/router";

import * as style from "@/components/common/Navbar/Navbar.style";
import NavItem, { NavItemKey } from "@/components/common/Navbar/NavItem";
import { PATH_INFO } from "@/constants/url";

export interface NavbarProps {
  isLogin: boolean;
  currentPath: string;
}

const Navbar = ({ isLogin, currentPath }: NavbarProps) => {
  const navList = Object.keys(PATH_INFO) as [NavItemKey];
  const router = useRouter();

  // 네비게이션 아이콘 일부를 필터링 할때 사용하는 함수 ignoreIcon
  const ignoreIcon = (navType: NavItemKey) =>
    (isLogin && navType == "login") || (!isLogin && navType == "profile");

  return (
    <style.Wrapper>
      <style.Navigation>
        <style.Logo onClick={() => router.push("/")} />
        <style.NavItemList>
          {navList.map(
            navType =>
              !ignoreIcon(navType) && (
                <NavItem
                  icon={navType}
                  path={PATH_INFO[navType]}
                  isFocused={currentPath == PATH_INFO[navType]}
                />
              )
          )}
        </style.NavItemList>
      </style.Navigation>
    </style.Wrapper>
  );
};

export default Navbar;
