import * as style from "@/components/common/Navbar/NavItem.style";

import MainSvg from "@/assets/icons/Main.svg";
import DiarySvg from "@/assets/icons/Diary.svg";
import EditSquareSvg from "@/assets/icons/EditSquare.svg";
import LoginSvg from "@/assets/icons/Login.svg";

export type NavItemKey = keyof typeof NavItemIcons;

export interface NavItemProps {
  icon: NavItemKey;
  clickFunc: () => void;
  isFocused: boolean;
}

export const NavItemIcons = {
  main: <MainSvg />,
  question: <DiarySvg />,
  write: <EditSquareSvg />,
  login: <LoginSvg />,
  logout: <LoginSvg />
} as const;

const NavItem = ({ icon, clickFunc, isFocused }: NavItemProps) => {
  return (
    <style.Wrapper isFocused={isFocused} onClick={clickFunc}>
      {NavItemIcons[icon]}
    </style.Wrapper>
  );
};

export default NavItem;
