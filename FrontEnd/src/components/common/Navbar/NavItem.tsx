import * as style from "@/components/common/Navbar/NavItem.style";
import { useRouter } from "next/router";

import MainSvg from "@/assets/icons/Main.svg";
import EditSquareSvg from "@/assets/icons/EditSquare.svg";
import ProfileSvg from "@/assets/icons/Profile.svg";
import LoginSvg from "@/assets/icons/Login.svg";

export type NavItemKey = keyof typeof NavItemIcons;

export interface NavItemProps {
  icon: NavItemKey;
  path: string;
  isFocused: boolean;
}

export const NavItemIcons = {
  main: <MainSvg />,
  question: <EditSquareSvg />,
  profile: <ProfileSvg />,
  login: <LoginSvg />,
} as const;

const NavItem = ({ icon, path, isFocused }: NavItemProps) => {
  const router = useRouter();
  const clickNavItem = (path: string) => {
    router.push(path);
  };

  return (
    <style.Wrapper isFocused={isFocused} onClick={() => clickNavItem(path)}>
      {NavItemIcons[icon]}
    </style.Wrapper>
  );
};

export default NavItem;
