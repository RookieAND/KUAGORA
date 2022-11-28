import styled, { css } from "styled-components";

interface StyledNavItemProps {
  isFocused: boolean;
}

export const Wrapper = styled.li<StyledNavItemProps>`
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
