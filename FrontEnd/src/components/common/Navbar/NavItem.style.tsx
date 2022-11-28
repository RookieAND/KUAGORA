import styled, { css } from "styled-components";
import { NavItemProps } from "./NavItem";

export const NavItemList = styled.ul`
  width: 200px;
  height: 32px;

  display: flex;
  flex-direction: row;
  align-items: flex-start;

  list-style: none;
  padding: 0px;
  gap: 24px;
`;

export const NavItem = styled.li<NavItemProps>`
  ${({ theme, isFocused }) => {
    const { colors } = theme;
    return css`
      width: 24px;
      height: 24px;

      color: ${isFocused ? colors.main.normal : colors.mono.black};
    `;
  }}
`;
