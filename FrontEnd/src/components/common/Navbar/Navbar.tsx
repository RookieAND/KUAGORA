import * as style from "@/components/common/Navbar/Navbar.style";
import NavItem from "@/components/common/Navbar/NavItem";
import NavItemIcons from "@/components/common/Navbar/NavItem";

import LogoSvg from "@/assets/icons/Logo.svg";
import Main from "@/assets/icons/Main.svg";
import Setting from "@/assets/icons/Setting.svg";
import EditSquare from "@/assets/icons/EditSquare.svg";

const Navbar = () => {
  return (
    <style.Wrapper>
      <style.Navigation>
        <style.Logo>
          <LogoSvg />
        </style.Logo>
        <style.NavItemList>
          <NavItem icon={"main"} isFocused={true} />
          <NavItem icon={"setting"} isFocused={true} />
          <NavItem icon={"write"} isFocused={true} />
        </style.NavItemList>
      </style.Navigation>
    </style.Wrapper>
  );
};

export default Navbar;
