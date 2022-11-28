import styled, { css } from "styled-components";
import { NavItemProps } from "./NavItem";

export const Wrapper = styled.li<Partial<NavItemProps>>`
  ${({ theme, isFocused }) => {
    return css`
      width: 24px;
      height: 24px;

      svg {
        fill: ${isFocused
          ? theme.colors.main.opacity30
          : theme.colors.mono.white};
      }
    `;
  }}
`;
