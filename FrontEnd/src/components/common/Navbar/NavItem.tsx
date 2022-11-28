import * as style from "@/components/common/Navbar/NavItem.style";

import MainSvg from "@/assets/icons/Main.svg";
import SettingSvg from "@/assets/icons/Setting.svg";
import EditSquareSvg from "@/assets/icons/EditSquare.svg";

export const NavItemIcons = {
  main: <MainSvg />,
  setting: <SettingSvg />,
  write: <EditSquareSvg />
} as const;

type NavItemKey = keyof typeof NavItemIcons;

export interface NavItemProps {
  icon: NavItemKey;
  isFocused: boolean;
}

const NavItem = ({ icon, isFocused }: NavItemProps) => {
  return (
    <style.NavItemList>
      <style.NavItem icon={icon} isFocused={isFocused}>
        {NavItemIcons[icon]}
      </style.NavItem>
    </style.NavItemList>
  );
};

export default NavItem;
